import React, { Component } from 'react';
import spla2api from '../api/spla2api';
import MatchList from './Schedule';
import Surface from './Surface';
import Coop from './Coop';
import Loading from './Loading';

const api = new spla2api();

interface IState_APP { match: spl2_match, coop: spl2_coop };
class App extends Component {
  state: IState_APP;
  constructor(props) {
    super(props);
    this.state = { coop: null, match: null };
  }


  async componentDidMount() {
    const m = await api.getMatchSchedule();
    const c = await api.getCoopSchedule();
    this.setState({
      match: m,
      coop: c
    });
  }


  render() {
    return (
      <div>
        {this.state.coop && this.state.match ?
          <Surface
            coop={<Coop base_coop={this.state.coop} api={api} />}
            match={<MatchList match_data={this.state.match} />}
          />
          :
          <Loading />
        }
      </div>
    )
  }
}

export default App;