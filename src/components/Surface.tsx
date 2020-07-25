import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
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
        this.setState({ isDisplayBattle: true });
    };

    onChangeCoop = () => {
        this.setState({ isDisplayBattle: false });
    };

    render() {
        return (
            <>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "15px 0 10px 0"
                }}>
                    <Button variant="contained" size="large" onClick={this.onChangeBattle}>
                        <p style={{ margin: "0", color: "green" }}>Battle</p>
                    </Button>
                    <Button variant="contained" size="large" onClick={this.onChangeCoop}>
                        <p style={{ margin: "0", color: "orange" }}>SalmonRun</p>
                    </Button>
                    <FormControlLabel
                        label="Floating"
                        labelPlacement="bottom"
                        control={<Switch />}
                    />
                </div>


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
            // AppBarを固定するかのボタン
            // 一番上にスクロールするボタン
        )
    }
}

export default Surface;

