export const GET_BLOCK_LIST = "block/GET_BLOCK_LIST";
export const GET_BLOCK_BY_HASH = "block/GET_BLOCK_BY_HASH";
export const GET_BLOCK_BY_TRANS_HASH = "block/GET_BLOCK_BY_TRANS_HASH";
export const GET_BLOCK_BY_INDEX = "block/GET_BLOCK_BY_INDEX";

import {Tool} from '../request';

export function getBlockList(limit,bookmark){
    if(!limit){
        limit = 20;
    }
    let url = Tool.restful("blocks",limit,bookmark);
    return {
        type:GET_BLOCK_LIST,
        promise:client=>client.get(url)
    };

}

export function getBlockByHash(hash) {
    let url = Tool.restful("block",hash);
    return {
        type:GET_BLOCK_BY_HASH,
        promise:client=>client.get(url)
    }
}

export function getBlockByTransHash(hash){
    let url = Tool.restful("blockchain/blocks/transcation",hash);
    return {
        type:GET_BLOCK_BY_TRANS_HASH,
        promise:client=>client.get(url)
    }
}

export function getBlockByIndex(index){
    let url = Tool.restful("block",index);
    return {
        type:GET_BLOCK_BY_INDEX,
        promise:client=>client.get(url)
    }
}