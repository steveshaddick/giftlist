class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :gift_group
end
