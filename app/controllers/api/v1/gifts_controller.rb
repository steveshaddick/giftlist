class Api::V1::GiftsController < Api::V1::BaseController
  include FormatterConcern

  before_action :ensure_authenticated_user

  def create
    asker = nil
    claimer = nil
    owner = current_user
    group_owner = nil

    # Add asking gift
    if params[:askerId] === current_user.id
      asker = current_user
    else
      asker = User.find(params[:askerId])

      # Add group gift
      if params.has_key?(:groupOwnerId) && params[:groupOwnerId].present?
        gift_group = GiftGroup.find(params[:groupOwnerId])
        
        if gift_group.members.exclude?(current_user)
          raise NotAuthorized
        end

        if gift_group.members.exclude?(asker)
          raise BadRequest
        end

        group_owner = gift_group

      else
        # Add private gift
        claimer = current_user
      end
    end

    gift = Gift.create!({
      asker: asker,
      owner: owner,
      group_owner: group_owner,
      claimer: claimer,
      title: params[:title],
      description: params[:description],
      price_high: unformat_money(params[:priceHigh]),
      price_low: unformat_money(params[:priceLow]),
    })

    if gift.errors.any?
      raise GeneralServerError
    end

    return_data(gift_json(gift))
  end

  def update
    gift = Gift.find(params[:id])
    
    if !can_edit_gift(gift)
      raise NotAuthorized
    end

    include_claimer = gift.asker && gift.asker.id != current_user.id

    update_data = {}
    [
      :title,
      :description,
      :priceHigh,
      :priceLow,
    ].each do |key|
      if params.has_key?(key)
        if [:priceLow, :priceHigh].include?(key)
          update_data[key.to_s.underscore.to_sym] = unformat_money(params[key])
        else
          update_data[key] = params[key]
        end
      end
    end

    if (update_data.keys.count > 0)
      gift.update(update_data)
      gift.save
    end

    gift.reload
    return_data(gift_json(gift, include_claimer: include_claimer))

  rescue ActiveRecord::RecordNotFound
    return_not_found
  end

  def claim
    gift = Gift.find(params[:id])
    new_claimer_id = params[:claimerId]

    if gift.claimer_id.nil? && new_claimer_id === current_user.id
      # if gift doesn't have a claimer, and the current user is trying to claim it
      gift.update(claimer_id: current_user.id)
      gift.save

    elsif new_claimer_id.nil? && gift.claimer_id === current_user.id
      # if the claimer is trying to unclaim, and the current user is the claimer
      gift.update(claimer_id: nil, claimer_got: false)
      gift.save

    else
      raise NotAuthorized
    end

    gift.reload
    return_data(gift_json(gift, include_claimer: true))
  end

  def got
    gift = Gift.find(params[:id])
    claimer_got = params[:claimerGot]

    if gift.claimer_id != current_user.id
      raise NotAuthorized
    end

    gift.update(claimer_got: claimer_got)
    gift.save

    gift.reload
    return_data(gift_json(gift, include_claimer: true))
  end

  def delete
    gift = Gift.find(params[:id])
    if !can_edit_gift(gift)
      raise NotAuthorized
    end

    gift.destroy

    return_data({})

  rescue ActiveRecord::RecordNotFound
    return_not_found
  end

  private

  def can_edit_gift(gift)
    if gift.owner_id === current_user.id
      return true
    elsif gift.group_owner && current_user.gift_groups.exists?(gift.group_owner.id)
      return true
    else
      false
    end
  end

  def gift_json(gift, include_claimer: false)
    gift_data = {
      id: gift.id,
      title: gift.title,
      description: gift.description,
      priceHigh: format_money(gift.price_high),
      priceLow: format_money(gift.price_low),
      asker: gift.asker ? {
        id: gift.asker.id,
        name: gift.asker.name,
      } : nil,
      owner: gift.owner ? {
        id: gift.owner.id,
        name: gift.owner.name,
      } :nil,
      groupOwner: gift.group_owner ? {
        id: gift.group_owner.id,
        name: gift.group_owner.title,
      } :nil,
    }

    if include_claimer && gift.claimer
      gift_data[:claimer] = {
        id: gift.claimer.id,
        name: gift.claimer.name,
      }
    else
      gift_data[:claimer] = nil
    end

    gift_data
  end
end
