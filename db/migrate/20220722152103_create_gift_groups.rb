class CreateGiftGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :gift_groups do |t|
      t.string :title
      t.text :description
      t.datetime :expiry_date

      t.timestamps
    end
  end
end
