class Report < ActiveRecord::Base
  # before_action :authenticate_user!
  has_attached_file :photo, :styles => { :medium => "200x200>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/


  has_many :report_tags
  has_many :tags, through: :report_tags
end
