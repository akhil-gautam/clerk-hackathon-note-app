class AddTrashedToNotes < ActiveRecord::Migration[6.1]
  def change
    add_column :notes, :trashed, :boolean, default: false
  end
end
