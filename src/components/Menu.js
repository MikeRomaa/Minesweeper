import React, { Component } from 'react'
import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles';

const CustomSlider = withStyles({
    root: {
        color: '#E67E22',
    },
    thumb: {
        height: 24,
        width: 24,
        marginTop: -8,
        marginLeft: -12,
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider)

class Menu extends Component {

    constructor(props) {
        super(props)
        this.width = 10
        this.height = 10
        this.nukes = 20
    }

    render() {
        return (
            <React.Fragment>
                <p>Width</p>
                <CustomSlider
                    onChange={(e, newValue) => { this.width = newValue; this.props.updateGame(this.width, this.height, this.nukes) }}
                    defaultValue={10}
                    min={4}
                    max={70}
                    valueLabelDisplay="auto"
                />
                <p>Height</p>
                <CustomSlider
                    onChange={(e, newValue) => { this.height = newValue; this.props.updateGame(this.width, this.height, this.nukes) }}
                    defaultValue={10}
                    min={4}
                    max={25}
                    valueLabelDisplay="auto"
                />
                <p>Nukes</p>
                <CustomSlider
                    onChange={(e, newValue) => { this.nukes = newValue; this.props.updateGame(this.width, this.height, this.nukes) }}
                    defaultValue={20}
                    min={1}
                    max={this.width * this.height - 9}
                    valueLabelDisplay="auto"
                />
            </React.Fragment>
        )
    }
}

export default Menu