class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_signup_parameters, :only => [:create]
  before_filter :configure_edit_parameters, :only => [:update]

  protected
  def configure_signup_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :zipcode, :password, :password_confirmation)}
  end

  def configure_edit_parameters
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :zipcode, :password, :password_confirmation, :current_password)}
  end

  # def after_inactive_sign_up_path_for(resource)

  # end

end
