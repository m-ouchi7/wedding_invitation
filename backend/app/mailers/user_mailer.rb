class UserMailer < ApplicationMailer
  default from: -> { "#{ENV['GOOGLE_ID']}@gmail.com" }

  def welcome_email
    @guest = params[:guest]
    @guest_answer = params[:guest_answer]
    @guest_personal_info = params[:guest_personal_info]

    @url = 'http://example.com/login'
    mail(
      to: @guest_personal_info.email,
      subject: 'Welcome to Our Wedding App',
      template_path: 'user_mailer',
      template_name: 'welcome_email'
    )
  end
end
