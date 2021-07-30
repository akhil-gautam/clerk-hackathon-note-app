class NotesController < ApplicationController

  def index
    notes = @current_user ? @current_user.notes : []
    render json: { notes: notes }, status: 200
  end
  
  def create
    note = Note.create!(user: @current_user)
    render json: { note: note }, status: 200
  end
  
  def update
    if can_access?
      @note.update(title: params[:title], raw: params[:raw])
      render json: @note, status: 200
    else
      render json: { message: 'Unauthorized to access.'}, status: 401
    end
  rescue Exception => e
    render json: { message: e.message }, status: 422
  end

  def show
    if can_access?
      render json: @note, status: 200
    else
      render json: { message: 'Unauthorized to access.'}, status: 401
    end
  rescue Exception => e
    render json: { message: e.message }, status: 422
  end

  private

  def note_params
    params.permit(:title, :raw)
  end

  def can_access?
    @note = Note.find(params[:id])
    @note.user_id == @current_user.id
  end
end
