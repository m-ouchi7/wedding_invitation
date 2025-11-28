class GuestPersonalInfo < ApplicationRecord
  belongs_to :guest
  
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP}, length: { maximum: 255 }
  validates :postal_code, presence: true,  length: { maximum: 8 }
  validates :prefecture_code, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 99 }
  validates :city_code, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 99999 }
  validates :town, presence: true,  length: { maximum: 100 }
  validates :building, presence: true,  length: { maximum: 100 }
end
