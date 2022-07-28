class Api::V1::GiftsController < Api::V1::BaseController
  include FormatterConcern

  def create
    if user_signed_in?
      # Add asking gift
      if params[:asker_id] === current_user[:id]
        gift = Gift.create({
          asker: current_user,
          title: params[:title],
          description: params[:description],
          price_high: unformat_money(params[:price_high]),
          price_low: unformat_money(params[:price_low]),
        })

        render json: {
          id: gift[:id],
          title: gift[:title],
          description: gift[:description],
          priceHigh: format_money(gift[:price_high]),
          priceLow: format_money(gift[:price_low]),
        }
      end
    end
  end

  def update
    if user_signed_in?
      gift = Gift.find(params[:id])

      # Update gift values
      if params.has_key?(:title) && gift[:asker_id] === current_user[:id]
        gift.update(
          title: params[:title],
          description: params[:description],
          price_high: unformat_money(params[:price_high]),
          price_low: unformat_money(params[:price_low]),
        )
        gift.save
      end

      # Update the claimer
      if params.has_key?(:claimer_id)
        new_claimer_id = params[:claimer_id]
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
      if params.has_key?(:claimer_got) && gift[:claimer_id] === current_user[:id]
        gift.update(claimer_got: params[:claimer_got])
        gift.save
      end
    end
  end

  def delete
    if user_signed_in?
      gift = Gift.find(params[:id])

      if (gift.asker[:id] === current_user[:id])
        gift.destroy
      end

      render json: {}
    end
  end
end
