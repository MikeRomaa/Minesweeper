import React from 'react'

class Tile extends React.Component {
    state = {}

    render() {
        return <div className="tile">{this.props.mine}</div>
    }
}

export default Tile