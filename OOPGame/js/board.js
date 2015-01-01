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
    enemyRows: [1, 2, 3],
    startLocation: [2, 5]
};