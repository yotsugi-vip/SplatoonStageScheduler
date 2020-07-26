import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

interface IState {
    isDisplayBattle: Boolean
};

interface IProps {
    coop: React.ReactElement;
    match: React.ReactElement;
}

class Surface extends Component {
    state: IState;
    props: IProps;
    constructor(props: IProps) {
        super(props);
        this.state = {
            isDisplayBattle: true
        };
    }

    onChangeBattle = () => {
        if (!this.state.isDisplayBattle) window.scrollTo(0, 0);
        this.setState({ isDisplayBattle: true });
    };

    onChangeCoop = () => {
        if (this.state.isDisplayBattle) window.scrollTo(0, 0);
        this.setState({ isDisplayBattle: false });
    };

    render() {
        return (
            <>
                <AppBar position="sticky" style={{ backgroundColor: "#f5f5f5" }}>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "5px",
                        marginBottom: "10px"
                    }}>
                        <Button variant="contained" size="large" onClick={this.onChangeBattle} style={{ padding: "0" }}>
                            <p style={{ margin: "0", color: "green" }}>Battle</p>
                        </Button>
                        <Button variant="contained" size="large" onClick={this.onChangeCoop} style={{ padding: "0" }}>
                            <p style={{ margin: "0", color: "orange" }}>SalmonRun</p>
                        </Button>
                    </div>
                </AppBar>


                {this.state.isDisplayBattle
                    ?
                    <div>
                        {this.props.match}
                    </div>
                    :
                    <div style={{
                        margin: "0 10% 0 10%"
                    }}>
                        {this.props.coop}
                    </div>
                }
            </>
        )
    }
}

export default Surface;

