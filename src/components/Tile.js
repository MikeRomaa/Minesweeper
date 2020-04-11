import React, { Component } from 'react'

class Tile extends Component {
    state = {
        revealed: false,
        flagged: false
    }
    
    // Handles left click event to reveal a tile
    handleLeftClick() {
        return () => {
            this.props.generateNukes([this.props.x, this.props.y])
            this.setState({ revealed: true })
        }
    }

    // Handles right click event to flag a tile
    handleRightClick(indexX, indexY) {
        return (e) => {
            e.preventDefault()
            this.setState({ flagged: !this.state.flagged })
        }
    }

    render() {
        return (
            <div className={this.state.revealed ? 'tile revealed val-' + this.props.value : this.state.flagged ?  'tile flag' : 'tile'} onClick={this.handleLeftClick()} onContextMenu={this.handleRightClick()}></div>
        )
    }
}

export default Tile