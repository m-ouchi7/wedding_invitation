# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    guest = Guest.first
    guest_answer = GuestAnswer.find_by(guest_id: guest.id)
    guest_personal_info = GuestPersonalInfo.find_by(guest_id: guest.id)

    UserMailer.with(guest: guest, guest_answer: guest_answer, guest_personal_info: guest_personal_info).welcome_email
  end
end
