class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  def index

  end

  def new
    redirect_to :new_user_registration
  end

end
