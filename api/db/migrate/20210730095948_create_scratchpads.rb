class CreateScratchpads < ActiveRecord::Migration[6.1]
  def change
    create_table :scratchpads do |t|
      t.belongs_to :user
      t.text :data
      t.timestamps
    end
  end
end
