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
    this.winner = null;
}


/**
* Drop the current player's piece into the column
*/

ConnectFour.prototype.drop_piece = function(col){
    const empty_row = this.find_empty_row(col);
    if(empty_row === -1){
        return {success: false};
    }
    this.board[col][empty_row] = this.curr_player;
    return {success: true, row: empty_row, col: col};
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
    const drop_res = this.drop_piece(col);
    const move_player = this.curr_player;
    if (drop_res.success === true){
        this.switch_player();
    }
    return Object.assign({}, drop_res, {player: move_player});
};


/**
* Scan the board to see if anyone has won yet.
*/
ConnectFour.prototype.scan_winner = function(){
    if(this.winner)
        return this.winner;

    let potential_winner;

    potential_winner = this.scan_winner_col();
    if(potential_winner !== -1){
        this.winner = potential_winner;
        return potential_winner;
    }

    potential_winner = this.scan_winner_row();
    if(potential_winner !== -1){
        this.winner = potential_winner;
        return potential_winner;
    }

    potential_winner = this.scan_winner_diag_left();
    if(potential_winner !== -1){
        this.winner = potential_winner;
        return potential_winner;
    }

    potential_winner = this.scan_winner_diag_right();
    if(potential_winner !== -1){
        this.winner = potential_winner;
        return potential_winner;
    }
    return -1;
};


/**
 *
 * @param {int} start_x
 * @param {int} start_y
 * @param {int} step_x
 * @param {int} step_y
 * @param {string} mode
 * Starting from given point on the board scans in an specified direction
 * to determine if any player has won the game yet.
 */
ConnectFour.prototype.scan_in_dir = function(start_x, start_y, step_x, step_y, mode){
    if (!["ACROSS", "DOWN", "BACKROSS"].includes(mode))
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
                if(mode === "ACROSS" || mode === "BACKROSS"){
                    return _col_pos;
                } else if (mode === "DOWN"){
                    return _row_pos;
                }
            },
            inc_mode_pos(mode){
                if(mode === "ACROSS"){
                    _col_pos++;
                }
                else if (mode === "DOWN"){
                    _row_pos++;
                }
                else{
                    _col_pos--;
                }
            },
            comp_mode_pos(limit){
                if(mode === "ACROSS"){
                    return _col_pos < limit;
                } else if (mode === "DOWN"){
                    return _row_pos < limit;
                } else {
                    return _col_pos > 0;
                }
            }
        };
    })();

    // TODO: Move limit into pos object
    const limit = (mode === "ACROSS" || mode === "BACKROSS") ? this.cols : this.rows;
    let potential_winner, stream_size, step;

    for(; pos.comp_mode_pos(limit); pos.inc_mode_pos(mode)){
        potential_winner = null;
        stream_size = null;
        step = 0;
        while(true){
            let stepped_col = pos.col_pos() + (step_y * step);
            let stepped_row = pos.row_pos() + (step_x * step);
            if (
                (stepped_col < 0) ||
                (stepped_col >= this.cols) ||
                (stepped_row < 0) ||
                (stepped_row >= this.rows)
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
    return this.scan_in_dir(0, 0, 0, 1, "DOWN");
};


ConnectFour.prototype.scan_winner_diag_left = function(){
    let res;
    res = this.scan_in_dir(0, 0, 1, 1, "ACROSS");
    if (res !== -1){
        return res;
    }

    res = this.scan_in_dir(0, 0, 1, 1, "DOWN");
    if (res !== -1){
        return res;
    }

    return -1;
};


ConnectFour.prototype.scan_winner_diag_right = function(){
    let res;
    res = this.scan_in_dir(0, this.cols-1, 1, -1, "BACKROSS");
    if(res !== -1){
        return res;
    }

    res = this.scan_in_dir(0, this.cols-1, 1, -1, "DOWN");
    if(res !== -1){
        return res;
    }
    return -1;
};


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports = ConnectFour;
} else {
    window.ConnectFourEngine = ConnectFour;
}
