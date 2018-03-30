import React from 'react';
import axios from 'axios';
import {SERVER} from '@/config';

export const Tool = {
    restful:function(url){
        let args = arguments;
        if(args.length>1){
            for(var i=1;i<args.length;i++){
                if(!!args[i]){
                    url+="/"+args[i];
                }
            }
        }
        return url;
    }
}
export default class Request{
    join(p1,p2){
        if(p1.substring(p1.length-1)=="/"){
            p1 = p1.substring(0,p1.length-1);
        }
        if(p2.substring(0,1)=="/"){
            p2 = p2.substring(1);
        }
        return p1+"/"+p2;
    }
    makeAddr(url){
        let addr = url;
        if(!url.startsWith("http://") && !url.startsWith("http://")){
            addr = this.join(SERVER,url);
        }
        return addr;
    }
    get(url,data,config){
        return axios.get(this.makeAddr(url),config);
    }
    post(url,data,config){
        return axios.post(this.makeAddr(url),data,config);
    }
}
