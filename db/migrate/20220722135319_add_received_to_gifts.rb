class AddReceivedToGifts < ActiveRecord::Migration[7.0]
  def change
    add_column :gifts, :received, :boolean, default: false
  end
end
