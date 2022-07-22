# frozen_string_literal: true

class PagesController < ApplicationController
  include FormatterConcern

  layout "client_application"

  def giftlist
    user = User.find(params[:id])
    gifts = user.giftlist.where(received: false)

    assign_props({
      user: {
        id: user.id,
        name: user.name,
      },
      gifts: prepare_giftlist(gifts),
    })
  end

  private

  def assign_props(props = {})
    default_props = {
      current_user: current_user
    }

    @props = default_props.merge(props).deep_transform_keys! { |key| key.to_s.camelize(:lower) }
  end

  def set_current_user

    if user_signed_in?
      puts current_user.name
    else
      puts "none"
    end
  end

  def prepare_giftlist(gifts)
    gifts.map do |gift|
      {
        title: gift[:title],
        description: gift[:description],
        priceLow: format_money(gift[:price_low]),
        priceHigh: format_money(gift[:price_high]),
      }
    end
  end

end
  