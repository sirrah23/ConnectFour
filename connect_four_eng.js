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
    let potential_winner;

    potential_winner = this.scan_winner_col();
    if(potential_winner !== -1){
        return potential_winner;
    }

    potential_winner = this.scan_winner_row();
    if(potential_winner !== -1){
        return potential_winner;
    }

    potential_winner = this.scan_winner_diag_left();
    if(potential_winner !== -1){
        return potential_winner;
    }

    potential_winner = this.scan_winner_diag_right();
    if(potential_winner !== -1){
        return potential_winner;
    }
    return -1;
};


ConnectFour.prototype.scan_in_dir = function(start_x, start_y, step_x, step_y, mode){
    if (!["ACROSS", "DOWN"].includes(mode))
        throw "Bad input mode";

    const pos = (function(){
        let _col_pos = start_y;
        let _row_pos = start_x;

        return {
            col_pos(){
                return _col_pos;
            },
            row_pos(){
                return _row_pos;
            },
            dir(mode){
                return mode === "ACROSS" ? _col_pos : _row_pos;
            },

            inc_mode_pos(mode){
                mode === "ACROSS" ? _col_pos++ : _row_pos++;
            }
        };
    })();
    const limit = mode === "ACROSS" ? this.cols : this.rows;
    let potential_winner, stream_size, step;

    for(; pos.dir(mode) < limit; pos.inc_mode_pos(mode)){
        potential_winner = null;
        stream_size = null;
        step = 0;
        while(true){
            let stepped_col = pos.col_pos() + (step_y * step);
            let stepped_row = pos.row_pos() + (step_x * step);
            if (
                (stepped_col < 0) ||
                (stepped_col > this.cols) ||
                (stepped_row < 0) ||
                (stepped_row > this.rows)
               ){
                break;
            }
            if (this.board[stepped_col][stepped_row] === 0){
                potential_winner = null;
                stream_size = null;
            } else if (this.board[stepped_col][stepped_row] === potential_winner){
                stream_size++;
            } else {
                potential_winner = this.board[stepped_col][stepped_row];
                stream_size = 1;
            }

            if(stream_size === 4){
                return potential_winner;
            }

            step++;
        }
    }
    return -1;
};


ConnectFour.prototype.scan_winner_col = function(){
    return this.scan_in_dir(0, 0, 1, 0, "ACROSS");
};


ConnectFour.prototype.scan_winner_row = function(){
    let potential_winner, stream_size;
    for(let i = 0; i < this.rows; i++){
        potential_winner = null;
        stream_size = null;
        for(let j = 0; j < this.cols; j++){
            if (this.board[j][i] === 0){
                potential_winner = null;
                stream_size = null;
            } else if(this.board[j][i] === potential_winner){
                stream_size++;
            } else {
                potential_winner = this.board[j][i];
                stream_size = 1;
            }

            if(stream_size === 4){
                return potential_winner;
            }
        }
    }
    return -1;
};


ConnectFour.prototype.scan_winner_diag_left = function(){
    let potential_winner, stream_size, step;
    let row_pos, col_pos;

    //Scan by walking down first column
    row_pos = 0, col_pos = 0;
    for(; row_pos < this.rows; row_pos++){
        potential_winner = null;
        stream_size = null;
        step = 0;
        while(true){
            if ((row_pos + step > this.rows) || (col_pos + step > this.cols)){
                break;
            }
            if (this.board[row_pos + step][col_pos + step] === 0){
                potential_winner = null;
                stream_size = null;
            } else if (this.board[row_pos + step][col_pos + step] === potential_winner){
                stream_size++;
            } else {
                potential_winner = this.board[row_pos + step][col_pos + step];
                stream_size = 1;
            }

            if(stream_size === 4){
                return potential_winner;
            }

            step++;
        }
    }

    //Scan by walking across first row
    row_pos = 0, col_pos = 0;
    for(; col_pos < this.cols; col_pos++){
        potential_winner = null;
        stream_size = null;
        step = 0;
        while(true){
            if ((row_pos + step > this.rows) || (col_pos + step > this.cols)){
                break;
            }
            if (this.board[row_pos + step][col_pos + step] === 0){
                potential_winner = null;
                stream_size = null;
            } else if (this.board[row_pos + step][col_pos + step] === potential_winner){
                stream_size++;
            } else {
                potential_winner = this.board[row_pos + step][col_pos + step];
                stream_size = 1;
            }

            if(stream_size === 4){
                return potential_winner;
            }

            step++;
        }
    }

    return -1;
};

ConnectFour.prototype.scan_winner_diag_right = function(){
    let potential_winner, stream_size, step;
    let row_pos, col_pos;

    //Scan by walking down last column
    row_pos = 0, col_pos = this.cols-1;
    for(; row_pos < this.rows; row_pos++){
        potential_winner = null;
        stream_size = null;
        step = 0;
        while(true){
            if ((row_pos + step > this.rows) || (col_pos - step < 0)){
                break;
            }
            if (this.board[row_pos + step][col_pos - step] === 0){
                potential_winner = null;
                stream_size = null;
            } else if (this.board[row_pos + step][col_pos - step] === potential_winner){
                stream_size++;
            } else {
                potential_winner = this.board[row_pos + step][col_pos - step];
                stream_size = 1;
            }

            if(stream_size === 4){
                return potential_winner;
            }

            step++;
        }
    }

    //Scan by walking across first row backwards
    row_pos = 0, col_pos = this.cols-1;
    for(; col_pos >= 0; col_pos--){
        potential_winner = null;
        stream_size = null;
        step = 0;
        while(true){
            if ((row_pos + step > this.rows) || (col_pos - step < 0)){
                break;
            }
            if (this.board[row_pos + step][col_pos - step] === 0){
                potential_winner = null;
                stream_size = null;
            } else if (this.board[row_pos + step][col_pos - step] === potential_winner){
                stream_size++;
            } else {
                potential_winner = this.board[row_pos + step][col_pos - step];
                stream_size = 1;
            }

            if(stream_size === 4){
                return potential_winner;
            }

            step++;
        }
    }

    return -1;
};


module.exports = ConnectFour;
