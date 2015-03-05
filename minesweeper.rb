class MineSweeper
  def initialize(board_width, num_mines)
    @mine_locations = get_mine_locations(board_width, num_mines)
  end

  def check_for_mine(chosen_coord)
    if @mine_locations.include?(chosen_coord)
      #-1
      { num_mines: -1 }
    else
      { num_mines: get_number_of_surrounding_mines(chosen_coord) }
    end
  end

  def get_number_of_surrounding_mines(chosen_coord)
    num_mines = 0
    (-1..1).each do |x|
      (-1..1).each do |y|
        unless x == 0 and y == 0
          if @mine_locations.include?({ x: chosen_coord[:x] + x, y: chosen_coord[:y] + y })
            num_mines += 1
          end
        end
      end
    end
    num_mines
  end

  private

  def get_mine_locations(width, num_mines)
    mine_coord_array = []
    while mine_coord_array.length < num_mines
      new_coord = {x: rand(0...width), y: rand(0...width)}
      unless mine_coord_array.include?(new_coord)
        mine_coord_array.push(new_coord)
      end
    end
    mine_coord_array
  end
end
