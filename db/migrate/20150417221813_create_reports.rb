class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.string :pet_name
      t.string :coords
      t.belongs_to :users
      t.string :type
      t.timestamps null: false
    end

      add_attachment :reports, :photo
  end
end
