class Api::V1::Admin::SessionsController < Api::V1::Admin::ApplicationController
  skip_before_action :authenticate_admin!, only: [:create]

  def create
    admin = Admin.find_by(email: params[:email])

    if admin&.authenticate(params[:password])
      token = JsonWebToken.encode({admin_id: admin.id})
      
      render json: {
        token: token,
        admin: { id: admin.id, email: admin.email }
      }, status: :ok
    else
      render json: { error: 'メールアドレスまたはパスワードが正しくありません' }, status: :unauthorized
    end
  end
end