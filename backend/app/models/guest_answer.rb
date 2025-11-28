class GuestAnswer < ApplicationRecord
  belongs_to :guest

  validates :attendance, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1 }
  # validates :allergy
  # validates :message
end
