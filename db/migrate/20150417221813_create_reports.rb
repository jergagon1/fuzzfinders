class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.string :pet_name
      t.string :photo_url
      t.string :coords
      t.belongs_to :users
      t.string :op_contact_info
      t.string :type
      t.timestamps null: false
    end
  end
end
