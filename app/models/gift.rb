class Gift < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  belongs_to :asker, class_name: 'User'
  belongs_to :claimer, class_name: 'User', optional: true
  belongs_to :group_owner, class_name: 'GiftGroup', optional: true

  def private?
    self.group_owner.nil && (self.owner != self.asker)
  end

  def group_gift?
    !self.group_owner.nil?
  end
end
