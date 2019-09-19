'use strict'
var req = require('request');

let league  = document.getElementById("league");
let now     = document.getElementById("nowBattle")
let regular = document.getElementById("regular");
let gachi   = document.getElementById("gachi");
var data = "<div id=nowBattle>XX:XX ~ XX:XX</div>\n<ul class=\"battleNavi\">\n<li id=\"regular\">レギュラー</li>\n<li id=\"gachi\">ガチ</li>\n<li id=\"league\">リーグ</li>\n</ul>"
