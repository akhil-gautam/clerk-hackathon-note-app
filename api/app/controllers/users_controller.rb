class UsersController < ApplicationController
  def create
    if User.exists?(cid: params[:cid])
      render json: { message: 'User already exists.' }, status: 304
    else
      user = User.new(user_params)
      if user.save!
        Scratchpad.create(user_id: user.id)
        render json: {message: "User synced!"}, status: :ok
      end
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: {error: e.message}, status: 422
  end
  
  private
  
  def user_params
    params.permit(:email, :cid)
  end
end
