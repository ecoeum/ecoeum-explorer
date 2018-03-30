import React,{Component} from 'react';
import intl from 'react-intl-universal';
import cookies from 'js-cookie';
import _ from 'lodash';

const locales = {
    "en-US":require('./locales/en-US.js'),
    "zh-CN":require('./locales/zh-CN.js')
};
const locale = {
    initDone:false,
    currentLocale:'zh-CN',
    init:function(){
        let cur = intl.determineLocale({
            urlLocaleKey: "lang",
            cookieLocaleKey: "lang"
        });
        var keys = [];
        for(var k in locales){
            keys.push(k);
        }
        if(!_.find(keys,function(c){
            return c==cur;
        })){
            cur = this.currentLocale;
        }
        this.currentLocale = cur;
        cookies.set('lang',this.currentLocale);
        intl.init({
            currentLocale:this.currentLocale,
            locales
        }).then(()=>{
            this.initDone=true;
        })
    },
    get:function(key,options){
        if(!!!key){
            return key;
        }
        var df = key;
        if(typeof(options)=='string'){
            df = options;
            options = null;
        }
        return intl.get(key,options).d(df);
    },
    getHTML:function(key,options){
        if(!!!key){
            return key;
        }
        var df = key;
        if(typeof(options)=='string'){
            df = options;
            options = null;
        }
        return intl.getHTML(key,options).d(df);

    }
}
module.exports = locale;
