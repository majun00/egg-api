'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1513831973207_6454';

    // add your config here
    config.middleware = [];

    config.mongoose = {
        url: 'mongodb://127.0.0.1/eggadmin',
        options: {}
    }

    // session设置
    config.session = {
        renew: true,
    };

    config.security = {
        csrf: {
            enable: false,
        }
    }

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
    
    config.multipart = {
        mode: 'file',
    };

    config.static = {
        
    };

    return config;
};