let cols, rows, board, engine;

function mouseClicked(){
    if (mouseX < 0 || mouseX > width){
        return;
    }
    const clicked_col = board.ComputeColumn(mouseX);
    const move_res = engine.make_move(clicked_col);
    if(move_res.success){
        board.addPiece(move_res.player, move_res.row, move_res.col);
    }
}


function setup() {
	  createCanvas(1000, 1000);
    board = new Board(width, height, 7, 6);
    engine = new window.ConnectFourEngine();
}

function draw() {
    board.draw();
}
