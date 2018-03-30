/**
 * Created by Administrator on 2018-02-26.
 */
'use strict';
class Explorer {
    constructor() {
        const Koa = require('koa');
        global.explorer = new Koa();

        require('./routers')();
    }

    listen(host, port) {
        //start listen
        global.explorer.listen(port);
        console.log(new Date().toLocaleString() + " compile-chain explorer  server listen on "+port);
    }
}

module.exports = Explorer;

