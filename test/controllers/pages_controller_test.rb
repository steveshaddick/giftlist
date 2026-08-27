require 'test_helper'

class PagesControllerTest < ActionDispatch::IntegrationTest
  test 'redirects to sign in when not authenticated' do
    get '/account'

    assert_redirected_to new_user_session_path
  end

  test 'returns success when signed in' do
    user = sign_in_user(:user1)

    get '/account'

    assert_response :success
  end

  test 'includes user name in response' do
    user = sign_in_user(:user1)

    get '/account'

    assert_match user.name, response.body
  end

  test 'includes user email in response' do
    user = sign_in_user(:user1)

    get '/account'

    assert_match user.email, response.body
  end
end
