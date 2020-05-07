import React, { Component } from 'react'

class Game extends Component {
    state = {
        board: this.generateBoard(this.props.height, this.props.width),
        boardPopulated: false,
        win: false,
        loss: false
    }

    // Generates a matrix with no nukes or values
    generateBoard(height, width) {
        var board = Array(height)
        for (var i = 0; i < height; i++) {
            var row = Array(width)
            for (var j = 0; j < width; j++) {
                row[j] = { nuke: false, value: 0, revealed: false, flagged: false }
            }
            board[i] = row
        }
        return board
    }

    // Randomly places nukes on game board and then calls << generateValues >> method
    generateNukes(origin) {
        var nukesGenerated = 0
        var nukedBoard = this.state.board
        var ignore = new Set()
        var surroundingTiles = this.getSurroundingTiles(origin)
        surroundingTiles.push(origin)
        surroundingTiles.forEach((value) => { ignore.add(JSON.stringify(value)) })
        
        while (nukesGenerated < this.props.nukes) {
            var randX = Math.floor(Math.random() * this.props.width)
            var randY = Math.floor(Math.random() * this.props.height)
            if (!nukedBoard[randY][randX].nuke && !ignore.has(JSON.stringify([randX, randY]))) {
                nukedBoard[randY][randX].nuke = true
                nukesGenerated++
            }
        }

        this.generateValues(nukedBoard)
    }

    // Generates values for tiles (how many bombs surround the tile)
    generateValues(nukedBoard) {
        for (var x = 0; x < this.props.width; x++) {
            for (var y = 0; y < this.props.height; y++) {
                var value = 0
                if (!nukedBoard[y][x].nuke) {
                    for (let tile of this.getSurroundingTiles([x, y])) {
                        if (this.state.board[tile[1]][tile[0]].nuke) {
                            value++
                        }
                    }
                } else { value = null }
                nukedBoard[y][x].value = value
            }
        }

        this.setState({ board: nukedBoard, boardPopulated: true })
    }

    // Returns coordinates of surrounding tiles
    getSurroundingTiles(origin) {
        var perms = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        var tiles = []

        perms.map((perm) => {
            var newX = origin[0] + perm[0]
            var newY = origin[1] + perm[1]
            if (0 <= newX && newX < this.props.width && 0 <= newY && newY < this.props.height) { tiles.push([newX, newY]) }
            return null
        })

        return tiles
    }

    clearTile(indexX, indexY) {
        if (this.state.board[indexY][indexX].nuke) {
            this.setState({ loss: true })
        }
        let tempBoard = this.state.board
        
        tempBoard[indexY][indexX].revealed = true
        if (tempBoard[indexY][indexX].value === 0) {
            for (let tile of this.getSurroundingTiles([indexX, indexY])) {
                tempBoard[tile[1]][tile[0]].revealed = true
            }
        }

        this.setState({ board: tempBoard })

        let totalSafeTiles = this.props.height * this.props.width - this.props.nukes
        let revealedSafeTiles = 0
        this.state.board.forEach((row) => row.forEach((tile) => { if (tile.revealed) { revealedSafeTiles++ } }))
        if (totalSafeTiles === revealedSafeTiles) {
            this.setState({ win: true })
        }
    }

    // Handles left click event to reveal a tile
    handleLeftClick(indexX, indexY) {
        return () => {
            if (!this.state.boardPopulated) { this.generateNukes([indexX, indexY]) }
            this.clearTile(indexX, indexY)
        }
    }

    // Handles right click event to flag a tile
    handleRightClick(indexX, indexY) {
        return (e) => {
            e.preventDefault()
            let tempBoard = this.state.board
            tempBoard[indexY][indexX].flagged = !tempBoard[indexY][indexX].flagged
            this.setState({ board: tempBoard })
        }
    }

    // Resets the game upon losing or winning
    resetGame() {
        return () => {
            if (this.state.loss || this.state.win) {
                this.setState({
                    board: this.generateBoard(this.props.height, this.props.width),
                    boardPopulated: false,
                    win: false,
                    loss: false
                })
            }
        }
    }

    render() {
        return (
            <div className="game">
                {this.state.board.map((row, indexY) =>
                    <div key={indexY} className="game-row d-flex">
                        {row.map((tile, indexX) =>
                            <div
                            key={indexX}
                            className={tile.nuke && tile.revealed ? 'tile nuke' : tile.revealed ? 'tile revealed val-' + tile.value : tile.flagged ? 'tile flagged' : 'tile'}
                            onClick={this.handleLeftClick(indexX, indexY)}
                            onContextMenu={this.handleRightClick(indexX, indexY)}>
                            </div>
                        )}
                    </div>
                )}
                <div className={this.state.loss || this.state.win ? 'pop-up' : 'd-none'} style={{ width: parseInt(this.props.width) * 25 + 'px', height: parseInt(this.props.height) * 25 + 'px', top: -parseInt(this.props.height) * 25 + 'px' }}>
                    <p>{this.state.loss ? 'You lost, would you like to try again?' : 'Congratulations, you win!'}</p>
                    <button className='restart-button' onClick={this.resetGame()}>Restart</button>
                </div>
            </div>
        )
    }
}

export default Game