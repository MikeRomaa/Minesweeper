import React from 'react'
import Menu from './Menu.js'
import Game from './Game.js'

class App extends React.Component {
    state = {}

    render() {
        return (
            <React.Fragment>
                <Menu />
                <Game width="9" height="9" mines="10" />
            </React.Fragment>
        )
    }
}

export default App