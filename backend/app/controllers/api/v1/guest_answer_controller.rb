module Api
  module V1
    class GuestAnswerController < ApplicationController
      rescue_from StandardError, with: :handle_500

      def create
        form = GuestSubmissionForm.new(guest_params)

        if form.submit
          render json: {}, status: :created # 200

        else
          render json: {
            error: form.errors.full_messages
          }, status: :unprocessable_entity # 422
        end
      end

      private

      def guest_params
        params.permit(
          :first_name,
          :middle_name,
          :last_name,
          :guest_side,
          :email,
          :postal_code,
          :prefecture_code,
          :city_code,
          :town,
          :building,
          :attendance,
          :allergy,
          :message
        )
      end

      def handle_500(exception)
        render json: {
          "message": "エラーが発生しました。しばらくしてから再度お試しください。",
          error: exception.message
        }, status: :internal_server_error # 500
      end
    end
  end
end
