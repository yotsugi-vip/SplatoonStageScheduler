import React, { Component } from 'react';
import * as picture from './picture';
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
        {this.state.match_data.result.regular.map((match, i) => (
          <TimeZone regular={match} gachi={this.state.match_data.result.gachi[i]} league={this.state.match_data.result.league[i]} />
        ))}
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

  getStyle(ruleName: string): React.CSSProperties {
    let a: React.CSSProperties;
    a = { fontSize: "16px" };

    if (ruleName === "レギュラーマッチ") {
      a.color = "rgb(134, 223, 2)";
    } else if (ruleName === "ガチマッチ") {
      a.color = "orangered";
    } else {
      a.color = "rgb(255, 0, 106)";
    }

    return a;

  }

  render() {
    return (
      <div style={{ border: "solid 2px", backgroundColor: "rgba(240,240,240,0.15)" }}>
        <p style={this.getStyle(this.state.rule)}>{this.state.rule}</p>
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

  _checkImgChash(): string {
    // キャッシュを確認する。
    //return dummy_img;
    return picture.stage(this.state.map_ex[0].name);
  }

  getStageImage(stageName: string): string {
    return picture.stage(stageName);
  }

  render() {
    return (<>{
      this.state.map_ex.map((map, i) => (
        <img src={this.getStageImage(map.name)}
          style={i == 0 ? { width: "200px", height: "130px", clipPath: " polygon(99% 0, 0 99%, 0 0)", position: "absolute" }
            : { width: "200px", height: "130px", clipPath: "polygon(100% 1%, 1% 100%, 100% 100%)" }}
          alt="stage image" />
      ))
    }</>)

    //return <img src={this.checkImgChash()} style={{ width: "200px", height: "130px" }} alt="stage image" />
  }
}

export default MatchList;
