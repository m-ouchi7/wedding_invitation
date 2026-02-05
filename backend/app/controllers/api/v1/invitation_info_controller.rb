module Api
  module V1
    class InvitationInfoController < ApplicationController
      def show
        invitation_info = InvitationInfo.find_by(id: params[:id])

        if !invitation_info.present?
          render json: {error: "INVITATION INFO NOT FOUND"}, status: :not_found
          return
        end
          
        render json: invitation_info.as_json(
          only: [
            :venue_name,
            :postal_code,
            :address,
            :open_time,
            :start_time,
            :bride_name,
            :groom_name,
            :message
          ]
        ), status: :ok
      end
    end
  end
end
