var boardSize
var checkedCoords = []
//0 for left, 1 for right
var lastClick = 0

$( document ).ready(function(){
  $.get('/board_width', function(data){
    boardSize = data['width'];
  });
});

/*
function setClickType(event) {
  alert("table clicked");
}
*/

function cellClicked(cell_x_pos, cell_y_pos) {
  alert("check triggered");
  if (cell_x_pos < 0 || cell_x_pos > boardSize - 1 || cell_y_pos < 0 || cell_y_pos > boardSize -1) {
    return;
  } else if (checkedCoords.indexOf(String(cell_x_pos)+"|"+String(cell_y_pos)) > -1) {
    return;
  } else {
    $.get('/mine_detector?x='+cell_x_pos+'&y='+cell_y_pos, function(data){
      cell_id = "#x"+String(cell_x_pos)+"y"+String(cell_y_pos);
      if (data["num_mines"] == 0) {
        //set given tile to green
        $(cell_id).css("background-color", "white");
        //add coordinates to checkedCoords array
        checkedCoords.push(String(cell_x_pos)+"|"+String(cell_y_pos));
        //call on every cell around, if within board boundaries
        cellClicked(cell_x_pos-1, cell_y_pos);
        cellClicked(cell_x_pos+1, cell_y_pos);
        cellClicked(cell_x_pos, cell_y_pos-1);
        cellClicked(cell_x_pos, cell_y_pos+1);
      } else if (data["num_mines"] == -1) {
        alert("Wrong choice. Game Over.");
        $(cell_id).css("background-color", "red");
        $(cell_id).text("*");
      } else {
        $(cell_id).css("background-color", "green");
        $(cell_id).text(data["num_mines"]);
      }
    });



  }


  /*
  console.log(checkedCoords);
  if ((0 <= cell_x_pos < boardSize) && (0 <= cell_y_pos < boardSize)) {
    if ($.inArray([cell_x_pos, cell_y_pos], checkedCoords) == -1) {
      $.get('/mine_detector?x='+cell_x_pos+'&y='+cell_y_pos, function(data){
        cell_id = "#x"+String(cell_x_pos)+"y"+String(cell_y_pos);
        if (data["num_mines"] == 0) {
          //set given tile to green
          $(cell_id).css("background-color", "white");
          //add coordinates to checkedCoords array
          checkedCoords.push([cell_x_pos, cell_y_pos]);
          //call on every cell around, if within board boundaries
          cellClicked(cell_x_pos-1, cell_y_pos);
          cellClicked(cell_x_pos+1, cell_y_pos);
          cellClicked(cell_x_pos, cell_y_pos-1);
          cellClicked(cell_x_pos, cell_y_pos+1);
        } else if (data["num_mines"] == -1) {
          alert("Wrong choice. Game Over.");
          $(cell_id).css("background-color", "red");
          $(cell_id).text("*");
        } else {
          $(cell_id).css("background-color", "green");
          $(cell_id).text(data["num_mines"]);
        }
      });
    }
    return;
  }
  return;
  */
}

/*
general plan
  check to see if cell clicked










*/
