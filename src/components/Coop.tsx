import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

import shekena from '../picture/シェケナダム.png';
import tokisirazu from '../picture/トキシラズいぶし工房.png';
import shaketoba from '../picture/海上集落シャケト場.png';
import donburako from '../picture/難破船ドン・ブラコ.png';
import polaris from '../picture/朽ちた箱舟 ポラリス.png';

import a from '../picture/tmp/スプラチャージャー.png';

interface IProps_APP { base_coop: spl2_coop }
interface IState_APP { base_coop: spl2_coop }
class Coop extends Component {
    state: IState_APP;
    props: IProps_APP;

    constructor(props: IProps_APP) {
        super(props);
        this.state = { base_coop: this.props.base_coop }
    }

    getStage(name: string): string {
        let ret: string;

        if (name === "シェケナダム") {
            ret = shekena;
        } else if (name === "トキシラズいぶし工房") {
            ret = tokisirazu;
        } else if (name === "海上集落シャケト場") {
            ret = shaketoba;
        } else if (name === "難破船ドン・ブラコ") {
            ret = donburako;
        } else if (name === "朽ちた箱舟 ポラリス") {
            ret = polaris;
        } else {
            ret = null;
        }
        return ret;
    }

    render() {
        return (
            <div>
                {this.state.base_coop.result.map((base_coop, i) => (
                    <div key={i} style={{ marginBottom: "10px" }}>
                        <Card>
                            <CardHeader
                                title={new Date(base_coop.start).getHours().toString() + ":00 ～ " + new Date(base_coop.end).getHours() + ":00"}
                                subheader={base_coop.stage !== null ? base_coop.stage.name : "不明"}
                            />
                            {base_coop.weapons !== null
                                ?
                                <CardMedia
                                    style={{ height: "auto", paddingTop: "10%" }}
                                    image={this.getStage(base_coop.stage.name)}
                                    title="stage"
                                >
                                    {base_coop.weapons.map((weapon, i) => (
                                        <div key={weapon.name + i} style={{ display: "flex" }}>
                                            <img src={a} alt="buki" style={{
                                                height: "50px",
                                                width: "auto",
                                                clipPath: "circle(50% at 50% 50%)"
                                            }} />
                                            <p style={{
                                                WebkitTextStroke: "0.5px white",
                                                fontWeight: "bold",
                                                marginLeft: "5px",
                                                verticalAlign: "middle"
                                            }}
                                            >
                                                {weapon.name}
                                            </p>
                                        </div>
                                    ))}
                                </CardMedia>
                                :
                                <div />
                            }
                        </Card>
                    </div>
                ))}

            </div>
        )
    }
}

export default Coop;