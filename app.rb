require 'sinatra'
require 'sinatra/reloader'
require './minesweeper.rb'
require 'json'
require 'pry'

configure :development, :test do
  require 'pry'
end

Dir[File.join(File.dirname(__FILE__), 'lib', '**', '*.rb')].each do |file|
  require file
  also_reload file
end

board_width = 8
num_mines = 10

ms = MineSweeper.new(board_width, num_mines)

get '/' do
  erb :index, locals: { board_width: board_width }
end

get '/mine_detector' do
  coord_choice = { x: params[:x].to_i, y: params[:y].to_i }
  hit_mine = ms.check_for_mine(coord_choice)
  content_type :json
  hit_mine.to_json
end
