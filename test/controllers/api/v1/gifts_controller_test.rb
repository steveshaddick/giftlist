require "test_helper"

module Api::V1
  class GiftsControllerTest < ActionDispatch::IntegrationTest

    test "unauthenticated routes will return unauthorized status" do
      routes = [
        {
          method: :post,
          endpoint: '/',
        },
        {
          method: :patch,
          endpoint: '/1',
        },
        {
          method: :delete,
          endpoint: '/1',
        },
      ]

      routes.each do |route|
        path = "/api/v1/gifts#{route[:endpoint]}"
        send route[:method], path

        assert_response 401, "#{path} did not return 401 when not authenticated"
      end
    end

    #
    # CREATE
    #

    test "#create will create an asking gift when asker is authenticated user" do
      authenticated_user = sign_in_user(:user1)
      new_gift_json = create_new_gift(authenticated_user)

      response = send_api_and_parse_response("/api/v1/gifts/", method: :post, data: new_gift_json)
      new_gift_response = response[:data]
      new_gift_db = Gift.find(new_gift_response[:id])

      assert_response 200
      assert_equal new_gift_json[:title], new_gift_db[:title]
      assert_not new_gift_db.private?
    end

    test "#create will create a private gift when asker is not authenticated user" do
      authenticated_user = sign_in_user(:user1)
      new_gift_json = create_new_gift(users(:user2))

      response = send_api_and_parse_response("/api/v1/gifts/", method: :post, data: new_gift_json)
      new_gift_response = response[:data]
      new_gift_db = Gift.find(new_gift_response[:id])
      
      assert_response 200
      assert_equal new_gift_json[:title], new_gift_db[:title]
      assert new_gift_db.private?
    end

    test "#create will create a group gift when group owner is supplied" do
      authenticated_user = sign_in_user(:user1)
      target_user = users(:user2)
      new_gift_json = create_new_group_gift(target_user, authenticated_user.gift_groups[0])

      response = send_api_and_parse_response("/api/v1/gifts/", method: :post, data: new_gift_json)
      new_gift_response = response[:data]
      new_gift_db = Gift.find(new_gift_response[:id])
      
      assert_response 200
      assert_equal new_gift_json[:title], new_gift_db[:title]
      assert new_gift_db.group_gift?
    end

    test "#create will not create group gift when authenticated user not in proper group" do
      authenticated_user = sign_in_user(:user1)
      target_user = users(:user2)
      new_gift_json = create_new_group_gift(target_user, gift_groups(:group2))

      response = send_api_and_parse_response("/api/v1/gifts/", method: :post, data: new_gift_json)
      new_gift_response = response[:data]
      
      assert_response 401
      assert_not response[:success]
    end

    #
    # DELETE
    #

    test "#delete will not delete gift if not owned by authenticated user" do
      authenticated_user = sign_in_user(:user1)
      other_user = users(:user2)
      other_gift = other_user.giftlist[0]

      response = send_api_and_parse_response("/api/v1/gifts/#{other_gift.id}", method: :delete)
      
      assert_response 401
    end

    test "#delete returns 404 when gift record not found" do
      authenticated_user = sign_in_user(:user1)

      response = send_api_and_parse_response("/api/v1/gifts/123456", method: :delete)

      assert_response 404
    end

    test "#delete will delete gift when owned by authenticated user" do
      authenticated_user = sign_in_user(:user1)
      gift_to_delete = authenticated_user.giftlist[0]
      original_count = authenticated_user.giftlist.count

      response = send_api_and_parse_response("/api/v1/gifts/#{gift_to_delete.id}", method: :delete)
      
      assert_response 200
      assert_equal original_count - 1, authenticated_user.giftlist.count
    end

    test "#delete will delete group gift when owned by authenticated user group" do
      authenticated_user = sign_in_user(:user2)
      gift_to_delete = gifts(:gift7)
      target_user = users(:user1)
      original_count = target_user.group_giftlist(authenticated_user.gift_groups.ids).count

      response = send_api_and_parse_response("/api/v1/gifts/#{gift_to_delete.id}", method: :delete)
      
      assert_response 200
      assert_equal original_count - 1, target_user.group_giftlist(authenticated_user.gift_groups.ids).count
    end

    #
    # UPDATE
    #

    test "#update will update gift when title is supplied" do
      authenticated_user = sign_in_user(:user1)
      gift = authenticated_user.giftlist[0]
      original_description = gift[:description]

      update_data = {
        title: "New Title",
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 200
      assert_equal "New Title", response_data[:title]
      assert_equal original_description, response_data[:description], "Gift updated description when only title was supplied"
    end

    test "#update will update all gift values when keys are supplied" do
      authenticated_user = sign_in_user(:user1)
      gift = authenticated_user.giftlist[0]

      update_data = {
        title: "New Title",
        description: "New description",
        priceHigh: 99.99,
        priceLow: 9.99,
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 200
      assert_equal update_data[:title], response_data[:title]
      assert_equal update_data[:description], response_data[:description]
      assert_equal update_data[:priceHigh], response_data[:priceHigh]
      assert_equal update_data[:priceLow], response_data[:priceLow]
    end

    test "#update will return unauthorized for wrong user" do
      authenticated_user = sign_in_user(:user1)
      gift = gifts(:gift2)
      original_title = gift[:title]

      update_data = {
        title: "New Title",
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}", method: :patch, data: update_data)
      response_data = response[:data]

      updated_gift = Gift.find(gift.id)

      assert_response 401
      assert_equal "Gift 2", updated_gift.title
    end

    test "#update will update group gift when user is in group" do
      authenticated_user = sign_in_user(:user2)
      gift = gifts(:gift7)
      original_title = gift[:title]

      update_data = {
        title: "New Title",
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}", method: :patch, data: update_data)
      response_data = response[:data]

      updated_gift = Gift.find(gift.id)

      assert_response 200
      assert_equal "New Title", response_data[:title]
    end

    #
    # CLAIM
    #

    test "#claim will claim gift for current user if unclaimed" do
      authenticated_user = sign_in_user(:user1)
      gift = users(:user2).giftlist[0]

      update_data = {
        claimerId: authenticated_user[:id],
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}/claim", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 200
      assert_equal authenticated_user[:id], response_data[:claimer][:id]
    end

    test "#claim will unclaim gift for current user if claimed" do
      authenticated_user = sign_in_user(:user1)
      gift = gifts(:gift3)

      update_data = {
        claimerId: nil,
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}/claim", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 200
      assert_nil response_data[:claimer]
    end

    test "#claim returns unauthorized if already claimed by another user" do
      authenticated_user = sign_in_user(:user1)
      gift = gifts(:gift4)

      update_data = {
        claimerId: authenticated_user[:id],
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}/claim", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 401
    end

    test "#claim returns unauthorized if trying to claim for another user" do
      authenticated_user = sign_in_user(:user1)
      other_user = users(:user2)
      gift = gifts(:gift2)

      update_data = {
        claimerId: other_user[:id],
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}/claim", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 401
    end

    #
    # GOT
    #

    test "#got will mark gift as got if user has claimed it" do
      authenticated_user = sign_in_user(:user1)
      gift = gifts(:gift3)

      update_data = {
        claimerGot: true,
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}/got", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 200
    end

    test "#got will unmark gift as got if user has claimed it" do
      authenticated_user = sign_in_user(:user1)
      gift = gifts(:gift8)

      update_data = {
        claimerGot: false,
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}/got", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 200
    end

    test "#got will not mark gift as got if user hasn't claimed it" do
      authenticated_user = sign_in_user(:user1)
      gift = gifts(:gift2)

      update_data = {
        claimerGot: authenticated_user.id,
      }

      response = send_api_and_parse_response("/api/v1/gifts/#{gift.id}/got", method: :patch, data: update_data)
      response_data = response[:data]

      assert_response 401
    end

    private

    def create_new_gift(user)
      {
        askerId: user[:id],
        title: 'New Test Gift Title',
        description: 'New test gift description',
        priceHigh: 10,
        priceLow: 20,
      }
    end

    def create_new_group_gift(user, group)
      {
        askerId: user.id,
        groupOwnerId: group.id,
        title: 'New Test Group Gift Title',
        description: 'New test group gift description',
        priceHigh: 10,
        priceLow: 20,
      }
    end
  end
end