class ApplicationController < ActionController::API
  before_action :validate_session

  private

  def validate_session
    clerk = Clerk::SDK.new(api_key: "CLERK_KEY_HERE")
    cl = clerk.sessions.find(params[:session])
    @current_user = User.find_by(cid: cl["user_id"])
  rescue Clerk::Errors::Authentication => e
    render json: { error: "No session was found with id #{params[:session]}"}, status: 404
  end
end
