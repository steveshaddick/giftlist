class Api::V1::UsersController < Api::V1::BaseController

  def claimlist
    if user_signed_in? && current_user[:id] == params[:id].to_i
      claimlist = []

      current_user.claimlist.each do |gift|
        claimlist.push({
          id: gift[:id],
          title: gift[:title],
          description: gift[:description],
          priceLow: gift.price_low,
          priceHigh: gift.price_high,
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
end
