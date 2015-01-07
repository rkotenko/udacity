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
		
		it('should have a minEnemySpeed property', function () {
			expect(Board.minEnemySpeed).to.exist;
		});
		it('should have a maxEnemySpeed property', function () {
			expect(Board.maxEnemySpeed).to.exist;
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

	it('randomInt method should exist', function () {
		expect(character.randomInt).to.exist;
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
		
		it('leftPad and rightPad should be set to  16 and 84 respectively', function () {
			expect(player.leftPad).to.equal(16);
			expect(player.rightPad).to.equal(16);
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
	
	describe('hasCollided - player sprite edges are inclusive', function () {
		// use the player and the enemies already created to run tests
		it('when player and enemies on different rows, hasCollided returns false', function () {
			// reset the player.  This will it in the right place for this test
			player.reset();
			expect(player.hasCollided()).to.equal(false);
		});
		
		describe('player and enemies in same row', function() {
			var last = allEnemies.length - 1;
			// before running these test, let's move the 1st, last enemy, and player to the 1st enemy row
			before(function() {
				// move first, last enemy, player to the 1st enemy row
				allEnemies[0].y = allEnemies[last].y = player.y = Board.enemyRows[0];
			});
			
			// test with two enemies to make sure multiple enemies in row is handled correctly
			it('player, 2 enemies same row, no enemies inside player innerLeft and innerRight, hasCollided should return false', function () {
				// put both enemies into the 2nd column
				allEnemies[0].x = allEnemies[last].x = 1 * Board.columnSize;
				
				// move the player to 4th column
				player.x = 3 * Board.columnSize;
				expect(player.hasCollided()).to.equal(false);
			});
		
			it('player, 2 enemies same row, 2nd enemy right edge (minus padding) = player left edge (minus padding), hasCollided should return true', function () {
				// put 1st enemy in 1st column, 2nd enemy in 3rd column + its padding and player padding, 
				//and player in 4th column (2nd enemy x + padding and player x + padding will match) 
				allEnemies[0].x = 0 * Board.columnSize;
				allEnemies[last].x = 2 * Board.columnSize + allEnemies[last].rightPad + player.leftPad;
				player.x = 3 * Board.columnSize;
				expect(player.hasCollided()).to.equal(true);
			});
			
			it('player, 2 enemies same row, 2nd enemy innerLeft = player innerRight, hasCollided should return true', function () {
				// put 1st enemy in 1st column, 2nd enemy in 4th column, and player in 3rd column (2nd enemy left edge and player right will match) 
				allEnemies[0].x = 0 * Board.columnSize;
				allEnemies[last].x = 3 * Board.columnSize;
				player.x = 2 * Board.columnSize;
				expect(player.hasCollided()).to.equal(true);
			});

			it('player, 2 enemies same row, 2nd enemy right edge inside player left and right edge, hasCollided should return true', function () {
				// put 1st enemy in 1st column, 2nd enemy in 3rd column + 10, and player in 4th column (2nd enemy right edge is inside player edges)
				allEnemies[0].x = 0 * Board.columnSize;
				allEnemies[last].x = (2 * Board.columnSize) + 10;
				player.x = 3 * Board.columnSize;
				expect(player.hasCollided()).to.equal(true);
			});
			
			it('player, 2 enemies same row, 2nd enemy left edge inside player right edge, hasCollided should return true', function () {
				// put 1st enemy in 1st column, 2nd enemy in 4th column - 10, and player in 3rd column (2nd enemy left edge and player right will match) 
				allEnemies[0].x = 0 * Board.columnSize;
				allEnemies[last].x = (3 * Board.columnSize) - 1;
				player.x = 2 * Board.columnSize;
				expect(player.hasCollided()).to.equal(true);
			});
		});		
	});
	
	describe('update', function() {
		var collisionSpy = sinon.spy(player, 'hasCollided');
		
		it('update should call hasCollided', function() {
			expect(collisionSpy).called;
		});
	});
});

describe('Enemy class', function () {
	var enemy = new Enemy();
	
	it('setStartLocation should exist', function () {
		expect(enemy.setStartLocation).to.exist();	
	});

	it('setSpeed should exist', function () {
		expect(enemy.setSpeed).to.exist();
	});
		
	describe('Enemy initialization', function () {
		
		it('enemy should be an instance of Character', function () {
			expect(enemy).to.be.instanceOf(Character);
		});
		
		it('x and y should be numbers and sprite should be a string', function () {
			expect(enemy.x).to.be.a('number');
			expect(enemy.y).to.be.a('number');
			expect(enemy.sprite).to.be.a('string');
		});
		
		it('leftPad and rightPad should be 1 and 99 respectively', function() {
			expect(enemy.leftPad).to.equal(1);
			expect(enemy.rightPad).to.equal(2);
		});
		
		// enemy.speed is a random number between enemy.minEnemySpeed and enemy.maxEnemySpeed.  It is directly set
		// by randomInt, which is a proven function, so just check that it is set.  A more rigorous check could run this
		// tons of times to check that the numbers always fall in range, I suppose, to ensure the proper range was used.
		it('enemy.speed should be set and greater than 0', function () {
			expect(enemy.speed).to.exist();
			expect(enemy.speed).to.greaterThan(0);
		});
		
		describe('getStartLocation - returns location array [x, y]', function () {
			// stub out the random function so I can just the functions that use it instead of worrying about it itself
			var randomStub = sinon.stub(enemy, 'randomInt');
			
			// Test cases for the enemyRow array.  Not quite sure how to best test random functionality
			// but testing that my location function returns the first and last array values is at least something 
			it('when randomInt returns 0, y should be first value in Enemy.enemyRows', function () {
				randomStub.returns(0);
				enemy.setStartLocation(); // manually call setStartLocation so the stub is used
				expect(randomStub).called;
				expect(enemy.y).to.equal(Board.enemyRows[0]);
			});

			it('when randomInt returns Enemy.enemyRows.length - 1, y should be last value in Enemy.enemyRows', function () {
				randomStub.returns(Board.enemyRows.length - 1);
				enemy.setStartLocation(); // manually call setStartLocation so the stub is used
				expect(randomStub).called;
				expect(enemy.y).to.equal(Board.enemyRows[Board.enemyRows.length - 1]);
			});
			
			// test that x is being set by randomInt 
			it('enemy.x should be set via randomInt. Test with -2 * Board.columnSize', function () {
				randomStub.returns(-2 * Board.columnSize);
				enemy.setStartLocation();
				expect(randomStub).called;
				expect(enemy.x).to.equal(-2 * Board.columnSize);
			});
		});
		
	});

	describe('update', function () {
		var startSpy = sinon.spy(enemy, 'setStartLocation'),
			speedSpy = sinon.spy(enemy, 'setSpeed'),
			dt = .035; // set the time delta (usually set by Date.now) to constant value
		
		beforeEach(function () {
			startSpy.reset();
			speedSpy.reset();	
		});
		
		it('if enemy.x = Board.width, setStartLocation and setSpeed should be called', function () {
			enemy.x = Board.width;
			enemy.update(dt);
			expect(startSpy).called;
			expect(speedSpy).called;
		});

		it('if enemy.x > Board.width, setStartLocation and setSpeed should be called', function () {
			enemy.x = Board.width + 1;
			enemy.update(dt);
			expect(startSpy).called;
			expect(speedSpy).called;
		});
		
		it('if enemy.x < Board.width, new enemy.x should be Math.floor(enemy.speed time time delta)', function () {
			enemy.x = 0;
			var expected = Math.floor(enemy.x + (enemy.speed * dt));
			enemy.update(dt);
			expect(enemy.x).to.equal(expected);
		});	
	});
});