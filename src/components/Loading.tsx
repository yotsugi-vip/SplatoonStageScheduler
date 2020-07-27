import React, { Component } from 'react';
import Ika from '../picture/ika.png';

interface LoadState {
    time: Date,
    event: number,
    ika_y: number
};

class Loading extends Component {
    state: LoadState;
    constructor(props) {
        super(props);
        this.state = { time: new Date, event: null, ika_y: 0 };
    }

    componentDidMount() {
        let num = window.setInterval(() => this.thick(), 100);
        this.setState({ event: num });
    }

    componentWillUnmount() {
        window.clearInterval(this.state.event);
    }

    thick() {
        this.setState({ time: new Date, });
    }

    calc(): string {
        let ret = this.state.time.getMilliseconds() / 1000;
        return ret.toString();
    }


    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: "#FF00FF", fontSize: '30px', padding:'0', margin:'0' }}>Now Loading</p>
                <img src={Ika} alt="ika" style={{ opacity: this.calc(), padding: '0', margin: '0' }} />
            </div>
        )
    }
}

export default Loading;