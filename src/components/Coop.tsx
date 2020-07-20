import React, { Component } from 'react';

interface IProps_APP { base_coop: spl2_coop }
interface IState_APP { base_coop: spl2_coop }
class Coop extends Component {
    state: IState_APP;
    props: IProps_APP;
    constructor(props: IProps_APP) {
        super(props);
        this.state = { base_coop: this.props.base_coop }
    }

    render() {
        return (
            <>
                {this.state.base_coop.result.map((base_coop, i) => (
                    <div key={i}>
                        <p>{base_coop.start}:00～{base_coop.end}</p>
                        {base_coop.stage
                            ? <p>{base_coop.stage.name}</p>
                            : <div />
                        }
                        {base_coop.weapons
                            ? base_coop.weapons.map(weapon => (
                                <div><p>{weapon.name}</p></div>))
                            : <div />
                        }
                    </div>))
                }
            </>
        )
    }
}

export default Coop;