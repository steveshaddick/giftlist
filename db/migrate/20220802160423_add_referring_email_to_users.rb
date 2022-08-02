class AddReferringEmailToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referring_email, :string
  end
end
