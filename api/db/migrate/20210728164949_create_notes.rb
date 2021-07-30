class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :title
      t.belongs_to :user
      t.jsonb :raw, null: false, default: '{}'
      t.timestamps
    end
  end
end
