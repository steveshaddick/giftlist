class Gift < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  belongs_to :asker, class_name: 'User'
  belongs_to :claimer, class_name: 'User', optional: true

  def private?
    self.owner != self.asker
  end
end
