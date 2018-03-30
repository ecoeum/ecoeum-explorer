export const GET_TRANS_LIST = "trans/GET_TRANS_LIST";
export const GET_TRANS_BY_HASH = "trans/GET_TRANS_BY_HASH";

import {Tool} from '../request';

export function getTransList(limit,bookmark){
    if(!limit){
        limit = 20;
    }
    let url = Tool.restful("blocks",limit,bookmark);
    return {
        type:GET_TRANS_LIST,
        promise:client=>client.get(url)
    }
}

export function getTransByHash(hash){
    let url = Tool.restful("blockchain/blocks/transactions",hash);
    return {
        type:GET_TRANS_BY_HASH,
        promise:client=>client.get(url)
    }
}
