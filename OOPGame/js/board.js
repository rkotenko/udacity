/* 
 Rob Kotenko: I want to be able to store some details about the board that is 
 accessible globally.  These will allow me to not have to hard code pixels and columns and other board details
 all over the place.  
 */

var Board = {
    width: 505,
    height: 606,
    numberOfRows: 6,
    numberOfColumns: 5,
    columnSize: 101,
    rowSize: 83,
    rowBuffer: 20, 
    minEnemySpeed: 75,
    maxEnemySpeed: 300,
    playerLeftPad: 16,
    playerRightPad: 16,
    enemyLeftPad: 1,
    enemyRightPad: 2
};

// 
Board.startLocation = {
    column: 2 * Board.columnSize, 
    row: 5 * Board.rowSize
};

// the rows needs to be a little less than rowSize otherwise the enemies scroll across row boundaries
Board.enemyRows = [1 * Board.rowSize, 2 * Board.rowSize, 3 * Board.rowSize];