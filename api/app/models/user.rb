class User < ApplicationRecord
  validates :email, presence: true
  validates :cid, presence: true

  has_many :notes
  has_one :scratchpad
  
end
