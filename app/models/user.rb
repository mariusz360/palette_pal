class User < ActiveRecord::Base
  has_secure_password

  has_many :palette_likes

  validates :username, presence: true, uniqueness: true
end
