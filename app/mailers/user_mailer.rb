class UserMailer < ActionMailer::Base
  default from: "no-reply@gmail.com"
  default to: "peterbrownpa@gmail.com"

  def new_user(user)
    @user = user
    mail(subject: "New User: #{user.email}")
  end
  # def welcome_email(user)
  #   @user = user
  #   @url = 'http://www.google.com'
  #   mail(to: @user.email, subject: 'Welcome to My Awesome Site')

  # end
end
