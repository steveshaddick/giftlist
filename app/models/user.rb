class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  before_create :validate_referring_email
  after_create :add_default_membership

  has_many :giftlist, class_name: 'Gift', foreign_key: 'owner_id'
  has_many :gifts_claimed, class_name: 'Gift', foreign_key: 'claimer_id'
  
  has_many :memberships
  has_many :gift_groups, through: :memberships

  validates :name, presence: true
  validates :referring_email, presence: true

  def personal_giftlist
    Gift.where('asker_id = ? AND owner_id = asker_id AND received = FALSE', id).order(created_at: :desc)
  end

  def group_giftlist(group_owner_ids = [])
    Gift.where('asker_id = ? AND (owner_id = asker_id OR group_owner_id IN (?)) AND received = FALSE', id, group_owner_ids).order(created_at: :desc)
  end

  def active_claimlist
    gifts_claimed.where(received: false)
  end

  private

  def validate_referring_email
    unless self.referring_email == "test@test.com"
      referring_user = User.find_by(email: self.referring_email)

      if referring_user.nil?
        self.errors.add('referring_email', "cannot find existing user for '#{self.referring_email}'")
        throw :abort
      end
    end
  end

  def add_default_membership
    unless self.referring_email == "test@test.com"
      referring_user = User.find_by(email: self.referring_email)
      default_group = referring_user.gift_groups[0]

      default_group.add_member(self.id)
    end
  end
end
