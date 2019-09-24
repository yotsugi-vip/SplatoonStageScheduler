'use strict';

const builder = require('electron-builder');
const fs = require('fs');
const Platform = builder.Platform;
const packagejson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

builder.build({
    targets: Platform.LINUX.createTarget(),
    config: {
        'appId': `com.example.${packagejson.name}`,
        'linux': {
            'target': 'deb',
            'maintainer':'youigi',
            'vendor':'yotugi',
            'synopsis':'splatoon stage scheduler',
            'description':'',
            'category':'Game',
            'desktop':'sss.desktop'
        },
    },
});