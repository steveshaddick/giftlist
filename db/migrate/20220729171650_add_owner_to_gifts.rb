class AddOwnerToGifts < ActiveRecord::Migration[7.0]
  def change
    add_reference :gifts, :owner, null: false, foreign_key: { to_table: :users }, index: true, default: 1
    change_column_default :gifts, :owner_id, nil
  end
end
