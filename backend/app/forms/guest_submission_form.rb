class GuestSubmissionForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  # モデルインスタンス
  attr_reader :guest, :guest_personal_info, :guest_answer

  # Guest
  attribute :first_name, :string
  attribute :middle_name, :string
  attribute :last_name, :string
  attribute :guest_side, :integer
  
  # GuestPersonalInfo
  attribute :email, :string
  attribute :postal_code, :string
  attribute :prefecture_code, :integer
  attribute :city_code, :integer
  attribute :town, :string
  attribute :building, :string

  # GuestAnswer
  attribute :attendance, :integer
  attribute :allergy, :string
  attribute :message, :string

  # Guest
  with_options presence: true do
    validates :first_name, length: { maximum: 100 }
    validates :last_name, length: { maximum: 100 }
    validates :guest_side, numericality: { only_integer: true, less_than_or_equal_to: 1 }
  end
  validates :middle_name, length: { minimum: 1, maximum: 100 }, allow_blank: true

  # GuestPersonalInfo
  with_options presence: true do
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP}, length: { maximum: 255 }
    validates :postal_code, length: { maximum: 8 }
    validates :city_code, numericality: { only_integer: true, less_than_or_equal_to: 99999}
    validates :prefecture_code, numericality: { only_integer: true, less_than_or_equal_to: 99}
    validates :town, length: { maximum: 100 }
  end
  validates :building, length: { maximum: 100 }

  # GuestAnswer
  validates :attendance, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1 }

  def submit
    return false unless valid?

    ActiveRecord::Base.transaction do
      @guest = Guest.create!(
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        guest_side: guest_side
      )
      
      @guest_personal_info = GuestPersonalInfo.create!(
        guest_id: @guest.id,
        email: email,
        postal_code: postal_code,
        prefecture_code: prefecture_code,
        city_code: city_code,
        town: town,
        building: building
      )
      
      @guest_answer = GuestAnswer.create!(
        guest_id: @guest.id,
        attendance: attendance,
        allergy: allergy,
        message: message
      )
    end

    true
  
  # DB規約違反を捕捉
  rescue ActiveRecord::StatementInvalid, Mysql2::Error => e
    user_message = "システムエラーが発生しました。入力内容を確認してください。"
    errors.add(:base, user_message)

    Rails.logger.error "DB制約違反を捕捉: #{e.class.name}: #{e.message}"
    false
  end
end
