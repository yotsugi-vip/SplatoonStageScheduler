import React, { Component } from 'react';
import spla2api from '../api/spla2api';
import MatchList from './Schedule';
import app from 'electron';
import Surface from './Surface';
import Coop from './Coop';
import ika from '../picture/ika.png';
import Button from '@material-ui/core/Button';

const cache_path = app.remote.app.getPath("userData");


interface IState_APP { api: spla2api }
class App extends Component {
  state: IState_APP;
  constructor(props) {
    super(props);
    this.state = { api: new spla2api(cache_path) }
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Surface
          coop={<Coop base_coop={this.state.api.getCoopSchedule_debug()} />}
          match={<MatchList match_data={this.state.api.getMatchSchedule_debug()} />}
        />
        <Button onClick={this.scrollTop}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "5px"
          }}
        >
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li><img src={ika} style={{ height: "50px", width: "auto" }} /></li>
            <li><p style={{ margin: "0", color: "#ff00ff", WebkitTextStroke: "0.5px white", fontWeight: "bolder" }}>TOP</p></li>
          </ul>
        </Button>
      </div>
    )
  }
}

export default App;