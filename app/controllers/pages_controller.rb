# frozen_string_literal: true

class PagesController < ApplicationController
  include FormatterConcern

  before_action :authenticate_user!, except: [:signed_out]

  layout "client_application", except: [:signed_out]

  def home
    gift_groups = current_user.gift_groups.map do |gift_group|
      {
        title: gift_group[:title],
        members: gift_group.members_except(current_user.id).map do |user|
          {
            id: user[:id],
            name: user[:name]
          }
        end
      }
    end
    assign_props({
      gift_groups: gift_groups
    })
  end

  def signed_out
    render "devise/sessions/sign_out"
  end

  def giftlist
    user = User.find(params[:id])
    is_current_user_list = (user === current_user)
    if is_current_user_list
      gifts = user.personal_giftlist
    else
      # This will be better sorted on the front-end, rather than here
      #current_user_claimed = user.group_giftlist.where(claimer_id: current_user.id)
      #other_gifts = user.active_giftlist.where.not(claimer_id: current_user.id).or(user.active_giftlist.where(claimer_id: nil)).order(claimer_id: :desc)
      #group_gifts = user.active_group_gifts(current_user.gift_groups.ids)
      gifts = user.group_giftlist(current_user.gift_groups.ids)
    end

    assign_props({
      user: {
        id: user.id,
        name: user.name,
      },
      gifts: prepare_giftlist(gifts, is_current_user_list),
    })
  end

  def user_profile
    unless current_user && current_user.id == params[:id].to_i
      redirect_to :root
      return
    end

    unless params.has_key?(:tab)
      redirect_to controller:'pages', action: 'user_profile', id: params[:id], tab: 'asklist'
      return
    end

    assign_props
  end

  private

  def assign_props(props = {})
    # So.... this will obviously need to change to handle multiple groups.
    current_group = current_user.gift_groups[0]

    default_props = {
      current_user: {
        id: current_user.id,
        name: current_user[:name],
        group: {
          id: current_group[:id],
          title: current_group[:title],
        }
      }
    }

    @props = default_props.merge(props).deep_transform_keys! { |key| key.to_s.camelize(:lower) }
  end

  def prepare_giftlist(gifts, is_current_user_list)
    gifts.map do |gift|
      claimer = !is_current_user_list && gift.claimer ?
        {
          id: gift.claimer.id,
          name: gift.claimer.name,
        }
     : nil
     group_owner = !is_current_user_list && gift.group_owner ?
       {
         id: gift.group_owner.id,
         name: gift.group_owner.title,
       }
    : nil
    owner = !is_current_user_list && gift.group_owner ?
      {
        id: gift.owner.id,
        name: gift.owner.name,
      }
   : nil

      {
        id: gift.id,
        title: gift.title,
        description: gift.description,
        priceLow: format_money(gift.price_low),
        priceHigh: format_money(gift.price_high),
        claimer: claimer,
        owner: owner,
        groupOwner: group_owner,
      }
    end
  end

end
  