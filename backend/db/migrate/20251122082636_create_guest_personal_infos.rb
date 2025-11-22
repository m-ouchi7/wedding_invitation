class CreateGuestPersonalInfos < ActiveRecord::Migration[7.1]
  def change
    create_table :guest_personal_infos do |t|
      t.integer :guest_id
      t.string :email
      t.string :phone
      t.integer :postal_code
      t.integer :prefecture_code
      t.integer :city_code
      t.string :town
      t.string :building

      t.timestamps
    end
  end
end
