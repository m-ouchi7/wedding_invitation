# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_11_24_083017) do
  create_table "guest_answers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "guest_id", null: false
    t.integer "attendance", limit: 1, null: false, unsigned: true
    t.text "allergy", size: :long
    t.text "message", size: :long
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guest_id"], name: "index_guest_answers_on_guest_id"
  end

  create_table "guest_personal_infos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "guest_id", null: false
    t.string "email", null: false
    t.string "postal_code", limit: 8, null: false
    t.integer "prefecture_code", limit: 2, null: false
    t.bigint "city_code", null: false
    t.string "town", limit: 100, null: false
    t.string "building", limit: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guest_id"], name: "index_guest_personal_infos_on_guest_id"
  end

  create_table "guests", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "first_name", limit: 100, null: false
    t.string "middle_name", limit: 100
    t.string "last_name", limit: 100, null: false
    t.integer "guest_side", limit: 1, null: false, unsigned: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invitation_infos", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "venue_name", limit: 100
    t.string "postal_code", limit: 15
    t.string "address"
    t.datetime "open_time"
    t.datetime "start_time"
    t.string "bride_name", limit: 100
    t.string "groom_name", limit: 100
    t.text "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "guest_answers", "guests"
  add_foreign_key "guest_personal_infos", "guests"
end
