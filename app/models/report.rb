class Report < ActiveRecord::Base
  # before_action :authenticate_user!
  has_attached_file :photo, :styles => { :medium => "200x200>", :thumb => "100x100>" }, :default_url => "/images/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/


  has_many :report_tags
  has_many :tags, through: :report_tags
  belongs_to :user

  acts_as_mappable

  def all_tags=(names)
    self.tags = names.split(",").map do |name|
        Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end
  def self.tagged_with(name)
    Tag.find_by_name!(name).reports
  end

end
