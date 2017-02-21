import Board from './board';
import Socket from './socket';
import _ from 'lodash';

export default class Game {
	constructor(socketInstance) {
		// arrangement of pieces/empty cells
		this.gameState = [
			[ 0, 'R', 0, 'R', 0, 'R', 0, 'R' ],
			[ 'R', 0, 'R', 0, 0, 0, 'R', 0 ],
			[ 0, 'R', 0, 'R', 0, 'R', 0, 'R' ],
			[ 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 'R', 0, 0, 0, 0, 0, 0 ],
			[ 'B', 0, 'B', 0, 'B', 0, 'B', 0 ],
			[ 0, 'B', 0, 0, 0, 'B', 0, 'B' ],
			[ 'B', 0, 'B', 0, 'B', 0, 'B', 0 ]
		]
		// if a valid move target has been clicked
		this.cellSelected = false;
		// cells that selected piece can move to
		this.availableMoves = []
		// if already jumped this turn, this tracks (and points to) piece that is jumping
		this.hasJumped = false;
		this.jumpCell = [];
		// flip to true when turn is over
		this.doneMoving = false;

		this.socket = new Socket(socketInstance, this);

		let board = new Board()
		board.passGame(this)
		board.drawBoard()

		this.board = board
	}

	// simple getters
	getState() {
		return this.gameState
	}

	getSelected() {
		return this.cellSelected
	}

	getMoves() {
		return this.availableMoves
	}

	movePiece(originX, originY, destinationX, destinationY) {
		this.availableMoves = []
		this.gameState[destinationY][destinationX] = 'B'
		this.gameState[originY][originX] = 0
		let distanceTraveled = Math.abs(destinationY - originY)
		// if piece traveled further than one row, delete the pieces it passed over
		if (distanceTraveled > 1) {
			let jumpedX = ( originX + destinationX )/2
			let jumpedY = ( originY + destinationY )/2
			this.gameState[jumpedY][jumpedX] = 0
			this.jumpCell = [destinationX, destinationY]
			this.hasJumped = true;
		}

		if (!this.hasJumped || !this.selectCell(...this.jumpCell)) {
			this.doneMoving = true;
			this.socket.sendGamestate(this.gameState)
			this.cellSelected = []
			this.availableMoves = []
		}

		this.board.drawBoard();
	}

	selectCell(x, y) {
		this.cellSelected = [x, y]
		let { gameState } = this

		let cellsToEvaluate = [
			[ x-1, y-1 ],
			[ x+1, y-1 ]
		]

		let anyJumpableSquares = false
		
		// evaluate possible move cells to discern legal moves
		cellsToEvaluate.forEach(cell => {
			let testX = cell[0]
			let testY = cell[1]
			switch ( gameState[ testY ][ testX ] ) {
				// empty cell: can move	
				case 0:
					this.availableMoves.push([ testX, testY ])
					break;
				// enemy piece: can skip
				case 'R':
					var jumpCell
					if ( testX < x) {
						jumpCell = [ testX - 1, testY - 1 ]
					} else {
						jumpCell = [ testX + 1, testY - 1 ]
					}
					if ( gameState[ jumpCell[1]] != undefined && gameState[ jumpCell[1] ][ jumpCell[0] ] === 0 ) {
						this.availableMoves.push([ jumpCell[0], jumpCell[1] ])
						anyJumpableSquares = true;
					}
					break;
			}
		})

		return anyJumpableSquares;
	}

	evaluateClick(x, y) {
		let { availableMoves, cellSelected, hasJumped, jumpCell, doneMoving } = this, offsetX = 0, offsetY = 0, mx, my;

		// if selected valid piece to move, highlight square;
		if (this.gameState[y][x] === 'B' && !cellSelected && !hasJumped && !doneMoving) {
			// action = "select"
			this.selectCell(x, y)
		// in case jump made & more jumps available
		} else if (hasJumped && !doneMoving && _.isEqual([x, y], jumpCell)) {
			this.selectCell(x, y)
		// if selected available square to move selected to,
		// move piece & redraw
		} else if ( availableMoves.some( coords => _.isEqual(coords, [x,y]) ) ) {
			this.movePiece(...cellSelected, x, y)
		// else, dehighlight/deselect
		} else {
			this.cellSelected = false
			this.availableMoves = [];
		}
	}

	makeServerMove(newState) {
		this.gameState = newState;
		this.doneMoving = false;
		this.hasJumped = false;
		this.board.drawBoard()	
	}

	// used in case of redundant game starting from server
	// which causes undesirable board duplicates
	wipe() {
		this.board.deleteBoard()
	}
}
