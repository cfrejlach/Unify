class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?
  

  private

  $admin  = ["admin@unify.com","ryanmcduffie07@gmail.com", "floris.vandervis@hotmail.com", "ludotrico@gmail.com"]
  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end 

  def require_logged_in
    unless current_user
      render json: { base: ['Invalid credentials'] }, status: 401
    end
  end
end
