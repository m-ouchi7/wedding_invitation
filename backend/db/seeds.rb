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
    phone: "090-1234-5678",
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
