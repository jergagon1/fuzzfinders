class AddCommentsToReports < ActiveRecord::Migration
  def change
    add_column :reports, :comments, :text
  end
end
