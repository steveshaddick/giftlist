class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :giftlist, class_name: 'Gift', foreign_key: 'asker_id'
  has_many :gifts_claimed, class_name: 'Gift', foreign_key: 'claimer_id'
  
  has_many :memberships
  has_many :gift_groups, through: :memberships

  def active_giftlist
    giftlist.where(owner_id: self.id).where(received: false)
  end

  def claimlist
    gifts_claimed.where(received: false)
  end
end
