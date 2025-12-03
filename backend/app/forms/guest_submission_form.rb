class GuestSubmissionForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  # Guest の属性
  attr_accessor :first_name, :middle_name, :last_name, :guest_side
  
  # GuestPersonalInfo の属性
  attr_accessor :email, :postal_code, :prefecture_code, :city_code, :town, :building

  # GuestAnswer の属性
  attr_accessor :attendance, :allergy, :message

  # モデルインスタンス
  attr_reader :guest, :guest_personal_info, :guest_answer

  # バリデーション
  # Guest
  validates :first_name, presence: true, length: { maximum: 100 }
  validates :middle_name, length: { minimum: 1, maximum: 100 }, allow_blank: true
  validates :last_name, presence: true, length: { maximum: 100 }
  validates :guest_side, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1 }
  # GuestPersonalInfo
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP}, length: { maximum: 255 }
  validates :postal_code, presence: true, length: { maximum: 8 }
  validates :prefecture_code, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 99 }
  validates :city_code, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 99999 }
  validates :town, presence: true, length: { maximum: 100 }
  validates :building, length: { maximum: 100 }
  # GuestAnswer
  validates :attendance, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1 }

  def submit
    return false unless valid?

    ActiveRecord::Base.transaction do
      # Guest を作成
      @guest = Guest.create!(
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        guest_side: guest_side
      )
      
      # GuestPersonalInfo を作成
      @guest_personal_info = GuestPersonalInfo.create!(
        guest_id: @guest.id,
        email: email,
        postal_code: postal_code,
        prefecture_code: prefecture_code,
        city_code: city_code,
        town: town,
        building: building
      )
      
      # GuestAnswer を作成
      @guest_answer = GuestAnswer.create!(
        guest_id: @guest.id,
        attendance: attendance,
        allergy: allergy,
        message: message
      )
    end

    true
  rescue ActiveRecord::RecordInvalid => e
    # 各モデルのバリデーションエラーをまとめる
    e.record.errors.full_messages.each do |msg|
      errors.add(:base, msg)
    end
    false
  end
end
