module Api
  module V1
    class InvitationInfoController < ApplicationController
      def index
        invitation_infos = InvitationInfo.find(1)

        if invitation_infos
          render json: {
            venue_name: invitation_infos.venue_name,
            postal_code: invitation_infos.postal_code,
            address: invitation_infos.address,
            open_time: invitation_infos.open_time,
            start_time: invitation_infos.start_time,
            bride_name: invitation_infos.bride_name,
            groom_name: invitation_infos.groom_name,
            message: invitation_infos.message
          }, status: :ok

        else
          render json: {}, status: :not_found

        end
      end
    end
  end
end
