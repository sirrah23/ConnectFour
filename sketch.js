let cols, rows, board, engine, winner;


function mouseClicked(){
    if (mouseX < 0 || mouseX > width){
        return;
    }
    const clicked_col = board.ComputeColumn(mouseX);
    const move_res = engine.make_move(clicked_col);
    if(move_res.success){
        board.addPiece(move_res.player, move_res.row, move_res.col);
        winner = engine.scan_winner();
    }
}

function setup() {
	  createCanvas(1000, 1000);
    board = new Board(width, height, 7, 6);
    engine = new window.ConnectFourEngine();
}

function gameOverCheck(){
    //Game over?
    //TODO: Fix this up
    //NOTE: 3/8 is a magic # :)
    push();
    fill(255);
    textSize(32);
    if(winner === 1){
        text('Player RED wins!', width * (3/8), height/2);
        noLoop();
    } else if (winner === 2){
        text('Player BLACK wins!', width * (3/8), height/2);
        noLoop();
    }
    pop();
}

function draw() {
    board.draw();
    gameOverCheck();
}
