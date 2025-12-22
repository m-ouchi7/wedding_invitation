Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get 'invitation-info', to: 'invitation_info#index'
      get 'guest-info', to: 'guest_info#index'

      resources :guest_answer, only: [:create], path: 'guest-answer' do
        collection do
          post :validate
        end
      end
    end
  end

end
