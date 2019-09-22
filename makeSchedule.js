'use strict'
var fs = require('fs');
var fetch = require('node-fetch');


async function checkCache( name, url ) {
    try {
        fs.statSync(`cache/${name}.png`);
    } catch { 
        var response = await fetch(url);
        var buff     = await response.arrayBuffer();
        var uIntBuff = new Uint8Array(buff);
        fs.writeFileSync(`cache/${name}.png`, uIntBuff, 'binary');
    }
    return `cache/${name}.png`;
}

async function getSchedule(){

    var needDl = true;
    try{
        fs.statSync('cache/schedule.json');
        var file = fs.readFileSync('cache/schedule.json', 'utf8');
        var schedule = JSON.parse(file);
        var battleSchedule = Date.parse(schedule.result.regular[0].end_utc);
        var now    =  Date.parse(new Date());

        //現在〜24時間のスケジュールを取得しているので、現在のレギュラーマッチ時間帯から判断
        if( battleSchedule > now ) {
            console.log('最新のスケジュールデータ');
            needDl = false;
        }else{
            console.log('古いスケジュールデータ')
        }
    }catch{
        console.log('スケジュールデータが存在しません')
    }

    if(needDl) {
        var spl = 'https://spla2.yuu26.com/schedule'; 
        var option = {
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                'User-Agent':'yotugi(email:harukipdr@gmail.com)'
            }
        }
        
        var response = await fetch( spl, option);
        var body = await response.json(); 

        try{
            fs.writeFileSync( "cache/schedule.json", JSON.stringify( body, null, '\t' ) );
        }catch(e){
            console.log(e);
        }
 
    }else{
        console.log("最新のデータのため、更新は行いません")
    }
}

async function makeSchedule(){

    var content  = document.getElementById('template').content;
    var fragment = document.createDocumentFragment();

    var file = fs.readFileSync('cache/schedule.json', 'utf8');
    var schedule = JSON.parse(file);
    
    for( var cnt = 0; cnt < 11; cnt++ ) {
        var time    = content.querySelector('.timeZone');
        var regular = content.querySelector('.regular');
        var gachi   = content.querySelector('.gachi');
        var league  = content.querySelector('.league');

        // 開催時間設定

        console.log(cnt);
        console.log(schedule.result.regular[cnt].end);
        var a = schedule.result.regular[cnt].end;
        var end   = new Date( Date.parse(schedule.result.regular[cnt].end )  );
        var start = new Date( Date.parse(schedule.result.regular[cnt].start) );
        time.textContent = `${start.getHours()}:00 〜 ${end.getHours()}:00`;

        //レギュラーマッチ
        var ruler    = regular.querySelector('.rule_regular');
        var img1r    = regular.querySelector('.stage1');
        var img2r    = regular.querySelector('.stage2');
        var stageName1r = regular.querySelector('.stageName1');
        var stageName2r = regular.querySelector('.stageName2');

        ruler.textContent = `${schedule.result.regular[cnt].rule}`;
        img1r.src  = await checkCache( schedule.result.regular[cnt].maps[0], schedule.result.regular[cnt].maps_ex[0].image );
        img2r.src  = await checkCache( schedule.result.regular[cnt].maps[1], schedule.result.regular[cnt].maps_ex[1].image );
        stageName1r.textContent = `${schedule.result.regular[cnt].maps[0]}`;
        stageName2r.textContent = `${schedule.result.regular[cnt].maps[1]}`;

        //ガチ
        var ruleg    = gachi.querySelector('.rule_gachi');
        var img1g    = gachi.querySelector('.stage1');
        var img2g    = gachi.querySelector('.stage2');
        var stageName1g = gachi.querySelector('.stageName1');
        var stageName2g = gachi.querySelector('.stageName2');

        ruleg.textContent = `${schedule.result.gachi[cnt].rule}`;
        img1g.src  = await checkCache( schedule.result.gachi[cnt].maps[0], schedule.result.gachi[cnt].maps_ex[0].image );
        img2g.src  = await checkCache( schedule.result.gachi[cnt].maps[1], schedule.result.gachi[cnt].maps_ex[1].image );
        stageName1g.textContent = `${schedule.result.gachi[cnt].maps[0]}`;
        stageName2g.textContent = `${schedule.result.gachi[cnt].maps[1]}`;


        //リーグ
        var rulel    = league.querySelector('.rule_league');
        var img1l    = league.querySelector('.stage1');
        var img2l    = league.querySelector('.stage2');
        var stageName1l = league.querySelector('.stageName1');
        var stageName2l = league.querySelector('.stageName2');

        rulel.textContent = `${schedule.result.league[cnt].rule}`;
        img1l.src  = await checkCache( schedule.result.league[cnt].maps[0], schedule.result.league[cnt].maps_ex[0].image );
        img2l.src  = await checkCache( schedule.result.league[cnt].maps[1], schedule.result.league[cnt].maps_ex[1].image );
        stageName1l.textContent = `${schedule.result.league[cnt].maps[0]}`;
        stageName2l.textContent = `${schedule.result.league[cnt].maps[1]}`;


        
        var clone = document.importNode(content, true);
        fragment.appendChild(clone);
    }
    document.body.appendChild(fragment);
}

async function doFuncs(){
    await makeSchedule();
    await getSchedule();
}

doFuncs();