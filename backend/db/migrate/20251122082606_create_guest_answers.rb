class CreateGuestAnswers < ActiveRecord::Migration[7.1]
  def change
    create_table :guest_answers do |t|
      t.integer :guest_id
      t.integer :attendance
      t.text :allergy
      t.text :message

      t.timestamps
    end
  end
end
