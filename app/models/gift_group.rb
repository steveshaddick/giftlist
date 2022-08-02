class GiftGroup < ApplicationRecord
  has_many :memberships
  has_many :users, through: :memberships

  def users_except(user_id)
    users.where.not(id: user_id)
  end

  def add_user(user_id)
    membership = Membership.create({
      user_id: user_id,
      gift_group: self,
    })
  end
end
