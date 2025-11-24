class CreateGuestAnswers < ActiveRecord::Migration[7.1]
  def change
    create_table :guest_answers do |t|
      t.references :guest, null: false, foreign_key: true
      t.integer :attendance, limit: 1, unsigned: true, null: false
      t.text :allergy
      t.text :message

      t.timestamps
    end
  end
end
