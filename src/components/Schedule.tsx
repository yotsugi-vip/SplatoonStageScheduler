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
  }

  render() {
    return (
      // APIから時間帯別のリストを必要分生成する方法が思いつかない
      <>
        <TimeZone gachi={this.state.match_data.result.gachi[0]} league={this.state.match_data.result.league[0]} regular={this.state.match_data.result.regular[0]} />
        <TimeZone gachi={this.state.match_data.result.gachi[1]} league={this.state.match_data.result.league[1]} regular={this.state.match_data.result.regular[1]} />
        <TimeZone gachi={this.state.match_data.result.gachi[2]} league={this.state.match_data.result.league[2]} regular={this.state.match_data.result.regular[2]} />
        <TimeZone gachi={this.state.match_data.result.gachi[3]} league={this.state.match_data.result.league[3]} regular={this.state.match_data.result.regular[3]} />
        <TimeZone gachi={this.state.match_data.result.gachi[4]} league={this.state.match_data.result.league[4]} regular={this.state.match_data.result.regular[4]} />
        <TimeZone gachi={this.state.match_data.result.gachi[5]} league={this.state.match_data.result.league[5]} regular={this.state.match_data.result.regular[5]} />
        <TimeZone gachi={this.state.match_data.result.gachi[6]} league={this.state.match_data.result.league[6]} regular={this.state.match_data.result.regular[6]} />
        <TimeZone gachi={this.state.match_data.result.gachi[7]} league={this.state.match_data.result.league[7]} regular={this.state.match_data.result.regular[7]} />
        <TimeZone gachi={this.state.match_data.result.gachi[8]} league={this.state.match_data.result.league[8]} regular={this.state.match_data.result.regular[8]} />
        <TimeZone gachi={this.state.match_data.result.gachi[9]} league={this.state.match_data.result.league[9]} regular={this.state.match_data.result.regular[9]} />
        <TimeZone gachi={this.state.match_data.result.gachi[10]} league={this.state.match_data.result.league[10]} regular={this.state.match_data.result.regular[10]} />
        <TimeZone gachi={this.state.match_data.result.gachi[11]} league={this.state.match_data.result.league[11]} regular={this.state.match_data.result.regular[11]} />
      </>
    )
  }
}

interface IState_TZ { gachi: base_match, regular: base_match, league: base_match }
interface IProps_TZ { gachi: base_match, regular: base_match, league: base_match }
class TimeZone extends Component {
  state: IState_TZ;
  props: IProps_TZ;
  start_time: Number;
  end_time: Number;

  constructor(props: IProps_TZ) {
    super(props);
    this.state = {
      gachi: this.props.gachi,
      league: this.props.league,
      regular: this.props.regular
    };
    this.start_time = new Date(this.props.regular.start).getHours();
    this.end_time = new Date(this.props.regular.end).getHours();
  }

  render() {
    return (
      <div style={{
        textAlign: "center",
        border: "solid 2px",
        margin: "8px"
      }}>
        <p>{this.start_time}:00 ~ {this.end_time}:00</p>
        <ul style={{
          display: "flex",
          justifyContent: "space-around",
          listStyleType: "none",
          paddingLeft: "0"
        }}>
          <li style={{ width: "233px" }}><Schedule base_match={this.state.regular} rule="レギュラーマッチ" /></li>
          <li style={{ width: "233px" }}><Schedule base_match={this.state.gachi} rule="ガチマッチ" /></li>
          <li style={{ width: "233px" }}><Schedule base_match={this.state.league} rule="リーグマッチ" /></li>
        </ul>
      </div>
    )
  }
}

interface IState_S { base_match: base_match, rule: string }
interface IProps_S { base_match: base_match, rule: string }
class Schedule extends Component {
  state: IState_S;
  props: IProps_S;
  constructor(props: base_match) {
    super(props);
    this.state = { base_match: this.props.base_match, rule: this.props.rule };
  }

  render() {
    return (
      <div style={{ border: "solid 2px" }}>
        <p style={{ fontSize: "16px" }}>{this.state.rule}</p>
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

  checkImgChash(): string {
    // キャッシュを確認する。
    return dummy_img;
  }

  render() {
    return <img src={this.checkImgChash()} alt="stage image" />
  }
}

export default MatchList;
