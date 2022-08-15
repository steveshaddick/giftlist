class Api::V1::BaseController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  class NotAuthorized < StandardError; end
  class BadRequest < StandardError; end

  protect_from_forgery with: :exception

  rescue_from NotAuthorized, with: :return_unauthorized
  rescue_from BadRequest, with: :return_bad_request

  def ensure_current_user
    unless user_signed_in? && current_user[:id] == params[:id].to_i
      return_unauthorized
    end
  end

  def ensure_authenticated_user
    unless user_signed_in?
      return_unauthorized
    end
  end

  def return_unauthorized
    render api_response(status: 401, message: "Unauthorized")
  end

  def return_bad_request(message = "Bad request")
    render api_response(status: 400, message: message)
  end

  def return_data(data)
    render api_response(status: 200, data: data)
  end

  def return_not_found
    render api_response(status: 404)
  end
  
  def api_response(data: nil, status: 204, message: nil)
    success = status < 400

    {
      json: {
        success: success,
        data: data,
        message: message,
      },
      status: status,
    }
  end
end
