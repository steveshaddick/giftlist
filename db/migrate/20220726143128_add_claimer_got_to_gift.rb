class AddClaimerGotToGift < ActiveRecord::Migration[7.0]
  def change
    add_column :gifts, :claimer_got, :boolean
    change_column_null :gifts, :claimer_got, false, false
  end
end
