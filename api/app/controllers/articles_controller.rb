class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :update, :delete]

  # GET /articles
  def index
    @articles = Article.query(
      index_name: 'sk-id-index',
      key_condition_expression: '#sk = :sk and begins_with(#id, :id)',
      expression_attribute_names: { '#sk' => 'sk', '#id' => 'id' },
      expression_attribute_values: { ':sk' => 'v_0', ':id' => 'Article' },
    )

    render json: @articles
  end

  # GET /articles/1
  def show
    render json: @article
  end

  # POST /articles
  def create
    @article = Article.new

    if @article.create(article_params)
      render json: @article, status: :created
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /articles/1
  def update
    if @article.update(article_params)
      render json: @article
    else
      render json: @article.errors, status: :unprocessable_entity
    end
  end

  # DELETE /articles/1
  def delete
    @article.destroy({ title: nil, body: nil })
    render json: {deleted: true}
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_article
    @article = Article.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def article_params
    params.require(:article).permit(:title, :body).to_h
  end
end
