class CreateInvitationInfos < ActiveRecord::Migration[7.1]
  def change
    create_table :invitation_infos do |t|
      t.string :venue_name, limit: 100
      t.string :postal_code, limit: 15
      t.string :address, limit: 255
      t.datetime :open_time
      t.datetime :start_time
      t.string :bride_name, limit: 100
      t.string :groom_name, limit: 100
      t.text :message

      t.timestamps
    end
  end
end
