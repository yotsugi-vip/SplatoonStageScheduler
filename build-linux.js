'use strict';

const builder = require('electron-builder');

builder.build({
    config: {
        'appId': `com.example.sss`,
        'linux': {
            'target': 'deb',
            'maintainer':'youigi',
            'vendor':'yotugi',
            'synopsis':'splatoon stage scheduler',
            'description':'',
            'category':'Game',
            'desktop':'sss.desktop'
        }
    }
});