import React from 'react'
import Tile from './Tile.js'

class Game extends React.Component {
    state = {
        board: this.generateBoard(),
        minesGenerated: false,
        valuesGenerated: false
    }

    // Generates empty game board as a matrix
    generateBoard() {
        var board = []

        for (var y = 0; y < this.props.height; y++) {
            var row = []
            for (var x = 0; x < this.props.width; x++) { row.push({ mine: false, value: 0 }) }
            board.push(row)
        }

        return board
    }

    // Randomly places mines on game board
    generateMines(origin) {
        if (!this.state.minesGenerated) {
            var minesGenerated = 0
            var minedBoard = this.state.board
            var ignore = new Set()
            this.getSurroundingTiles(origin).add(origin).forEach((value) => { ignore.add(JSON.stringify(value)) })
            console.log(ignore)

            while (minesGenerated < this.props.mines) {
                var randX = Math.floor(Math.random() * this.props.width)
                var randY = Math.floor(Math.random() * this.props.height)
                if (!minedBoard[randY][randX].mine && !ignore.has(JSON.stringify([randX, randY]))) {
                    minedBoard[randY][randX].mine = true
                    minesGenerated++
                }
            }

            this.setState({ board: minedBoard, minesGenerated: true })
        }
    }

    // Generates values for tiles, which is how many bombs surround the tile
    generateValues() {
        if (!this.state.valuesGenerated) {
            var valueBoard = this.state.board

            for (var x = 0; x < this.props.width; x++) {
                for (var y = 0; y < this.props.height; y++) {
                    var value = 0
                    if (!valueBoard[y][x].mine) {
                        for (let tile of this.getSurroundingTiles([x, y])) {
                            if (this.state.board[tile[1]][tile[0]].mine) { value++ }
                        }
                    } else { value = null }

                    valueBoard[y][x].value = value
                }
            }

            this.setState({ board: valueBoard, valuesGenerated: true })
        }
    }

    // Returns coordinates of surrounding tiles
    getSurroundingTiles(origin) {
        var perms = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        var tiles = new Set()

        perms.map((perm) => {
            var newX = origin[0] + perm[0]
            var newY = origin[1] + perm[1]
            if (0 <= newX && newX < this.props.width && 0 <= newY && newY < this.props.height) { tiles.add([newX, newY]) }
            return null
        })

        return tiles
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