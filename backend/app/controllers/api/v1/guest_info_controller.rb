module Api
  module V1
    class GuestInfoController < ApplicationController
      def index
        guest_email = params[:email]
        guest = nil

        if guest_email.present?
          guest = Guest
                    .includes(:guest_personal_info, :guest_answer)
                    .find_by(guest_personal_infos: {email: guest_email})

          if guest
            guest_personal_info = guest.guest_personal_info
            guest_answer = guest.guest_answer

            render json: {
              email: guest_personal_info.email,
              first_name: guest.first_name,
              middle_name: guest.middle_name,
              last_name: guest.last_name,
              guest_side: guest.guest_side,
              phone: guest_personal_info.phone,
              postal_code: guest_personal_info.postal_code,
              prefecture_code: guest_personal_info.prefecture_code,
              city_code: guest_personal_info.city_code,
              town: guest_personal_info.town,
              building: guest_personal_info.building,
              attendance: guest_answer.attendance,
              allergy: guest_answer.allergy,
              message: guest_answer.message
            }, status: :ok

          else
            render json: {
              error: "guest is not found by #{guest_email}"
            }, status: :not_found
          end
          
        else
          render json: {
              error: "no email in params"
            }, status: :not_found
        end
      end
    end
  end
end
