class ReportsController < ApplicationController
  include Geokit::Geocoders
  before_action :set_report, only: [:show, :edit, :update, :destroy]

  def index
    if params[:tag]
      @reports5 = Report.tagged_with(params[:tag])
      @lat = GoogleGeocoder.geocode(current_user.zipcode).lat
      @lng = GoogleGeocoder.geocode(current_user.zipcode).lng
      @photos = []
      @tags = []
      @reports5.each do |report|
        @photos << report.photo.url
        @tags << report.tags
      end
      @reports10 = @reports5
      @reports25 = @reports5
    else
      @reports5 = Report.within(5, :origin => "#{current_user.zipcode}")
      @reports10 = Report.within(10, :origin => "#{current_user.zipcode}")
      @reports25 = Report.within(25, :origin => "#{current_user.zipcode}")
      @photos5 = []
      @photos10 = []
      @photos25 = []
      @tags5 = []
      @tags10 = []
      @tags25 = []
      @lat = GoogleGeocoder.geocode(current_user.zipcode).lat
      @lng = GoogleGeocoder.geocode(current_user.zipcode).lng
      @reports5.each do |report|
        @photos5 << report.photo.url
        @tags5 << report.tags
      end
      @reports10.each do |report|
        @photos10 << report.photo.url
        @tags10 << report.tags
      end
      @reports25.each do |report|
        @photos25 << report.photo.url
        @tags25 << report.tags
      end
      @all_nearby = [@reports5, @reports10, @reports25]
      @all_photos = [@photos5, @photos10, @photos25]
      @all_tags = [@tags5, @tags10, @tags25]
    end
  end

  def show
    @report = Report.find(params[:id])
    @nearby_reports5 = find_nearby_reports(5)
    @nearby_photos5 = []
    @nearby_tags5 = []
    @nearby_reports5.each do |report|
      @nearby_photos5 << report.photo.url
      @nearby_tags5 << report.tags
    end   
    @nearby_reports10 = find_nearby_reports(10)
    @nearby_photos10 = []
    @nearby_tags10 = []
    @nearby_reports10.each do |report|
      @nearby_photos10 << report.photo.url
      @nearby_tags10 << report.tags
    end 
    @nearby_reports25 = find_nearby_reports(25)
    @nearby_photos25 = []
    @nearby_tags25 = []
    @nearby_reports25.each do |report|
      @nearby_photos25 << report.photo.url
      @nearby_tags25 << report.tags
    end
    @all_nearby = [@nearby_reports5, @nearby_reports10, @nearby_reports25]
    @all_photos = [@nearby_photos5, @nearby_photos10, @nearby_photos25]
    @all_tags = [@nearby_tags5, @nearby_tags10, @nearby_tags25]
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
    if report.report_type == "found"
      current_user.wag += 1
      current_user.save
    end
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

    render json: @report
    # redirect_to "/users/#{current_user.id}/reports/#{@report.id}"
    # redirect_to "/"
    # p "test"

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

  def find_nearby_reports(radius)
    @report = Report.find(params[:id])
    Report.within(radius, :origin => [@report.lat, @report.lng])
  end

  def set_report
    @report = Report.find(params[:id])
  end

  def report_params
    params.require(:report).permit(:photo, :all_tags, :pet_name, :report_type, :user_id, :lat, :lng, :animal_type, :comments)
  end
end
