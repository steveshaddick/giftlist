Rails.application.routes.draw do
  resources :memberships
  resources :gift_groups
  resources :gifts
  devise_for :users
  get 'hello_world', to: 'hello_world#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root to: "pages#home"

  get 'users/:id/giftlist', to: 'pages#giftlist'
  get 'users/:id/profile(/:tab)', to: 'pages#user_profile'

  #api
  namespace :api do
    namespace :v1 do

      post 'gifts', to: 'gifts#create'
      patch 'gifts/:id', to: 'gifts#update'
      delete 'gifts/:id', to: 'gifts#delete'

      get 'users/:id/claimlist', to: 'users#claimlist'
      get 'users/:id/asklist', to: 'users#asklist'
      get 'users/:id/groups', to: 'users#groups'

    end
  end
end
