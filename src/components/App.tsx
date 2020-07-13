import React, { Component } from 'react';
import Schedule from './Schedule';
import TimeZone from './Schedule';
import Spl2Api from '../api/spla2api'
import spla2api from '../api/spla2api';

interface IState { api: spla2api }

class App extends Component {
  state: IState;

  constructor(props){
    super(props);
    this.state = { api : new spla2api("") }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default App;

// APP api所持
//--MatchList spl2_match
//---TimeZone base_match[] 
//----Schedule rule_ex maps_ex