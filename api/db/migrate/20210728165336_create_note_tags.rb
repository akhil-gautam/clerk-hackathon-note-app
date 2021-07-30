class CreateNoteTags < ActiveRecord::Migration[6.1]
  def change
    create_table :note_tags do |t|
      t.string :title
      t.belongs_to :note
      t.timestamps
    end
  end
end
