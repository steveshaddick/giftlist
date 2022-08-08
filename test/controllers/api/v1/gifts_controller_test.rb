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
  end
end