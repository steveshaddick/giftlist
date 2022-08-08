class GiftGroup < ApplicationRecord
  has_many :memberships
  has_many :members, through: :memberships, source: :user

  def members_except(user_id)
    members.where.not(id: user_id)
  end

  def add_member(user_id)
    membership = Membership.create({
      user_id: user_id,
      gift_group: self,
    })
  end
end
