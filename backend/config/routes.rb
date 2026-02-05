Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get 'invitation-info/:id', to: 'invitation_info#show'
      get 'guest-info', to: 'guest_info#index'
      get 'guest-info-list', to: 'guest_info_list#index'
      resources :guest_answer, only: [:create], path: 'guest-answer' do
        collection do
          post :validate
        end
      end
      namespace :admin do
        post 'login', to: 'sessions#create'
      end
    end
  end

end
