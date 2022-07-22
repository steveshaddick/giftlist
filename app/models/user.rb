class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :giftlist, class_name: 'Gift', foreign_key: 'asker_id'
  has_many :gifts_gotten, class_name: 'Gift', foreign_key: 'getter_id'
  
  has_many :memberships
  has_many :gift_groups, through: :memberships
end
