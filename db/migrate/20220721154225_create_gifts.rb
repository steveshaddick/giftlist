class CreateGifts < ActiveRecord::Migration[7.0]
  def change
    create_table :gifts do |t|
      t.string :title
      t.text :description
      t.integer :price_low
      t.integer :price_high
      t.references :asker, null: false
      t.references :getter, null: true

      t.timestamps
    end
    add_foreign_key :gifts, :users, column: :asker_id
    add_foreign_key :gifts, :users, column: :getter_id
  end
end
