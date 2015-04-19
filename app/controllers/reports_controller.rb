class ReportsController < ApplicationController


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
  end

  def add_tag
    @report = Report.find(params[:id])
    @report.tags << Tag.find_or_create_by(params[:tag])
  end

  def create
    @report = Report.create(report_params)
    redirect_to "/users/#{current_user.id}/reports/#{@report.id}"

    # respond_to do |format|
    #   if @report.save
    #     format.html { redirect_to @report, notice: 'Report was successfully created.' }
    #     format.json { render :show, status: :created, location: @report }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @report.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  def report_params
    params.require(:report).permit(:photo, :all_tags)
  end
end
