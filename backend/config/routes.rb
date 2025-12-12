Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get 'invitation_info', to: 'invitation_info#index'
      get 'guest_info', to: 'guest_info#index'

      resources :guest_answer, only: [:create] do
        collection do
          post :validate
        end
      end
    end
  end

end
