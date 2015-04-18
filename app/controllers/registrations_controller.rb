class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters, :only => [:create]

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:email, :zipcode, :password, :password_confirmation)}
  end

  def after_inactive_sign_up_path_for(resource)

  end

end
