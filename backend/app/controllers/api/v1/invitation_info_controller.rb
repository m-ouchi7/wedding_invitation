module Api
  module V1
    class InvitationInfoController < ApplicationController
      def index
        invitation_info = InvitationInfo.last

        if !invitation_info.present?
          render json: {error: "Invitation info not found"}, status: :not_found
          return
        end
          
        render json: {
          venue_name: invitation_info.venue_name,
          postal_code: invitation_info.postal_code,
          address: invitation_info.address,
          open_time: invitation_info.open_time,
          start_time: invitation_info.start_time,
          bride_name: invitation_info.bride_name,
          groom_name: invitation_info.groom_name,
          message: invitation_info.message
        }, status: :ok

      end
    end
  end
end
