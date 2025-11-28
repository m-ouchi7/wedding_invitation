# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
<<<<<<< HEAD
    origins ENV["VITE_FRONT_URL"] #フロントのURLだけ許可
=======
    origins ENV["VITE_FRONT_URL"]
>>>>>>> d9e27b9 (fix&refacter: remove json files, delete phone column, use environment variable)
    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
