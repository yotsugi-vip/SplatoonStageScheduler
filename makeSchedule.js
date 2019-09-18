'use strict'
var req = require('request');

let league  = document.getElementById("league");
let now     = document.getElementById("nowBattle")
let regular = document.getElementById("regular");
let gachi   = document.getElementById("gachi");

var options = {
    url: 'https://google.com',
    method: 'GET'
}
 
 
 
req(options, function (error, response, body) {
    console.log(body);
})