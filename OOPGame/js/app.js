// Rob Kotenko: A superclass called character.  Every enemy and the player is a subclass of this
// x: x coordinate
// y: y coordinate
// sprite: a url string for the character image
var Character = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;   
};

// the render function looks the same for enemies and players so put it in character
Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Character.call(this, Board.startLocation.column, Board.startLocation.row, 'images/char-boy.png');
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// Rob Kotenko: reset the x and y of the player back to startLocation
Player.prototype.reset = function () {  
    player.x = Board.startLocation.column;
    player.y = Board.startLocation.row;
};

// Converts the user input into the proper x and y values
Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case 'left':
            if(player.x > 0) {
                player.x = player.x - Board.columnSize;
            }
            break;
        case 'right':
            if(player.x < Board.columnSize * (Board.numberOfColumns - 1)) {
                player.x = player.x + Board.columnSize;
            }
            break;
        case 'up':
            // player is in 2nd row, right before water.  And up key is a win.  reset
            if(player.y == Board.rowSize * 1) {
                player.reset();
            } else {
                player.y = player.y - Board.rowSize;
            }
            break;
        case 'down':
            if(player.y < (Board.rowSize * (Board.numberOfRows - 1))) {
                player.y = player.y + Board.rowSize;
            }
            break;
    }
    
};

// Rob Kotenko: determinePixels takes a type, row or column and converts the simple number
// to the proper number of pixels for where the player sprite should be drawn
// a helper function really so I can think in column and row numbers instead of pixels
// and I can store the sizes for each in Board
Player.prototype.determinePixels = function (type, value) {
    switch(type) {
        case 'row':
            return value * Board.rowSize;
        case 'column':
            return value * Board.columnSize;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
