ActionMailer::Base.smtp_settings = {
    :address   => "smtp.mandrillapp.com",
    :port      => 587,
    :enable_starttls_auto => true,
    :user_name => ENV['MANDRILL_USERNAME'],
    :password  => ENV['MANDRILL_API_KEY'],
    :authentication => 'login'
  }
ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.default charset: "utf-8"

# MandrillMailer.configure do |config|
#   config.api_key = ENV['MANDRILL_API_KEY']
# end
