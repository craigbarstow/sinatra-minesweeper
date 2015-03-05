function cellClicked(cell_x_pos, cell_y_pos) {
  $.get('/mine_detector?x='+cell_x_pos+'&y='+cell_y_pos, function(data){
    console.log(data["num_mines"]);
    cell_id = "#x"+String(cell_x_pos)+"y"+String(cell_y_pos);
    if (data["num_mines"] == -1) {
      alert("you're fucking dead");
      $(cell_id).css("background-color", "red");
      $(cell_id).text("*");
    } else {
      console.log(cell_id);
      $(cell_id).css("background-color", "green");
      $(cell_id).text(data["num_mines"]);
    }
  });
}
