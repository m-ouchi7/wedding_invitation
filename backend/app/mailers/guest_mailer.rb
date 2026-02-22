class GuestMailer < ApplicationMailer
  default from: -> { "#{ENV['GOOGLE_ID']}@gmail.com" }

  def thanks_email
    @guest = params[:guest]
    @guest_answer = params[:guest_answer]
    @guest_personal_info = params[:guest_personal_info]

    @url = 'http://example.com/login'

    mail(
      to: @guest_personal_info.email,
      subject: 'ご回答ありがとうございました',
      template_path: 'guest_mailer',
      template_name: 'thanks_email'
    )
  end
end
