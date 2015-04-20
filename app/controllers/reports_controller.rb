class ReportsController < ApplicationController
  before_action :set_report, only: [:show, :edit, :update, :destroy]

  def index
    if params[:tag]
      @reports = Report.tagged_with(params[:tag])
    else
      @reports = Report.all
    end
  end

  def show
    @report = Report.find(params[:id])
  end

  def new
    @report = Report.new
  end

  def edit
    @report = Report.find(params[:id])
  end

  def add_tag
    @report = Report.find(params[:id])
    @report.tags << Tag.find_or_create_by(params[:tag])
  end

  def create
    report = current_user.reports.create(report_params)
    redirect_to "/users/#{current_user.id}/reports/#{report.id}/edit"

    # respond_to do |format|
    #   if @report.save
    #     format.html { redirect_to @report, notice: 'Report was successfully created.' }
    #     format.json { render :show, status: :created, location: @report }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @report.errors, status: :unprocessable_entity }
    #   end
    # end
    # UserMailer.welcome_email(@user).deliver

  end

  def update
    @report = Report.find(params[:id])
    @report.update(report_params)
    redirect_to "/"
    p "test"
    # respond_to do |format|
    #   if @report.update(report_params)
    #     format.html { redirect_to :user_report_path, notice: 'Report was successfully updated.'}
    #     # format.json { render :json => "window.location.href = '/reports'" }
    #     # format.json { render :js => "window.location = '/reports'" }
    #     # format.json { render :show, status: :ok, location: @user_report }
    #   else
    #     # format.html { render :edit }
    #     # format.json { render json: @report.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  private

  def set_report
    @report = Report.find(params[:id])
  end

  def report_params
    params.require(:report).permit(:photo, :all_tags, :pet_name, :report_type, :user_id, :coords, :animal_type)
  end
end
