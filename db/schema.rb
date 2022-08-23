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

ActiveRecord::Schema[7.0].define(version: 2022_08_16_160041) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "gift_groups", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "expiry_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "gifts", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "price_low"
    t.integer "price_high"
    t.bigint "asker_id", null: false
    t.bigint "claimer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "received", default: false
    t.boolean "claimer_got", default: false, null: false
    t.bigint "owner_id", null: false
    t.bigint "group_owner_id"
    t.index ["asker_id"], name: "index_gifts_on_asker_id"
    t.index ["claimer_id"], name: "index_gifts_on_claimer_id"
    t.index ["group_owner_id"], name: "index_gifts_on_group_owner_id"
    t.index ["owner_id"], name: "index_gifts_on_owner_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "gift_group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["gift_group_id"], name: "index_memberships_on_gift_group_id"
    t.index ["user_id"], name: "index_memberships_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "referring_email"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "gifts", "gift_groups", column: "group_owner_id"
  add_foreign_key "gifts", "users", column: "asker_id"
  add_foreign_key "gifts", "users", column: "claimer_id"
  add_foreign_key "gifts", "users", column: "owner_id"
  add_foreign_key "memberships", "gift_groups"
  add_foreign_key "memberships", "users"
end
