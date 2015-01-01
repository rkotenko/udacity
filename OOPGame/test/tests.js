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
		it('should have a enemyRows property', function () {
			expect(Board.enemyRows).to.exist;
		});
		it('should have a startLocation property', function () {
			expect(Board.startLocation).to.exist;
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
	it('player should be an instance of Character', function () {
		expect(player).to.be.instanceOf(Character);
	});

	it('the x property should be set to ' + Board.startLocation[0], function () {
		expect(player.x).to.equal(Board.startLocation[0]);
	});
})