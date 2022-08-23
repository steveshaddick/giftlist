Rails.application.routes.draw do
  resources :memberships
  resources :gift_groups
  resources :gifts

  devise_for :users, :controllers => {:registrations => "registrations"}

  root to: "pages#home"

  get '/signed_out', to: 'pages#signed_out'

  get 'users/:id/giftlist', to: 'pages#giftlist'
  get 'users/:id/profile(/:tab)', to: 'pages#user_profile'

  #api
  namespace :api do
    namespace :v1 do

      post 'gifts', to: 'gifts#create'
      patch 'gifts/:id/claim', to: 'gifts#claim'
      patch 'gifts/:id/got', to: 'gifts#got'
      patch 'gifts/:id', to: 'gifts#update'
      delete 'gifts/:id', to: 'gifts#delete'

      get 'users/:id/claimlist', to: 'users#claimlist'
      get 'users/:id/asklist', to: 'users#asklist'
      get 'users/:id/groups', to: 'users#groups'

    end
  end
end
