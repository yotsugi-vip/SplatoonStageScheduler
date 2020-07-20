import React, { Component } from 'react';
import spla2api from '../api/spla2api';
import MatchList from './Schedule';
import back from '../picture/back_normal.jpg';
import app from 'electron';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import HomeIcon from '@material-ui/icons/Home';

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
      <>
        <AppBar position="static">
          <Tabs>
            <Tab label="Battle" icon={<HomeIcon />}></Tab>
            <Tab label="Salmon Run" icon={<RestaurantMenuIcon />}></Tab>
          </Tabs>
        </AppBar>
        <div style={{
          backgroundImage: `url(${back})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}>
          <MatchList match_data={this.state.api.getMatchSchedule_debug()} />
        </div>
      </>
    )
  }
}

export default App;