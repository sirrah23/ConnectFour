let cols, rows, board;

function setup() {
	  createCanvas(1000, 1000);
    board = new Board(width, height, 7, 6);
}

function draw() {
    board.draw();
}
