module Api
  module V1
    class GuestAnswerController < ApplicationController
      rescue_from StandardError, with: :handle_500

      class ValidationError < StandardError
        attr_reader :errors
        def initialize(errors)
          @errors = errors
          super("Validation failed")
        end
      end

      def create
        guest = Guest.new(
          first_name: params[:first_name],
          middle_name: params[:middle_name],
          last_name: params[:last_name],
          guest_side: params[:guest_side],
        )

        if guest.invalid?
          render json: { error: guest.errors.to_hash }, status: :unprocessable_entity
          return 
        end
  
        # 保存
        ActiveRecord::Base.transaction do
          guest.save! # guest_idが確定

          guest_personal_info = GuestPersonalInfo.new(
            guest_id: guest.id, # 確定したguest_idを入力
            email: params[:email],
            postal_code: params[:postal_code],
            prefecture_code: params[:prefecture_code],
            city_code: params[:city_code],
            town: params[:town],
            building: params[:building],
          )

          guest_answer = GuestAnswer.new(
            guest_id: guest.id, # 確定したguest_idを入力
            attendance: params[:attendance],
            allergy: params[:allergy],
            message: params[:message],
          )
          
          # バリデーション
          errors_messages = {}
          errors_messages.merge!(guest_personal_info.errors.to_hash) unless guest_personal_info.valid?
          errors_messages.merge!(guest_answer.errors.to_hash) unless guest_answer.valid?

          if errors_messages.any?
            # rollbackさせると同時に例外で外に出す
            raise ValidationError.new(errors_messages)
          end

          guest_personal_info.save!
          guest_answer.save!
        end
        
        render json: {}, status: :created # 200

      rescue ValidationError => e
        render json: { error: e.errors }, status: :unprocessable_entity
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
