class Api::V1::GiftsController < Api::V1::BaseController
  include FormatterConcern

  before_action :ensure_authenticated_user

  def create
    # Add asking gift
    if params[:askerId] === current_user[:id]
      asker = current_user
      claimer = nil
    else
      # Add private gift
      asker = User.find(params[:askerId])
      claimer = current_user
    end

    gift = Gift.create({
      asker: asker,
      owner: current_user,
      claimer: claimer,
      title: params[:title],
      description: params[:description],
      price_high: unformat_money(params[:priceHigh]),
      price_low: unformat_money(params[:priceLow]),
    })

    return_data(gift_json(gift))
  end

  def update
    gift = Gift.find(params[:id])
    include_claimer = false

    # Update gift values if the gift owner is the current user
    if gift[:owner_id] === current_user[:id]
      update_gift_values(gift, params)
  
    elsif params.has_key?(:claimerId)
      # Update the claimer
      update_gift_claimer(gift, params[:claimerId])
      include_claimer = true

    elsif params.has_key?(:claimerGot)
      # Update the claimerGot
      update_gift_got(gift, params[:claimerGot])

    end

    gift.reload
    return_data(gift_json(gift, include_claimer: include_claimer))

  rescue ActiveRecord::RecordNotFound
    return_not_found
  end

  def delete
    gift = Gift.find(params[:id])
    if gift.owner[:id] != current_user[:id]
      raise NotAuthorized
    end

    gift.destroy

    return_data({})

  rescue ActiveRecord::RecordNotFound
    return_not_found
  end

  private

  def update_gift_got(gift, claimer_got)
    if gift[:claimer_id] != current_user[:id]
      raise NotAuthorized
    end

    gift.update(claimer_got: claimer_got)
    gift.save
  end

  def update_gift_claimer(gift, new_claimer_id)
    if gift[:claimer_id].nil? && new_claimer_id === current_user[:id]
      # if gift doesn't have a claimer, and the current user is trying to claim it
      gift.update(claimer_id: current_user[:id])
      gift.save

    elsif new_claimer_id.nil? && gift[:claimer_id] === current_user[:id]
      # if the claimer is trying to unclaim, and the current user is the claimer
      gift.update(claimer_id: nil, claimer_got: false)
      gift.save

    else
      raise NotAuthorized
    end
  end

  def update_gift_values(gift, params)
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
  end

  def gift_json(gift, include_claimer: false)
    gift_data = {
      id: gift[:id],
      title: gift[:title],
      description: gift[:description],
      priceHigh: format_money(gift[:price_high]),
      priceLow: format_money(gift[:price_low]),
      asker: {
        id: gift.asker[:id],
        name: gift.asker[:name],
      },
      owner: {
        id: gift.owner[:id],
        name: gift.owner[:name],
      },
    }

    if include_claimer
      if (gift.claimer) 
        gift_data[:claimer] = {
          id: gift.claimer[:id],
          name: gift.claimer[:name],
        }
      else
        gift_data[:claimer] = nil
      end
    end

    gift_data
  end
end
