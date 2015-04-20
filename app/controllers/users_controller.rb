class UsersController < ApplicationController
 before_action :authenticate_user!

 def index
 	@user_reports = current_user.reports
 end

 def show
  @user = User.find(params[:id])
 end

end
