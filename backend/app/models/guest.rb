class Guest < ApplicationRecord
  has_one :guest_personal_info
  has_one :guest_answer
  
  validates :first_name, presence: true, length: { maximum: 100 }
  validates :middle_name, length: { minimum: 1, maximum: 100 }, allow_blank: true
  validates :last_name, presence: true, length: { maximum: 100 }
  validates :guest_side, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1 }
end
