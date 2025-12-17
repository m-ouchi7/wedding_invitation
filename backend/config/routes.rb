Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get 'invitation-info', to: 'invitation_info#index'
      get 'guest-info', to: 'guest_info#index'
      get 'guest-info-list', to: 'guest_info_list#index'
      post 'guest-answer', to: 'guest_answer#create'
    end
  end

end
