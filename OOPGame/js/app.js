// Rob Kotenko: A superclass called character.  Every enemy and the player is a subclass of this
// params can be an array of x, y, and sprite values or it can be just a sprite (x and y are set for enemies via
// a special function in that class.  Code assumes length of 3 or 1 with correct values.  No validation
var Character = function () {
    if(arguments.length === 3) {
        this.x = arguments[0];
        this.y = arguments[1];
        this.sprite = arguments[2];
    } else {
        this.sprite = arguments[0];
    } 
};

// the render function looks the same for enemies and players so put it in character
Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

// Rob Kotenko: a random int function.  This is the standard function found in many locations on the web, including
// MDN
Character.prototype.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Enemies our player must avoid
var Enemy = function() {
    var location = this.setStartLocation();
    Character.call(this, 'images/enemy-bug.png');
    this.setSpeed();
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // if position is past board width, reset the sprite
    if(this.x >= Board.width) {
        this.setSpeed();
        this.setStartLocation()
    } else {
        this.x = Math.floor(this.x + (this.speed * dt));
    }
};

// Rob Kotenko: method for computing the x and y values for an enemy
// y: random choice of one of the values in the Board.enemyRows array
// x: random value off map between column -2 and -1 inclusive 
Enemy.prototype.setStartLocation = function () {
    this.x = this.randomInt(-2 * Board.columnSize, -1 * Board.columnSize); // column -2 starts at -202, 1 starts at -101
    this.y = Board.enemyRows[this.randomInt(0, Board.enemyRows.length)]; // get random int from range of enemyRow array
    return location;    
};

// set the enemy speed to a random choice between minEnemySpeed and maxEnemySpeed
Enemy.prototype.setSpeed = function () {
    this.speed = this.randomInt(Board.minEnemySpeed, Board.maxEnemySpeed);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Character.apply(this, [Board.startLocation.column, Board.startLocation.row, 'images/char-boy.png']);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// Check to see if the player has collided with an enemy.  Return true if so, false if not
Player.prototype.hasCollided = function () {
    // First, find all enemies in the array that are on the same row as player
    // Then, with all resulting enemies, check if the enemy's left and right edges are within the players left and right
    // edges. If so, collision has occurred, return true immediately
    
};

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
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
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
