"use strict";
var fs = require("fs");
var log4js = require("log4js");

const { app } = require("electron").remote;
const cache_path = `${app.getPath("userData")}/img_cache`;
const schedule_path = `${app.getPath("userData")}/schedule.json`;
var log = null;
var log_cache = null;

function initializeLog() {
  log4js.configure({
    appenders: {
      trace: { type: "file", filename: `${app.getPath("userData")}/trace.log` },
      cache: { type: "file", filename: `${app.getPath("userData")}/trace.log` }
    },
    categories: {
      default: { appenders: ["trace"], level: "trace" },
      cache: { appenders: ["cache"], level: "trace" }
    }
  });
  log = log4js.getLogger("trace");
  log_cache = log4js.getLogger("cache");
  log.info("----- application startup -----");
}

function isExist(path, name) {
  try {
    fs.statSync(path);
    log_cache.info(`${name}は存在します`);
    return true;
  } catch (e) {
    log_cache.info(`${name}は存在しません`);
    return false;
  }
}

async function checkCache(name, url) {
  if (!isExist(`${cache_path}/${name}.png`, name)) {
    var response = await fetch(url);
    var buff = await response.arrayBuffer();
    var uIntBuff = new Uint8Array(buff);
    fs.writeFileSync(`${cache_path}/${name}.png`, uIntBuff, "binary");
  }
  return `${cache_path}/${name}.png`;
}

async function getSchedule() {
  var needDl = true;
  if (isExist(schedule_path, "スケジュールデータ")) {
    var file = fs.readFileSync(schedule_path, "utf8");
    var schedule = JSON.parse(file);
    var battleSchedule = Date.parse(schedule.result.regular[0].end_utc);
    var now = Date.parse(new Date());

    //現在〜24時間のスケジュールを取得しているので、現在のレギュラーマッチ時間帯から判断
    if (battleSchedule > now) {
      log_cache.info("最新のスケジュールデータ");
      needDl = false;
    } else {
      log_cache.info("古いスケジュールデータ");
    }
  } else {
    log_cache.info("スケジュールデータが存在しません");
  }

  if (needDl) {
    var spl = "https://spla2.yuu26.com/schedule";
    var option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "yotugi(email:dev01.topaz+sss@gmail.com)"
      }
    };

    log_cache.info("最新のスケジュールデータを取得");
    var response = await fetch(spl, option);
    var body = await response.json();
    fs.writeFileSync(schedule_path, JSON.stringify(body, null, "\t"), "utf8");
  } else {
    log_cache.info("最新のデータのため、更新は行いません");
  }
}

async function makeSchedule() {
  var content = document.getElementById("template").content;
  var fragment = document.createDocumentFragment();

  var file = fs.readFileSync(schedule_path, "utf8");
  var schedule = JSON.parse(file);

  for (var cnt = 0; cnt < 11; cnt++) {
    var time = content.querySelector(".timeZone");
    var regular = content.querySelector(".regular");
    var gachi = content.querySelector(".gachi");
    var league = content.querySelector(".league");

    // 開催時間設定
    var end = new Date(Date.parse(schedule.result.regular[cnt].end));
    var start = new Date(Date.parse(schedule.result.regular[cnt].start));
    time.textContent = `${start.getHours()}:00 〜 ${end.getHours()}:00`;

    //レギュラーマッチ
    var ruler = regular.querySelector(".rule_regular");
    var img1r = regular.querySelector(".stage1");
    var img2r = regular.querySelector(".stage2");
    var stageName1r = regular.querySelector(".stageName1");
    var stageName2r = regular.querySelector(".stageName2");

    ruler.textContent = `${schedule.result.regular[cnt].rule}`;
    img1r.src = await checkCache(
      schedule.result.regular[cnt].maps[0],
      schedule.result.regular[cnt].maps_ex[0].image
    );
    img2r.src = await checkCache(
      schedule.result.regular[cnt].maps[1],
      schedule.result.regular[cnt].maps_ex[1].image
    );
    stageName1r.textContent = `${schedule.result.regular[cnt].maps[0]}`;
    stageName2r.textContent = `${schedule.result.regular[cnt].maps[1]}`;

    //ガチ
    var ruleg = gachi.querySelector(".rule_gachi");
    var img1g = gachi.querySelector(".stage1");
    var img2g = gachi.querySelector(".stage2");
    var stageName1g = gachi.querySelector(".stageName1");
    var stageName2g = gachi.querySelector(".stageName2");

    ruleg.textContent = `${schedule.result.gachi[cnt].rule}`;
    img1g.src = await checkCache(
      schedule.result.gachi[cnt].maps[0],
      schedule.result.gachi[cnt].maps_ex[0].image
    );
    img2g.src = await checkCache(
      schedule.result.gachi[cnt].maps[1],
      schedule.result.gachi[cnt].maps_ex[1].image
    );
    stageName1g.textContent = `${schedule.result.gachi[cnt].maps[0]}`;
    stageName2g.textContent = `${schedule.result.gachi[cnt].maps[1]}`;

    //リーグ
    var rulel = league.querySelector(".rule_league");
    var img1l = league.querySelector(".stage1");
    var img2l = league.querySelector(".stage2");
    var stageName1l = league.querySelector(".stageName1");
    var stageName2l = league.querySelector(".stageName2");

    rulel.textContent = `${schedule.result.league[cnt].rule}`;
    img1l.src = await checkCache(
      schedule.result.league[cnt].maps[0],
      schedule.result.league[cnt].maps_ex[0].image
    );
    img2l.src = await checkCache(
      schedule.result.league[cnt].maps[1],
      schedule.result.league[cnt].maps_ex[1].image
    );
    stageName1l.textContent = `${schedule.result.league[cnt].maps[0]}`;
    stageName2l.textContent = `${schedule.result.league[cnt].maps[1]}`;

    var clone = document.importNode(content, true);
    fragment.appendChild(clone);
  }
  document.body.appendChild(fragment);
}

async function excecMain() {
  initializeLog();
  try{
    if (!isExist(cache_path, "キャッシュフォルダ")) {
      fs.mkdirSync(cache_path);
    }
    await getSchedule();
    await makeSchedule();
  }catch(e){
    log.error(e);
  }
}

excecMain();
