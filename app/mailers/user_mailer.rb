class UserMailer < ActionMailer::Base
  default from: "no-reply@gmail.com"

  def mandrill_client
    @mandrill_client ||= Mandrill::API.new ENV['MANDRILL_API_KEY']
  end

  def new_user(user)
    @user = user
    mail(to: user.email, subject: "New User: #{user.username}")
  end
  # to make dynamic pass in user parameter
  def lost_pet(report,user)
    template_name = "lost-pet"
    template_content = []
    message = {
      to:[{email: user.email}],
      subject: "Lost: #{report.animal_type}",
      merge_vars: [
        {rcpt: user.email,
          vars: [
            {name: "REPORT_ANIMAL", content: report.animal_type }
          ]
        }
      ]
    }
    mandrill_client.messages.send_template template_name, template_content, message
  end
  # def welcome_email(user)
  #   @user = user
  #   @url = 'http://www.google.com'
  #   mail(to: @user.email, subject: 'Welcome to My Awesome Site')

  # end
end
