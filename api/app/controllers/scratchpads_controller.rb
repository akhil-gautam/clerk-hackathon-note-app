class ScratchpadsController < ApplicationController
  def index
    scratchpad = Scratchpad.find_by(user_id: @current_user.id)
    render json: scratchpad, status: 200
  end

  def save
    scratchpad = Scratchpad.find_by(user_id: @current_user.id)
    scratchpad.update(params.permit(:data))
    render json: scratchpad, status: 200
  end
end
