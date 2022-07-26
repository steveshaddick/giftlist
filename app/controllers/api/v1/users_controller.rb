class Api::V1::UsersController < Api::V1::BaseController
  include FormatterConcern

  def claimlist
    if user_signed_in? && current_user[:id] == params[:id].to_i
      claimlist = []

      current_user.claimlist.each do |gift|
        claimlist.push({
          id: gift[:id],
          title: gift[:title],
          description: gift[:description],
          priceLow: format_money(gift.price_low),
          priceHigh: format_money(gift.price_high),
          isGot: gift[:claimer_got],
          asker: {
            id: gift.asker.id,
            name: gift.asker.name,
          },
        })
      end

      render json: claimlist
    else
      puts "NOPE #{user_signed_in?} #{current_user[:id]} #{params[:id]}"
    end
  end

  def asklist
    if user_signed_in? && current_user[:id] == params[:id].to_i
      asklist = []

      current_user.active_giftlist.each do |gift|
        asklist.push({
          id: gift[:id],
          title: gift[:title],
          description: gift[:description],
          priceLow: format_money(gift.price_low),
          priceHigh: format_money(gift.price_high),
        })
      end

      render json: asklist
    else
      puts "NOPE #{user_signed_in?} #{current_user[:id]} #{params[:id]}"
    end
  end
end
