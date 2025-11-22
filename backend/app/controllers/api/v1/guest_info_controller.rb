module Api
  module V1
    class GuestInfoController < ApplicationController
      def index
        render json: {
          email: 'test@gmail.com',
          first_name: '名前',
          middle_name: 'ミドルネーム',
          last_name: '苗字',
          guest_side: '1',
          phone: '080-1234-5678',
          postal_code: '000-0000',
          prefecture_code: '00',
          city_code: '00000',
          town: '町名',
          building: '建物名',
          attendance: '1',
          allergy: 'アレルギー内容',
          message: '結婚おめでとう'
        }, status: :ok

        # # パラメーターから email の値を取得
        # guest_email = params[:email]

        # if guest_email.present?
        #   # 取得した email を使って、データベースからゲストを検索
        #   @guest = Guest.find_by(email: guest_email)

        #   if @guest
        #     # ゲストが存在すれば、その情報をJSONで返す
        #     guest_data =  @guest.as_json(except: [:id, :created_at, :updated_at])
        #   else
        #     guest_data = nil
        #   end

        # else
        #   guest_data = nil
        # end

        # render json: {
        #   status: 'ok',
        #   guest: guest_data,
        #   timestamp: Time.current
        # }, status: :ok

      end
    end
  end
end
