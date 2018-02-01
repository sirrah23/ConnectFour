function Piece(player, col, row){
    this.player = player;
    this.col = col;
    this.row = row;
};

function Board(width, height, numCols, numRows){
    this.width = width;
    this.height = height;
    this.numCols = numCols;
    this.numRows = numRows;
    this.cols = this.width/this.numCols;
    this.rows = this.height/this.numRows;
    this.pieces = [];
};

Board.prototype.draw = function(){
    background(0, 0, 205);
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 6; j++){
            this.drawPiece(i, j);
        }
    }

    let curr_piece;
    push();
    for(let p = 0; p < this.pieces.length; p++){
        curr_piece = this.pieces[p];
        if(curr_piece.player === 1){
            fill("red");
        } else {
            fill("black");
        }
        this.drawPiece(curr_piece.row, curr_piece.col);
    }
    pop();
};

Board.prototype.drawPiece = function(i, j){
    ellipse(this.cols*i + 75, this.rows*j + 75, 100, 100);
};

Board.prototype.addPiece = function(player, col, row){
    this.pieces.push(new Piece(player, col, row));
};

Board.prototype.ComputeColumn = function(x_pos){
    let j;
    for(j = 0; j < this.numCols; j++){
        if((j*this.cols) > x_pos){
            return j-1;
        }
    }
    return j-1;
}
