const assert = require('assert');
const ConnectFour = require('../connect_four_eng.js');

describe('there are no winners', function(){
    it('should return -1 when there is no winner on the board, row only', function(){
        let c4 = new ConnectFour();
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(3);
        c4.makeMove(4);
        assert.equal(c4.scanWinner(), -1);
    });

    it('should return -1 when there is no winner on the board, col only', function(){
        let c4 = new ConnectFour();
        c4.makeMove(1);
        c4.makeMove(1);
        c4.makeMove(1);
        c4.makeMove(1);
        assert.equal(c4.scanWinner(), -1);
    });

    it('should return -1 when there is no winner on the board, mix', function(){
        let c4 = new ConnectFour();
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(3);
        c4.makeMove(4);
        c4.makeMove(5);
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(3);
        c4.makeMove(4);
        assert.equal(c4.scanWinner(), -1);
    });

});

describe('there is a winner', function(){
    it('should return 1 when player one wins by column', function(){
        let c4 = new ConnectFour();
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(1);
        assert.equal(c4.scanWinner(), 1);
    });

    it('should return 2 when player two wins by column', function(){
        let c4 = new ConnectFour();
        c4.makeMove(5);
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(1);
        assert.equal(c4.scanWinner(), 2);
    });

    it('should return 1 when player one wins by row', function(){
        let c4 = new ConnectFour();
        c4.makeMove(1);
        c4.makeMove(6);
        c4.makeMove(2);
        c4.makeMove(6);
        c4.makeMove(3);
        c4.makeMove(5);
        c4.makeMove(4);
        assert.equal(c4.scanWinner(), 1);
    });

    it('should return 2 when player two wins by row', function(){
        let c4 = new ConnectFour();
        c4.makeMove(6);
        c4.makeMove(1);
        c4.makeMove(6);
        c4.makeMove(2);
        c4.makeMove(5);
        c4.makeMove(3);
        c4.makeMove(6);
        c4.makeMove(4);
        assert.equal(c4.scanWinner(), 2);
    });

    it('should return 1 when player one wins by diag-left', function(){
        let c4 = new ConnectFour();
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(3);
        c4.makeMove(4);
        c4.makeMove(5);
        c4.makeMove(6);
        c4.makeMove(4);
        c4.makeMove(3);
        c4.makeMove(3);
        c4.makeMove(2);
        c4.makeMove(2);
        c4.makeMove(6);
        c4.makeMove(2);
        assert.equal(c4.scanWinner(), 1);
    });

    it('should return 2 when player two wins by diag-right', function(){
        let c4 = new ConnectFour();
        c4.makeMove(1);
        c4.makeMove(2);
        c4.makeMove(3);
        c4.makeMove(4);
        c4.makeMove(5);
        c4.makeMove(3);
        c4.makeMove(4);
        c4.makeMove(4);
        c4.makeMove(5);
        c4.makeMove(5);
        c4.makeMove(6);
        c4.makeMove(5);
        assert.equal(c4.scanWinner(), 2);
    });

    it('should return 2 when player two wins by diag-right', function(){
        const c4 = new ConnectFour();
        c4.switchPlayer();
        c4.dropPiece(3);
        c4.dropPiece(3);
        c4.dropPiece(3);
        c4.dropPiece(3);
        c4.dropPiece(2);
        c4.dropPiece(2);
        c4.dropPiece(2);
        c4.dropPiece(1);
        c4.dropPiece(1);
        c4.dropPiece(0);
        assert.equal(c4.scanWinnerDiagRight(), 2);
    });
});
