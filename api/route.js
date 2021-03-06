const keys = require('lodash/keys');
const sender = require('./controllers/sender');
const routes = {    
    '/checkVideo': {
        method: 'get',
        func: sender.checkVideo
    },
    '/checkChannel': {
        method: 'get',
        func: sender.checkChannel
    },
    '/version': {
        method: 'get',
        func: sender.version
    },
    '/': {
        method: 'get',
        func: sender.version
    }
};

module.exports = {
    route: server=>{
        const rts = keys(routes);
        rts.forEach(url=>{
            const op = routes[url];
            server[op.method](url, op.func);
        });
    }
};