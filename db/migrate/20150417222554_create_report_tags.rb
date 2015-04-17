class CreateReportTags < ActiveRecord::Migration
  def change
    create_table :report_tags do |t|
      t.belongs_to :report
      t.belongs_to :tag
      t.timestamps null: false
    end
  end
end
