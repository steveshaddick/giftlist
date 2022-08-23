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

  # #personal_giftlist
  test "#personal_giftlist returns gifts" do
    user = users(:user1)

    assert user.personal_giftlist.count > 0
  end

  test "#personal_giftlist returns gifts only added and owned by user" do
    user = users(:user1)

    user.personal_giftlist.each do |gift|
      assert_equal user, gift.owner, "#personal_giftlist returned owner #{gift.owner.name} for #{gift.title}"
    end
  end

  # #group_giftlist
  test "#group_giftlist returns gifts" do
    user = users(:user1)

    assert user.group_giftlist.count > 0
  end

  test "#group_giftlist returns gifts added by both user and group members" do
    user = users(:user1)
    authenticated_user = users(:user2)
    group_ids = authenticated_user.gift_groups.ids

    user.group_giftlist(group_ids).each do |gift|
      if gift.group_owner.present?
        assert_includes group_ids, gift.group_owner.id, "#personal_giftlist returned group owner #{gift.group_owner.id} for #{gift.title}"
      else
        assert_equal user, gift.owner, "#personal_giftlist returned owner #{gift.owner.name} for #{gift.title}"
      end
    end
  end

  # #active_claimlist
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
