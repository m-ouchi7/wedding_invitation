module Api
  module V1
    class GuestAnswerController < ApplicationController
      rescue_from StandardError, with: :handle_500
      rescue_from ActiveRecord::RecordInvalid, with: :handle_422

      def create
        ActiveRecord::Base.transaction do
          guest = Guest.create!(
            first_name: params[:first_name],
            middle_name: params[:middle_name],
            last_name: params[:last_name],
            guest_side: params[:guest_side],
          )

          GuestPersonalInfo.create!(
            guest_id: guest.id,
            email: params[:email],
            postal_code: params[:postal_code],
            prefecture_code: params[:prefecture_code],
            city_code: params[:city_code],
            town: params[:town],
            building: params[:building],
          )

          GuestAnswer.create!(
            guest_id: guest.id,
            attendance: params[:attendance],
            allergy: params[:allergy],
            message: params[:message],
          )

          render json: {}, status: :created # 200
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

      # バリデーションエラー時 422
      def handle_422(exception)
        render json: {
          "message": exception.record.errors.full_messages
        }, status: :unprocessable_entity
      end

      # その他のエラー 500
      def handle_500(exception)
        render json: {
          "message": "エラーが発生しました。しばらくしてから再度お試しください。",
          error: exception.message
        }, status: :internal_server_error
      end
    end
  end
end
