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

    # Update gift values
    if params.has_key?(:title) && gift[:owner_id] === current_user[:id]
      gift.update(
        title: params[:title],
        description: params[:description],
        price_high: unformat_money(params[:priceHigh]),
        price_low: unformat_money(params[:priceLow]),
      )
      gift.save
    end

    # Update the claimer
    if params.has_key?(:claimerId)
      new_claimer_id = params[:claimerId]
      include_claimer = true

      if gift[:claimer_id].nil? && new_claimer_id === current_user[:id]
        gift.update(claimer_id: current_user[:id])
        gift.save
      elsif new_claimer_id.nil? && gift[:claimer_id] === current_user[:id]
        gift.update(claimer_id: nil, claimer_got: false)
        gift.save
      else
        puts "ERROR! Gift #{gift[:id]} new claimer: #{new_claimer_id} existing claimer: #{gift[:claimer_id]}"
      end
    end

    # Update gift got
    if params.has_key?(:claimerGot) && gift[:claimer_id] === current_user[:id]
      gift.update(claimer_got: params[:claimerGot])
      gift.save
    end

    return_data(gift_json(gift, include_claimer: include_claimer))
  end

  def delete
    gift = Gift.find(params[:id])

    if (gift.owner[:id] === current_user[:id])
      gift.destroy
    else
      return return_unauthorized
    end

    return_data({})
  rescue ActiveRecord::RecordNotFound
    return_not_found
  end

  private

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
