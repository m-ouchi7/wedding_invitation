Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get 'invitation-info', to: 'invitation_info#index'
      get 'guest-info', to: 'guest_info#index'
      # post 'guest-info', to: 'guest_info#upsert'
    end
  end

end
