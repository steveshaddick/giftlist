class Api::V1::UsersController < Api::V1::BaseController
  include FormatterConcern

  def claimlist
    if user_signed_in? && current_user[:id] == params[:id].to_i
      claimlist = []

      current_user.active_claimlist.each do |gift|
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

  def groups
    if user_signed_in? && current_user[:id] == params[:id].to_i
      groups = []

      current_user.gift_groups.each do |group|
        group_item = {
          id: group[:id],
          name: group[:title],
          description: group[:description],
          members: [],
        }
        
        group.users.each do |user|
          group_item[:members].push({
            id: user[:id],
            name: user[:name],
          })
        end

        groups.push(group_item)
      end

      render json: groups
    else
      puts "NOPE #{user_signed_in?} #{current_user[:id]} #{params[:id]}"
    end
  end
end
