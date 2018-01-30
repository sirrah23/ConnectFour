const assert = require('assert');
const ConnectFour = require('../connect_four_eng.js');

describe('there are no winners', function(){
    it('should return -1 when there is no winner on the board, row only', function(){
        let c4 = new ConnectFour();
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(3);
        c4.make_move(4);
        assert.equal(c4.scan_winner(), -1);
    });

    it('should return -1 when there is no winner on the board, col only', function(){
        let c4 = new ConnectFour();
        c4.make_move(1);
        c4.make_move(1);
        c4.make_move(1);
        c4.make_move(1);
        assert.equal(c4.scan_winner(), -1);
    });

    it('should return -1 when there is no winner on the board, mix', function(){
        let c4 = new ConnectFour();
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(3);
        c4.make_move(4);
        c4.make_move(5);
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(3);
        c4.make_move(4);
        assert.equal(c4.scan_winner(), -1);
    });

});

describe('there is a winner', function(){
    it('should return 1 when player one wins by column', function(){
        let c4 = new ConnectFour();
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(1);
        assert.equal(c4.scan_winner(), 1);
    });

    it('should return 2 when player two wins by column', function(){
        let c4 = new ConnectFour();
        c4.make_move(5);
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(1);
        assert.equal(c4.scan_winner(), 2);
    });

    it('should return 1 when player one wins by row', function(){
        let c4 = new ConnectFour();
        c4.make_move(1);
        c4.make_move(6);
        c4.make_move(2);
        c4.make_move(6);
        c4.make_move(3);
        c4.make_move(5);
        c4.make_move(4);
        assert.equal(c4.scan_winner(), 1);
    });

    it('should return 2 when player two wins by row', function(){
        let c4 = new ConnectFour();
        c4.make_move(6);
        c4.make_move(1);
        c4.make_move(6);
        c4.make_move(2);
        c4.make_move(5);
        c4.make_move(3);
        c4.make_move(6);
        c4.make_move(4);
        assert.equal(c4.scan_winner(), 2);
    });

    it('should return 1 when player one wins by diag-left', function(){
        let c4 = new ConnectFour();
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(3);
        c4.make_move(4);
        c4.make_move(5);
        c4.make_move(6);
        c4.make_move(4);
        c4.make_move(3);
        c4.make_move(3);
        c4.make_move(2);
        c4.make_move(2);
        c4.make_move(6);
        c4.make_move(2);
        assert.equal(c4.scan_winner(), 1);
    });

    it('should return 2 when player two wins by diag-right', function(){
        let c4 = new ConnectFour();
        c4.make_move(1);
        c4.make_move(2);
        c4.make_move(3);
        c4.make_move(4);
        c4.make_move(5);
        c4.make_move(3);
        c4.make_move(4);
        c4.make_move(4);
        c4.make_move(5);
        c4.make_move(5);
        c4.make_move(6);
        c4.make_move(5);
        assert.equal(c4.scan_winner(), 2);
    });

    it('should return 2 when player two wins by diag-right', function(){
        const c4 = new ConnectFour();
        c4.switch_player();
        c4.drop_piece(3);
        c4.drop_piece(3);
        c4.drop_piece(3);
        c4.drop_piece(3);
        c4.drop_piece(2);
        c4.drop_piece(2);
        c4.drop_piece(2);
        c4.drop_piece(1);
        c4.drop_piece(1);
        c4.drop_piece(0);
        assert.equal(c4.scan_winner_diag_right(), 2);
    });
});
