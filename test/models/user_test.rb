require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "cannot create new user without default values" do
    user = User.new
    assert_not user.save
  end

  test "cannot create new user without referring email" do
    user = User.new({
      email: 'test@test.com',
      name: 'Test User',
      password: 'password',
      password_confirmation: 'password',
    })
    assert_not user.save
  end

  test "cannot create new user without existing user referring email" do
    user = User.new({
      email: 'test@test.com',
      name: 'Test User',
      password: 'password',
      password_confirmation: 'password',
      referring_email: 'unknown@test.com',
    })
    assert_not user.save
  end

  test "can create new user with test referring email" do
    user = User.new({
      email: 'test@test.com',
      name: 'Test User',
      password: 'password',
      password_confirmation: 'password',
      referring_email: 'test@test.com',
    })
    assert user.save
  end

  test "can create new user with existing user referring email" do
    referring_user = users(:user1)

    user = User.new({
      email: 'test@test.com',
      name: 'Test User',
      password: 'password',
      password_confirmation: 'password',
      referring_email: referring_user.email,
    })
    assert user.save, "New user with referring email not created"

    assert_equal referring_user.gift_groups[0], user.gift_groups[0], "New user doesn't have same gift group as referring user"
  end

  ## User gift testing
  test "#active_giftlist returns gifts" do
    user = users(:user1)

    assert user.active_giftlist.count > 0
  end

  test "#active_giftlist returns only gifts owned by user" do
    user = users(:user1)

    user.active_giftlist.each do |gift|
      assert_equal user, gift.owner, "#active_giftlist returned owner #{gift.owner.name} for #{gift.title}"
    end
  end

  test "#active_giftlist returns only non-received gifts" do
    user = users(:user1)

    user.active_giftlist.each do |gift|
      assert_not gift.received, "#active_giftlist returned received gift: #{gift.title}"
    end
  end

  test "#active_claimlist returns gifts" do
    user = users(:user1)

    assert user.active_claimlist.count > 0
  end

  test "#active_claimlist returns gifts only claimed by user" do
    user = users(:user1)

    user.active_claimlist.each do |gift|
      assert_equal user, gift.claimer, "#active_claimlist returned claimer #{gift.owner.name} for #{gift.title}"
    end
  end
end
