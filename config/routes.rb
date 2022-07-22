Rails.application.routes.draw do
  resources :gifts
  devise_for :users
  get 'hello_world', to: 'hello_world#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root to: "hello_world#index"

  get 'users/:id/giftlist', to: 'pages#giftlist'
end
