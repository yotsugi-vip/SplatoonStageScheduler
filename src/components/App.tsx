import React, { Component } from 'react';
import spla2api from '../api/spla2api';
import MatchList from './Schedule';
import app from 'electron';
import Surface from './Surface';
import Coop from './Coop';


const cache_path = app.remote.app.getPath("userData");


interface IState_APP { api: spla2api }
class App extends Component {
  state: IState_APP;
  constructor(props) {
    super(props);
    this.state = { api: new spla2api(cache_path) }
  }

  render() {
    return (
      <div>
        <Surface
          coop={<Coop base_coop={this.state.api.getCoopSchedule()} api={this.state.api} />}
          match={<MatchList match_data={this.state.api.getMatchSchedule()} />}
        />
      </div>
    )
  }
}

export default App;