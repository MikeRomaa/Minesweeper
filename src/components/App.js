import React, { Component } from 'react'
import Menu from './Menu.js'
import Game from './Game.js'

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Menu />
                <Game width="10" height="10" nukes="20" />
            </React.Fragment>
        )
    }
}

export default App