Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, only: [:create]
  resources :notes do
    patch :trash
    patch :restore
    get :trashed, on: :collection
  end

  resources :scratchpads, only: [:index] do
    patch :save, on: :collection
  end
end
