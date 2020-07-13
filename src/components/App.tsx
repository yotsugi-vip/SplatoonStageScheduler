import React, { Component } from 'react';
import Schedule from './Schedule';
import TimeZone from './Schedule';
import Spl2Api from '../api/spla2api'
import spla2api from '../api/spla2api';
import MatchList from './Schedule';

interface IState_APP { api: spla2api }
class App extends Component {
  state: IState_APP;
  constructor(props) {
    super(props);
    this.state = { api: new spla2api("") }
  }

  render() {
    return (
      <MatchList match_data={this.state.api.getMatchSchedule_debug()} />
    )
  }
}

export default App;