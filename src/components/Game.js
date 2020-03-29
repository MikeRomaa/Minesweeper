import React from 'react'
import Tile from './Tile.js'

class Game extends React.Component {
    state = {
        board: this.generateBoard(),
        mined: false
    }

    // Generates empty game board as a matrix
    generateBoard() {
        var board = []

        for (var y = 0; y < this.props.height; y++) {
            var row = []
            for (var x = 0; x < this.props.width; x++) { row.push({ mine: 0, value: 0 }) }
            board.push(row)
        }

        return board
    }

    // Randomly places mines on game board
    generateMines(originX, originY) {
        if (!this.state.mined) {
            var minesGenerated = 0
            var minedBoard = this.state.board

            while (minesGenerated < this.props.mines) {
                var randY = Math.floor(Math.random() * this.props.height)
                var randX = Math.floor(Math.random() * this.props.width)
                if (!minedBoard[randY][randX].mine && randX !== Number(originX) && randY !== Number(originY)) {
                    minedBoard[randY][randX].mine = 1
                    minesGenerated++
                }
            }

            this.setState({ board: minedBoard, mined: true })
        }
    }

    // Generates values for tiles, which is how many bombs surround the tile
    generateValues() {
        var valueBoard = this.state.board
        var perms = [{ dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 }, { dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 }]

        for (var x = 0; x < this.props.width; x++) {
            for (var y = 0; y < this.props.height; y++) {
                var value = 0
                if (valueBoard[y][x].mine === 0) {
                    for (var i = 0; i < 8; i++) {
                        var newX = x + perms[i].dx
                        var newY = y + perms[i].dy
                        if (newX >= 0 && newX < this.props.width && newY >= 0 && newY < this.props.height && this.state.board[newY][newX].mine === 1) { value++ }
                    }
                } else { value = null }

                valueBoard[y][x].value = value
            }
        }

        this.setState({ board: valueBoard })
    }

    render() {
        var generateMines = this.generateMines
        var generateValues = this.generateValues

        return (
            <div className="game">
                {this.state.board.map((row, indexY) =>
                    <div className="game-row d-flex">
                        {row.map((tile, indexX) =>
                            <Tile
                                generateMines={generateMines.bind(this)}
                                generateValues={generateValues.bind(this)}
                                mine={tile.mine}
                                value={tile.value}
                                x={indexX}
                                y={indexY}
                            />
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default Game