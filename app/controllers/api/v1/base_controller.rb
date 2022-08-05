class Api::V1::BaseController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  def ensure_current_user
    unless user_signed_in? && current_user[:id] == params[:id].to_i
      return_unauthenticated
    end
  end

  def return_unauthenticated
    render api_response(status: 401, message: "Unauthorized")
  end

  def return_data(data)
    render api_response(status: 200, data: data)
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
