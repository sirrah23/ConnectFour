const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

/**
* Constructor for the game engine
*/
function ConnectFour(){
    this.cols = 7;
    this.rows = 6;
    this.board = new Array(this.cols);
    for(let i = 0; i < this.cols; i++){
        this.board[i] = new Array(this.rows);
    }
    for(let i = 0; i < this.cols; i++){
        for(let j = 0; j < this.rows; j++){
            this.board[i][j] = 0;
        }
    }
    this.curr_player = PLAYER_ONE;
}


/**
* Drop the current player's piece into the column
*/
ConnectFour.prototype.drop_piece = function(col){
    const empty_row = this.find_empty_row(col);
    if(empty_row === -1){
        return false;
    }
    this.board[col][this.find_empty_row(col)] = this.curr_player;
    return true;
};


/**
* Find's the first non-empty row in a column directly above a piece or at
* the bottom.
*/
ConnectFour.prototype.find_empty_row = function(col){
    if(this.board[col][0] !== 0){
        return -1;
    }
    for(let i = this.rows-1; i >= 0; i--){
        if(this.board[col][i] === 0){
            return i;
        }
    }
};


/**
* Print the Connect Four board to the screen.
*/
ConnectFour.prototype.toString = function(){
    let board_str = '';
    let curr_row = '';
    for(let row=0; row < this.rows; row++){
        for(let col = 0; col < this.cols; col++){
            curr_row = curr_row +  this.board[col][row] + ' ';
        }
        curr_row += '\n';
        board_str += curr_row;
        curr_row = '';
    }
    return board_str;
};


/**
* Toggle the current player
*/
ConnectFour.prototype.switch_player = function(){
    if(this.curr_player === PLAYER_ONE){
        this.curr_player = PLAYER_TWO;
    } else {
        this.curr_player = PLAYER_ONE;
    }
};


/**
* Official game move - drop a piece and then make it the next player's turn.
*/
ConnectFour.prototype.make_move = function(col){
    this.drop_piece(col);
    this.switch_player();
};


/**
* Scan the board to see if anyone has won yet.
*/
ConnectFour.prototype.scan_winner = function(){
    //TODO
}


/*
const c4 = new ConnectFour();
c4.make_move(1);
c4.make_move(2);
c4.make_move(1);
c4.make_move(2);
console.log(c4.toString());
*/
