import React, { Component } from 'react'
import Menu from './Menu.js'
import Game from './Game.js'

class App extends Component {

    constructor(props) {
        super(props)
        this.key = 1
    }

    state = {
        "width": 10,
        "height": 10,
        "nukes": 20
    }

    updateGame = (menuWidth, menuHeight, menuNukes) => {
        this.setState({ width: menuWidth, height:menuHeight, nukes:menuNukes })
        this.key++
    }

    render() {
        return (
            <div class="p-5">
                <Menu updateGame={this.updateGame} />
                <Game key={this.key} width={this.state.width} height={this.state.height} nukes={this.state.nukes} />
            </div>
        )
    }
}

export default App