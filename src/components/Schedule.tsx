import React, { Component } from 'react';
import * as picture from './picture';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import ika from '../picture/ika.png';
import Button from '@material-ui/core/Button';
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

  scrollTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <div style={{ marginBottom: "10px" }}>
          {this.state.match_data.result.regular.map((match, i) => (
            <TimeZone regular={match} gachi={this.state.match_data.result.gachi[i]} league={this.state.match_data.result.league[i]} key={i} />
          ))}
        </div>
        <Button onClick={this.scrollTop}
          style={{
            position: "fixed",
            bottom: "10px",
            right: "5px"
          }}
        >
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li><img src={ika} style={{ height: "50px", width: "auto" }} /></li>
            <li><p style={{ margin: "0", color: "#ff00ff", WebkitTextStroke: "0.5px white", fontWeight: "bolder" }}>TOP</p></li>
          </ul>
        </Button>
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
        margin: "2%",
      }}>
        <Paper style={{ backgroundColor: "#f5f5f5" }}>
          <div style={{
            textAlign: "center",
          }}>
            <p style={{
              fontSize: "20px",
              fontWeight: "bolder",
              margin: "0"
            }}>{this.start_time}:00 ～ {this.end_time}:00</p>
            <ul style={{
              display: "flex",
              justifyContent: "space-around",
              listStyleType: "none",
              paddingLeft: "0",
              margin: "0"
            }}>
              <li style={{ width: "233px" }}><Schedule base_match={this.state.regular} rule="レギュラーマッチ" /></li>
              <li style={{ width: "233px" }}><Schedule base_match={this.state.gachi} rule="ガチマッチ" /></li>
              <li style={{ width: "233px" }}><Schedule base_match={this.state.league} rule="リーグマッチ" /></li>
            </ul>
          </div>
        </Paper>
      </div>
    )
  }
}

import gachi_img from '../picture/gachi.png';
import nawabari_img from '../picture/nawabari.png';
import league_img from '../picture/league.png';
import hoko_img from '../picture/hoko.png';
import asari_img from '../picture/asari.png';
import tower_img from '../picture/tower.png';
import area_img from '../picture/area.png';

const img_style: React.CSSProperties = {
  width: "50px",
  height: "auto",
  padding: "0",
}

const p_style: React.CSSProperties = {
  fontSize: "12px",
  margin: "0"
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
    a.margin = "0";
    if (ruleName === "レギュラーマッチ") {
      a.color = "rgb(134, 223, 2)";
    } else if (ruleName === "ガチマッチ") {
      a.color = "orangered";
    } else {
      a.color = "rgb(255, 0, 106)";
    }
    return a;
  }

  getIcon(ruleName: string): string {
    let src: string;

    if (ruleName === "レギュラーマッチ") {
      src = nawabari_img;
    } else if (ruleName === "ガチマッチ") {
      src = gachi_img;
    } else if (ruleName === "リーグマッチ") {
      src = league_img;
    } else if (ruleName === "ガチホコバトル") {
      src = hoko_img;
    } else if (ruleName === "ガチエリア") {
      src = area_img;
    } else if (ruleName === "ガチヤグラ") {
      src = tower_img;
    } else if (ruleName === "ガチアサリ") {
      src = asari_img;
    } else {
      src = null;
    }

    return src;
  }


  render() {
    return (
      <Card style={{ marginBottom: "8px" }}>
        <div style={{ backgroundColor: "rgba(240,240,240,0.15)" }}>
          <div style={{
            padding: "5px 0 0 0",
            display: "flex",
            justifyContent: "space-around",
          }}>
            {this.state.rule === "レギュラーマッチ"
              ?
              <img src={this.getIcon(this.state.rule)} style={img_style} />
              :
              <>
                <img src={this.getIcon(this.state.rule)} style={img_style} />
                <img src={this.getIcon(this.state.base_match.rule_ex.name)} style={img_style} />
              </>
            }
          </div>
          <p style={this.getStyle(this.state.rule)}>{this.state.rule}</p>
          <p style={p_style}>{this.state.base_match.rule_ex.name}</p>
          <MapImage map_ex={this.state.base_match.maps_ex} />
          <p style={p_style}>{this.state.base_match.maps_ex[0].name}</p>
          <p style={p_style}>{this.state.base_match.maps_ex[1].name}</p>
        </div >
      </Card>
    )
  }
}

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
    return (
      <>
        {
          this.state.map_ex.map((map, i) => (
            <img src={this.getStageImage(map.name)}
              style={i == 0 ? { width: "200px", height: "130px", clipPath: " polygon(99% 0, 0 99%, 0 0)", position: "absolute" }
                : { width: "200px", height: "130px", clipPath: "polygon(100% 1%, 1% 100%, 100% 100%)" }}
              alt="stage image" key={i} />
          ))
        }
      </>
    )
  }
}

export default MatchList;
