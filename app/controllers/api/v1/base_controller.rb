module Api::V1
  class BaseController < ApplicationController
    def authorize
      unless current_user
        render json: { error: 'Unauthorized'}, status: 401
      end
    end
  end
end
