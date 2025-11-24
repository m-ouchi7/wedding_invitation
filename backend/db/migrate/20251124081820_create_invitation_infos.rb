class CreateInvitationInfos < ActiveRecord::Migration[7.1]
  def change
    create_table :invitation_infos do |t|
      t.string :venue_name, limit: 100, null: false
      t.string :postal_code, limit: 15, null: false
      t.string :address, limit: 255, null: false
      t.datetime :open_time, null: false
      t.datetime :start_time, null: false
      t.string :bride_name, limit: 100, null: false
      t.string :groom_name, limit: 100, null: false
      t.text :message, limit: 4294967295, null: false

      t.timestamps
    end
  end
end
