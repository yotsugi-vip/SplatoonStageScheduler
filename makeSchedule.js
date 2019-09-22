'use strict'
var fs = require('fs');
var fetch = require('node-fetch');

function makeSchedule(){
    var content  = document.getElementById('template').content;
    var fragment = document.createDocumentFragment();

    var file = fs.readFileSync('test/schedule.json', 'utf8');
    var schedule = JSON.parse(file);

    for( var cnt = 0; cnt < 12; cnt++ ) {
        var time    = content.querySelector('.timeZone');
        var regular = content.querySelector('.regular');
        var gachi   = content.querySelector('gachi');
        var league  = content.querySelector('league');

        // 開催時間設定
        var start = new Date( Date.parse(schedule.result.regular[cnt].start_utc) );
        var end   = new Date( Date.parse(schedule.result.regular[cnt].end_utc) );
        time.textContent = `${start.getHours()}:00 〜 ${end.getHours()}:00`;

        //レギュラーマッチ
        var img1 = regular.querySelector('.image_abusolute');
        var img2 = regular.querySelector('.stage2');
        var stageName1 = regular.querySelector('.stageName1');
        var stageName2 = regular.querySelector('.stageName2');
        stageName1.textContent = `${schedule.result.regular[cnt].maps[0]}`;
        stageName2.textContent = `${schedule.result.regular[cnt].maps[1]}`;

       
        var clone = document.importNode(content, true);
        fragment.appendChild(clone);
    }
    console.log(fragment);
    document.body.appendChild(fragment);
}

function checkCache( name, address ) {
    // キャッシュにあるか確認
    try {
        fs.statSync(`cache/${name}.png`);
    } catch(err) {
        fetch(address)
        .then( Response => {
            Response.blob()
            .then(result=>{
                console.log(result);
                var reader = new FileReader();
                reader.readAsArrayBuffer(result)
                .then(result=>{
                    fs.writeFileSync( `cache/${name}.png`, result );
                });  
            });
                    
        });
    }
}



// templateから要素取り出し
//var frg = document.createDocumentFragment();
//var content = document.getElementById('test').content;
//
//for( var a = 0; a <10; a++ ){
//    var img = content.querySelector('img');
//    var ele = content.querySelector('div');
//    
//    
//    img.src = "cache/海女美術大学.png";
//    img.classList.add("stage1");
//    
//    ele.textContent = a;
//    ele.classList.add('timeZone');
//    
//    var clone = document.importNode(content, true);
//    frg.appendChild(clone);
//}
//document.body.appendChild(frg);

//makeSchedule();
checkCache( "ホテルニューオートロ", "https://app.splatoon2.nintendo.net/images/stage/98a7d7a4009fae9fb7479554535425a5a604e88e.png" );