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
	});
	
	describe('handleInput outcomes', function () {
		var updateSpy;
		updateSpy = sinon.spy(player, 'update'); 
		
		beforeEach(function () {
			updateSpy.reset();
		});
		
		it('player.update not called when left is clicked and player.x is 0', function () {
			player.x = 0;
			player.handleInput('left');
			expect(updateSpy).not.called;
		});

		it('player.update called when left is clicked and player.x > 0', function () {
			player.x = player.determinePixels('column', 1); 
			player.handleInput('left');
			expect(updateSpy).be.called;
		});

		it('player.update not called when right is clicked and player.x is in far right column', function () {
			player.x = player.determinePixels('column', Board.numberOfRows);  // puts the character in far right column
			player.handleInput('right');
			expect(updateSpy).not.called;
		});

		it('player.update called when right is clicked and player.x < far right column', function () {
			player.x = player.determinePixels('column', 1);
			player.handleInput('right');
			expect(updateSpy).be.called;
		});
	});
})