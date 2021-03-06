Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  Paperclip.options[:command_path] = "/usr/local/bin/convert"

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false
  config.middleware.delete Rack::Lock


  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp

  # SMTP settings for gmail

  # config.action_mailer.smtp_settings = {
  #  :address              => "smtp.gmail.com",
  #  :port                 => 587,
  #  :user_name            => ENV['GMAIL_USERNAME'],
  #  :password             => ENV['GMAIL_PASSWORD'],
  #  :authentication       => "plain",
  # :enable_starttls_auto => true
  # }
  config.action_mailer.smtp_settings = {
    :address   => "smtp.mandrillapp.com",
    :port      => 25, # ports 587 and 2525 are also supported with STARTTLS
    :enable_starttls_auto => true, # detects and uses STARTTLS
    :user_name => ENV["MANDRILL_USERNAME"],
    :password  => ENV["MANDRILL_PASSWORD"], # SMTP password is any valid API key
    :authentication => 'login', # Mandrill supports 'plain' or 'login'
    :domain => 'Mandrill.com', # your domain to identify your server when connecting
  }
  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = true

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true
  # config.paperclip_defaults = {
  #     storage: :s3,
  #     :s3_credentials => {
  #       :bucket => ENV['S3_BUCKET_NAME'],
  #       :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
  #       :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']
  #     }
  #   }
  config.paperclip_defaults = {
      :storage => :fog,
      :fog_credentials => {
        :provider => "AWS",
        :aws_access_key_id => ENV['AWS_ACCESS_KEY_ID'],
        :aws_secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'],
        :region => 'us-west-1',

      },
      :fog_directory => ENV["S3_BUCKET_NAME"]
    }
    config.action_mailer.default_url_options = { :host => 'localhost:3000' }
end
