import React from 'react'
import Tile from './Tile.js'

class Game extends React.Component {
    state = {
        board: this.generateBoard(this.props.width, this.props.height, this.props.mines)
    }

    // Generates and populates game board with randomly placed mines
    generateBoard(width, height, mines) {
        var board = []
        var minesGenerated = 0

        for (var y = 0; y < height; y++) {
            var row = []
            for (var x = 0; x < width; x++) { row.push(0) }
            board.push(row)
        }

        while (minesGenerated < mines) {
            var randY = Math.floor(Math.random() * height)
            var randX = Math.floor(Math.random() * width)
            if (!board[randY][randX]) {
                board[randY][randX] = 1
                minesGenerated++
            }
        }

        return board
    }

    render() {
        console.log(this.state.board)
        return (
            <div className="game">
                {this.state.board.map(row =>
                    <div className="game-row d-flex">
                        {row.map(tile => <Tile mine={tile} />)}
                    </div>
                )}
            </div>
        )
    }
}

export default Game