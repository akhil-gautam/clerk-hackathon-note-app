class Note < ApplicationRecord
  belongs_to :user
  scope :active, -> { where(trashed: false) }
  scope :trashed, -> { where(trashed: true) }
end
