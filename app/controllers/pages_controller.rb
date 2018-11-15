# frozen_string_literal: true

# SPA Controller responsible to respond with base pages
class PagesController < ActionController::Base
  def index
    render 'public/packs/index.html'
  end
end
