class Guest < ApplicationRecord
  has_one :guest_personal_info
  has_one :guest_answer
end
