class AddGroupOwnerToGift < ActiveRecord::Migration[7.0]
  def change
    add_reference :gifts, :group_owner, null: false, foreign_key: { to_table: :gift_groups }, index: true, default: 1
    change_column_default :gifts, :group_owner_id, nil
  end
end
