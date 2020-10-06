class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :delete]

  # GET /comments
  def index
    article_comments = ArticleComment.query(
      key_condition_expression: '#id = :id and begins_with(#sk, :sk)',
      expression_attribute_names: { '#id' => 'id', '#sk' => 'sk' },
      expression_attribute_values: { ':id' => params[:article_id], ':sk' => 'Comment' },
    )

    # まじか、、、N+1を手で書くことになるとは・・・
    @comments = article_comments.map { |e| Comment.find(e.attrs['sk']) }

    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    @comment = Comment.new

    if @comment.create(comment_params, params[:article_id])
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def delete
    @comment.destroy({ title: nil, body: nil })
    render json: {deleted: true}
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_comment
    @comment = Comment.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def comment_params
    params.require(:comment).permit(:body).to_h
  end
end
