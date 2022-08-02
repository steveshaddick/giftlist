class RegistrationsController < Devise::RegistrationsController
  def create
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :referring_email])
    
    super
  end
end
