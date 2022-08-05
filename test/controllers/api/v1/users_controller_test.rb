require "test_helper"

module Api::V1
  class UsersControllerTest < ActionDispatch::IntegrationTest
    include Devise::Test::IntegrationHelpers

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
      authenticated_user = users(:user1)
      request_user = users(:user2)
      endpoints = [
        'claimlist',
        'asklist',
        'groups',
      ]

      sign_in authenticated_user

      endpoints.each do |endpoint|
        path = "/api/v1/users/#{request_user.id}/#{endpoint}"
        get path

        assert_response 401, "#{path} did not return unauthorized status for User #{request_user.id}"
      end
    end

    test "#claimlist returns expected list" do
      user = users(:user1)
      sign_in users(:user1)
      
      get "/api/v1/users/#{user.id}/claimlist"
      json_response = JSON.parse(response.body)

      assert_response 200
      assert_equal "", json_response
    end


  end
end