module Api::V1
  class PaletteLikesController < Api::V1::BaseController
    before_filter :authorize

    def index
      render json: palette_likes
    end

    def create
      current_user.palette_likes.create!(palette_like_params)
      render json: palette_likes
    end

    def destroy
      current_user.palette_likes.find(params[:id]).destroy
      render json: palette_likes
    end

    private
    def palette_like_params
      params.require(:palette_like).permit(
        :palette_id
      )
    end

    def palette_likes
      ActiveModel::ArraySerializer.new(current_user.palette_likes, each_serializer: PaletteLikeSerializer, root: 'palette_likes')
    end
  end
end
