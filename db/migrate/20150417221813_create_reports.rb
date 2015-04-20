class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.string :pet_name
      t.float :lat
      t.float :lng
      t.string :animal_type
      t.belongs_to :user
      t.string :report_type
      t.timestamps null: false
    end

      add_attachment :reports, :photo
  end
end
