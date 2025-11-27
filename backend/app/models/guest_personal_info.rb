class GuestPersonalInfo < ApplicationRecord
  belongs_to :guest
  
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP}
  validates :postal_code, presence: true
  validates :prefecture_code, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 99 }
  validates :city_code, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 999 }
  validates :town, presence: true
  validates :building, presence: true
end
