module Api
  module V1
    class GuestInfoListController < ApplicationController
      def index
        # 今後イベントIDなどで絞り込む可能性あり
        guests = Guest.includes(:guest_personal_info, :guest_answer).all
        response.headers['X-Total-Count'] = guests.count.to_s

        if guests.empty?
          render json: [], status: :ok
          return
        end

        guest_info_list = guests.map do |guest|
          guest_personal_info = guest.guest_personal_info
          guest_answer = guest.guest_answer

          {
            email: guest_personal_info.email,
            first_name: guest.first_name,
            middle_name: guest.middle_name,
            last_name: guest.last_name,
            guest_side: guest.guest_side,
            postal_code: guest_personal_info.postal_code,
            prefecture_code: guest_personal_info.prefecture_code,
            city_code: guest_personal_info.city_code,
            town: guest_personal_info.town,
            building: guest_personal_info.building,
            attendance: guest_answer.attendance,
            allergy: guest_answer.allergy,
            message: guest_answer.message
          }
        end

        render json: guest_info_list, status: :ok
      end
    end
  end
end