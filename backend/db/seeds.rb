if Guest.count == 0
  guest = Guest.create!(
    first_name: "太郎",
    middle_name: "",
    last_name: "山田",
    guest_side: 1,
  )

  GuestPersonalInfo.create!(
    guest_id: guest.id,
    email: "taro.yamada@example.com",
    postal_code: "100-0001",
    prefecture_code: "13",
    city_code: "13101",
    town: "千代田1-1",
    building: "皇居ビル101",
  )

  GuestAnswer.create!(
    guest_id: guest.id,
    attendance: 1,
    allergy: "なし",
    message: "おめでとうございます！",
  )

  puts "✅ ユーザーデータを #{Guest.count} 件作成しました。"
else
  puts "⚠️ ユーザーデータは既に存在するためスキップしました。"
end


if InvitationInfo.count == 0
  InvitationInfo.create!(
    venue_name: "会場名",
    postal_code: "100-0000",
    address: "東京都丸の内○○",
    open_time: "2026-05-20 17:00:00",
    start_time: "2026-05-20 17:30:00",
    bride_name: "鈴木花子",
    groom_name: "田中一郎",
    message: "新郎新婦からのメッセージ",
  )

  puts "✅ 招待状データを #{InvitationInfo.count} 件作成しました。"
else
  puts "⚠️ 招待状データは既に存在するためスキップしました。"
end
