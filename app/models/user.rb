class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         has_many :reports

# after_create :send_notification

#   def send_notification
#     UserMailer.new_user(self).deliver
#   end
end
