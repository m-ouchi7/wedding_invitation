class Api::V1::Admin::ApplicationController < ActionController::API
    before_action :authenticate_admin!

    def authenticate_admin!
        header = request.headers['Authorization']
        token = header.split(' ').last if header.present?
        decoded = JsonWebToken.decode(token)

        @current_admin = Admin.find(decoded[:admin_id]) if decoded

        render json: { error: 'ログインが必要です' }, status: :unauthorized unless @current_admin
    end
end