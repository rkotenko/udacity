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
    rowSize: 83
};

// just doing things like this as I can more easily visual column and row counts instead of pixels
Board.startLocation = {
    column: 2 * Board.columnSize, 
    row: 5 * Board.rowSize
};

Board.enemyRows = [1 * Board.rowSize, 2 * Board.rowSize, 3 * Board.rowSize];