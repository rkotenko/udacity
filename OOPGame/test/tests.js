var expect = chai.expect;

// hide the canvas
var canvas = document.getElementsByTagName('canvas');
canvas[0].style.display = 'none';

describe('Board', function () {
	describe('properties', function () {
		it('should have a width property', function () {
			expect(Board.width).to.exist;
		});
		it('should have a height property', function () {
			expect(Board.height).to.exist;
		});
		it('should have a col property', function () {
			expect(Board.col).to.exist;
		});
		it('should have a row property', function () {
			expect(Board.col).to.exist;
		});
		it('should have a colSize property', function () {
			expect(Board.col).to.exist;
		});
		it('should have a rowSize property', function () {
			expect(Board.col).to.exist;
		});
	})
});