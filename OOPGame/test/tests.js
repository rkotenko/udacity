var expect = chai.expect;


// hide the canvas
var canvas = document.getElementsByTagName('canvas');
canvas[0].style.display = 'none';

describe('Board class', function () {
	describe('properties', function () {
		it('should have a width property', function () {
			expect(Board.width).to.exist;
		});
		it('should have a height property', function () {
			expect(Board.height).to.exist;
		});
		it('should have a numberOfColums property', function () {
			expect(Board.numberOfColumns).to.exist;
		});
		it('should have a numberOfRows property', function () {
			expect(Board.numberOfRows).to.exist;
		});
		it('should have a columnSize property', function () {
			expect(Board.columnSize).to.exist;
		});
		it('should have a rowSize property', function () {
			expect(Board.rowSize).to.exist;
		});
		it('should have a enemyRows array', function () {
			expect(Board.enemyRows).to.be.an.array;
		});
		it('should have a startLocation array', function () {
			expect(Board.startLocation).to.be.an.array;
		});
	})
});

describe('Character class', function () {
	var sprite = 'images/enemy-bug.png';
	var character = new Character(0, 1, sprite);
	
	it('the x property should be set to 0', function () {
		expect(character.x).to.equal(0);		
	});
	
	it('y should be set to 1', function () {
		expect(character.y).to.equal(1);
	});
	
	it('sprite should equal images/enemy-bug.png', function () {
		expect(character.sprite).to.equal(sprite);
	});
	
	it('render method should exist', function () {
		expect(character.render).to.exist;
	});
});

describe('Player class', function () {
	describe('Player initialization', function () {
			
		it('player should be an instance of Character', function () {
			expect(player).to.be.instanceOf(Character);
		});
		
		it('the x property should be set to ' + Board.startLocation.column, function () {
			expect(player.x).to.equal(Board.startLocation.column);
		});

		it('the y property should be set to ' + Board.startLocation.row, function () {
			expect(player.y).to.equal(Board.startLocation.row);
		});
		
		it('player.reset() should put the player character back to the startLocation values', function () {
			// move the player off of the startLocation for testing.  start is (2, 5)
			player.x = Board.columnSize * 3;
			player.y = Board.rowSize * 3;
			player.reset();
			expect(player.x).to.equal(Board.startLocation.column);
			expect(player.y).to.equal(Board.startLocation.row);
		});
	});
	
	describe('handleInput outcomes', function () {
		
		it('Left Boundary: x stays same', function () {
			player.x = 0;
			player.handleInput('left');
			expect(player.x).to.equal(0);
		});

		it('Left input when not at boundary: move one column left so player.x =  player.x - ' + Board.columnSize, function () {
			var original = player.x = Board.columnSize; // puts player in second column 
			player.handleInput('left');
			expect(player.x + Board.columnSize).to.equal(original);
		});

		it('Right Boundary: x stays the same', function () {
			var original = player.x = Board.columnSize * (Board.numberOfColumns - 1);  // puts the character in far right column
			player.handleInput('right');
			expect(player.x).to.equal(original);
		});

		it('Right input when not at boundary: move one column right so player.x is player.x + . ' + Board.columnSize, function () {
			var original = player.x = Board.columnSize; // puts player in second column 
			player.handleInput('right');
			expect(original).to.equal(player.x - Board.columnSize);
		});

		it('Top Boundary: player made it to row 1 (right before water) and tries to move up, y and x are reset to start', function () {
			player.y = Board.rowSize * 1;
			player.handleInput('up');
			expect(player.x).to.equal(Board.startLocation.column);
			expect(player.y).to.equal(Board.startLocation.row);
		});

		it('Up input when not at boundary: move one row up so player.y = player.y - ' + Board.rowSize, function () {
			var original = player.y = Board.rowSize * 4; // puts player in 5th row 
			player.handleInput('up');
			expect(player.y + Board.rowSize).to.equal(original);
		});

		it('Bottom Boundary: y does not change', function () {
			var original = player.y = Board.rowSize * (Board.numberOfRows - 1); 
			player.handleInput('down');
			expect(player.y).to.equal(original);
		});

		it('Down input when not at boundary: move one row down so player.y = player.y + ' + Board.rowSize, function () {
			var original = player.y = Board.rowSize * 1; // puts player in 1st row 
			player.handleInput('down');
			expect(player.y - Board.rowSize).to.equal(original);
		});
	});
});