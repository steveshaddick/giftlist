ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  include Devise::Test::IntegrationHelpers

  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...

  Api::V1::BaseController.allow_forgery_protection = false

  def sign_in_user(user_sym)
    user = users(user_sym)

    sign_in user
    user
  end

  def send_api_and_parse_response(path, method: :get, data: nil)
    if data.nil?
      send method, path
    else
      send method, path, params: data, as: :json
    end

    JSON.parse(response.body, { symbolize_names: true })
  end
end
