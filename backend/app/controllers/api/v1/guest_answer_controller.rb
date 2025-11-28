module Api
  module V1
    class GuestAnswerController < ApplicationController
      rescue_from StandardError, with: :handle_500

      def create
        guest = Guest.new(
          first_name: params[:first_name],
          middle_name: params[:middle_name],
          last_name: params[:last_name],
          guest_side: params[:guest_side],
        )

        # # 各モデルの検証
        # errors = {}
        # errors[:guest] = guest.errors.full_messages unless guest.valid?
        # errors[:guest_personal_info] = guest_personal_info.errors.full_messages unless guest_personal_info.valid?
        # errors[:guest_answer] = guest_answer.errors.full_messages unless guest_answer.valid?

        # 先にguestモデルのみ検証 422
        if guest.invalid?
          render json: { message: guest.errors.full_messages }, status: :unprocessable_entity
          return
        end
  
        # トランザクションで保存
        ActiveRecord::Base.transaction do
          guest.save!

          guest_personal_info = GuestPersonalInfo.new(
            guest_id: guest.id,
            email: params[:email],
            postal_code: params[:postal_code],
            prefecture_code: params[:prefecture_code],
            city_code: params[:city_code],
            town: params[:town],
            building: params[:building],
          )

          guest_answer = GuestAnswer.new(
            guest_id: guest.id,
            attendance: params[:attendance],
            allergy: params[:allergy],
            message: params[:message],
          )
          
          # 残り２つのモデルの検証
          errors = {}
          # errors[:guest] = guest.errors.full_messages unless guest.valid?
          errors[:guest_personal_info] = guest_personal_info.errors.full_messages unless guest_personal_info.valid?
          errors[:guest_answer] = guest_answer.errors.full_messages unless guest_answer.valid?
    
          # バリデーションエラー時 422
          if errors.any?
            render json: { message: errors }, status: :unprocessable_entity
            return
          end
          # guest_personal_info.guest_id = guest.id
          guest_personal_info.save!
          # guest_answer.guest_id = guest.id
          guest_answer.save!
        end
        
        render json: {
          "message": "#{guest.first_name}さんの情報が格納されました。"
        }, status: :created # 200
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
