class ChangeClaimerGotDefault < ActiveRecord::Migration[7.0]
  def change
    change_column :gifts, :claimer_got, :boolean, default: false
  end
end
