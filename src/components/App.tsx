import React, { Component } from 'react';
import spla2api from '../api/spla2api';
import MatchList from './Schedule';
import Surface from './Surface';
import Coop from './Coop';


interface IState_APP { api: spla2api }
class App extends Component {
  state: IState_APP;
  constructor(props) {
    super(props);
    this.state = { api: new spla2api() }
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