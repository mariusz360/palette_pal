Rails.application.routes.draw do
  root 'pages#index'

  get 'login'  => 'sessions#new'
  resources :sessions, only: [:create]

  get 'signup' => 'users#new'
  resources :users, only: [:create]

  get 'logout' => 'sessions#destroy'

  resources :palette_likes, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :palette_likes, only: [:index, :create, :destroy]
    end
  end

end
