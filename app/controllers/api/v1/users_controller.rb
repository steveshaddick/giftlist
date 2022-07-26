class Api::V1::UsersController < Api::V1::BaseController
  include FormatterConcern

  before_action :ensure_current_user

  def claimlist
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

    return_data(claimlist)
  end

  def asklist
    asklist = []

    current_user.personal_giftlist.each do |gift|
      asklist.push({
        id: gift[:id],
        title: gift[:title],
        description: gift[:description],
        priceLow: format_money(gift.price_low),
        priceHigh: format_money(gift.price_high),
      })
    end

    return_data(asklist)
  end

  def groups
    groups = []

    current_user.gift_groups.each do |group|
      group_item = {
        id: group[:id],
        name: group[:title],
        description: group[:description],
        members: [],
      }
      
      group.members.each do |user|
        group_item[:members].push({
          id: user[:id],
          name: user[:name],
        })
      end

      groups.push(group_item)
    end

    return_data(groups)
  end
end
