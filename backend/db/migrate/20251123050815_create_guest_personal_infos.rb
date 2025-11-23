class CreateGuestPersonalInfos < ActiveRecord::Migration[7.1]
  def change
    create_table :guest_personal_infos do |t|
      t.references :guest, null: false, foreign_key: true
      t.string :email, limit: 255, null: false
      t.string :phone, limit: 15
      t.string :postal_code, limit: 8, null: false
      t.integer :prefecture_code, limit: 2, null: false
      t.integer :city_code, limit: 5, null: false
      t.string :town, limit: 100, null: false
      t.string :building, limit: 100, null: false

      t.timestamps
    end
  end
end
