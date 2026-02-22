require "test_helper"

class GuestMailerTest < ActionMailer::TestCase
  test "thanks_email" do
    mail = GuestMailer.thanks_email
    assert_equal "Thanks email", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
