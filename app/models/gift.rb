class Gift < ApplicationRecord
  belongs_to :asker, class_name: 'User'
  belongs_to :claimer, class_name: 'User', optional: true
end
