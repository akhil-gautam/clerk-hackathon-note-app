class CreateNoteInvitations < ActiveRecord::Migration[6.1]
  def change
    create_table :note_invitations do |t|
      t.belongs_to :user
      t.belongs_to :note
      t.timestamps
    end
  end
end
