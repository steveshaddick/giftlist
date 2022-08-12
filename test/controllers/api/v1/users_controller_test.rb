require "test_helper"

module Api::V1
  class UsersControllerTest < ActionDispatch::IntegrationTest

    test "unauthenticated endpoints will return unauthorized status" do
      user = users(:user1)
      endpoints = [
        'claimlist',
        'asklist',
        'groups',
      ]

      endpoints.each do |endpoint|
        path = "/api/v1/users/#{user.id}/#{endpoint}"
        get path

        assert_response 401, "#{path} did not return 401 when not authenticated"
      end
    end

    test "wrong user (unauthorized) endpoints will return unauthorized status" do
      request_user = users(:user2)
      endpoints = [
        'claimlist',
        'asklist',
        'groups',
      ]

      authenticated_user = sign_in_user(:user1)

      endpoints.each do |endpoint|
        path = "/api/v1/users/#{request_user.id}/#{endpoint}"
        get path

        assert_response 401, "#{path} did not return unauthorized status for User #{request_user.id}"
      end
    end

    test "#claimlist returns expected list" do
      authenticated_user = sign_in_user(:user1)
      expected_gift = gifts(:gift3)
      
      get "/api/v1/users/#{authenticated_user.id}/claimlist"
      json_response = JSON.parse(response.body, :symbolize_names => true)
      gifts = json_response[:data]

      assert_response 200
      assert_equal 1, gifts.count
      assert_equal expected_gift[:id], gifts[0][:id]
    end

    test "#asklist returns expected list" do
      authenticated_user = sign_in_user(:user1)
      expected_gift = gifts(:gift1)
      
      get "/api/v1/users/#{authenticated_user.id}/asklist"
      json_response = JSON.parse(response.body, :symbolize_names => true)
      gifts = json_response[:data]

      assert_response 200
      assert_equal 2, gifts.count
      assert_equal expected_gift[:id], gifts[0][:id]
    end

    test "#groups returns expected list" do
      authenticated_user = sign_in_user(:user1)
      expected_group = gift_groups(:group1)
      
      get "/api/v1/users/#{authenticated_user.id}/groups"
      json_response = JSON.parse(response.body, :symbolize_names => true)
      groups = json_response[:data]

      assert_response 200
      assert_equal 1, groups.count
      assert_equal expected_group[:id], groups[0][:id]
      assert_equal expected_group.members[1][:id], groups[0][:members][1][:id]
    end

  end
end