class CreatePaletteLikes < ActiveRecord::Migration
  def change
    create_table :palette_likes do |t|
      t.integer :user_id
      t.integer :palette_id

      t.timestamps null: false
    end

    add_index :palette_likes, :user_id
    add_index :palette_likes, [:user_id, :palette_id], unique: true
  end
end
