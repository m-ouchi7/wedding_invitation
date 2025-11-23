class CreateGuests < ActiveRecord::Migration[7.1]
  def change
    create_table :guests do |t|
      t.string :first_name, limit: 100, null: false
      t.string :middle_name, limit: 100
      t.string :last_name, limit: 100, null: false
      t.integer :guest_side, limit: 1, unsigned: true, null: false

      t.timestamps
    end
  end
end
