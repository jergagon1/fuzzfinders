class AddWagsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :wag, :integer
  end
end
