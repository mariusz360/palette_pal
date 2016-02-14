class PagesController < ApplicationController
  def index
    @hex = params[:hex]
    @likable = current_user.present?
    @search_path = root_path
  end
end

