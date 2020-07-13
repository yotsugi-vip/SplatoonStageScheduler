import React, { Component } from 'react';

// APP api所持
//--MatchList spl2_match
//---TimeZone base_match[] 
//----Schedule base_match

interface IState_ML { match_data: spl2_match }
interface IProps_ML { match_data: spl2_match }
class MatchList extends Component {
  state: IState_ML;
  props: IProps_ML;
  constructor(props: IProps_ML) {
    super(props);
    this.state = { match_data: this.props.match_data }
    console.log(this.props.match_data);
  }

  render() {
    return (
      // APIから時間帯別のリストを必要分生成
      <>
        <TimeZone base_match={this.state.match_data.result.gachi} />
      </>
    )
  }
}

interface IState_TZ { base_match: base_match[] }
interface IProps_TZ { base_match: base_match[] }
class TimeZone extends Component {
  state: IState_TZ;
  props: IProps_TZ;

  constructor(props: IProps_TZ) {
    super(props);
    this.state = { base_match: this.props.base_match }
    console.log(this.props.base_match);
  }

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
          <li style={{ width: "233px" }}><Schedule base_match={this.state.base_match[0]} result="レギュラー" /></li>
          <li style={{ width: "233px" }}><Schedule base_match={this.state.base_match[1]} result="ガチマッチ" /></li>
          <li style={{ width: "233px" }}><Schedule base_match={this.state.base_match[2]} result="リーグマッチ" /></li>
        </ul>
      </div>
    )
  }
}

interface IState_S { base_match: base_match, result: string }
interface IProps_S { base_match: base_match, result: string }
class Schedule extends Component {
  state: IState_S;
  props: IProps_S;
  constructor(props: base_match) {
    super(props);
    this.state = { base_match: this.props.base_match, result: "-----" };
  }

  render() {
    return (
      <div style={{ border: "solid 2px" }}>
        <p style={{ fontSize: "16px" }}>{this.state.result}</p>
        <p style={{ fontSize: "12px" }}>{this.state.base_match.rule_ex.name}</p>
        <MapImage map_ex={this.state.base_match.maps_ex} />
        <p style={{ fontSize: "12px" }}>{this.state.base_match.maps_ex[0].name}</p>
        <p style={{ fontSize: "12px" }}>{this.state.base_match.maps_ex[1].name}</p>
      </div>
    )
  }
}

const dummy_img: string = "https://placehold.jp/200x130.png";
interface IState_MI { map_ex: maps_ex[] }
interface IProps_MI { map_ex: maps_ex[] }
class MapImage extends Component {
  state: IState_MI;
  props: IProps_MI;
  constructor(props: IState_MI) {
    super(props);
    this.state = { map_ex: this.props.map_ex };
  }

  checkChash(): string {
    // キャッシュを確認する。
    return dummy_img;
  }

  render() {
    return <img src={this.checkChash()} alt="stage image" />
  }
}

export default MatchList;
