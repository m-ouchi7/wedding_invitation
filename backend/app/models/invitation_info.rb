class InvitationInfo < ApplicationRecord
  before_create :generate_unique_code

  private

  def generate_unique_code
    self.code = loop do
      random_code = SecureRandom.alphanumeric(8)
      break random_code unless InvitationInfo.exists?(code: random_code)
    end
  end
end
