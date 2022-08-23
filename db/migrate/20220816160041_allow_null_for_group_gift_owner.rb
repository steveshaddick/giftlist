class AllowNullForGroupGiftOwner < ActiveRecord::Migration[7.0]
  def change
    change_column_null :gifts, :group_owner_id, true
  end
end
