import React, { Component } from 'react';
import spl2api from '../api/spla2api';
import spla2api from '../api/spla2api';


class Schedule extends Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <div style={{ border: "solid 2px" }}>
        <p style={{ fontSize: "16px" }}>〇〇〇〇マッチ</p>
        <p style={{ fontSize: "12px" }}>ルール名</p>
        <img src="https://placehold.jp/200x130.png" alt="dummy" />
        <p style={{ fontSize: "12px" }}>ステージ1</p>
        <p style={{ fontSize: "12px" }}>ステージ2</p>
      </div>
    )
  }
}

class TimeZone extends Component {
  render() {
    return (
      <div style={{
        textAlign: "center",
        border: "solid 2px",
        margin: "8px"
      }}>
        <p>XX:XX ～ XX:XX</p>
        <ul style={{
          display: "flex",
          justifyContent: "space-around",
          listStyleType: "none",
          paddingLeft: "0"
        }}>
          <li style={{ width: "233px" }}><Schedule /></li>
          <li style={{ width: "233px" }}><Schedule /></li>
          <li style={{ width: "233px" }}><Schedule /></li>
        </ul>
      </div>
    )
  }
}

interface Istate { api : spl2api }
class MatchList extends Component {
  state : Istate;
  constructor(props) {
    super(props);
    this.state = { api: new spl2api("") }
  }

  render() {
    return (
      // APIから時間帯別のリストを必要分生成
      <>
        <TimeZone />
      </>
    )
  }
}

export default TimeZone;
