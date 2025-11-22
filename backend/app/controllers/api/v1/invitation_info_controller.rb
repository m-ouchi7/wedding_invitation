module Api
  module V1
    class InvitationInfoController < ApplicationController
      def index
        render json: {
          venue_name: '会場名',
          open_time: '10:00',
          start_time: '10:30',
          bride_name: '花子',
          groom_name: '一郎',
          message: '謹啓　仲秋の候

皆さまいかがお過ごしでしょうか
このたび　私たちは結婚式を挙げることになりました
つきましては　ご挨拶をかねて
ささやかなパーティーを催したいと思います
ご多用中　誠に恐縮ではございますが
ぜひご出席いただきたくご案内申し上げます

謹白
令和●●年●月吉日'
        }, status: :ok
      end
    end
  end
end
