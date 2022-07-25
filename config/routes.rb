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

  #api
  namespace :api do
    namespace :v1 do

      patch 'gifts/:id', to: 'gifts#update'

    end
  end
end
