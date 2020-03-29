import React from 'react'

class Tile extends React.Component {
    state = {
        revealed: false,
        flag: false
    }

    // Sets tile state to revealed. If it is the first tile it generates the mines
    reveal() {
        this.props.generateMines(this.props.x, this.props.y)
        this.props.generateValues()
        this.setState({ revealed: true })
    }

    // Handles right click event to flag a tile
    flag = (event) => {
        event.preventDefault()
        if (this.state.flag) {
            this.setState({ flag: false })
        } else {
            this.setState({ flag: true })
        }
    }

    render() {
        if (this.state.revealed) {
            if (this.props.mine) {
                return <div className="tile mine text-center">{this.props.value}</div>
            } else {
                return <div className="tile revealed text-center">{this.props.value}</div>
            }
        } else {
            if (this.state.flag) {
                return <div className="tile flag text-center" onClick={() => this.reveal()} onContextMenu={this.flag}></div>
            } else {
                return <div className="tile text-center" onClick={() => this.reveal()} onContextMenu={this.flag}></div>
            }
        }
    }
}

export default Tile