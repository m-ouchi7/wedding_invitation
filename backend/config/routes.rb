Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get 'invitation-info', to: 'invitation_info#index'
      get 'guest-info', to: 'guest_info#index'
      post 'guest-answer_create', to: 'guest_answer#create'
      post 'guest-answer_validate', to: 'guest_answer#validate'
    end
  end

end
