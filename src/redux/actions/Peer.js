export const GET_PEER_LIST = "peer/GET_PEER_LIST";

import {Tool} from '../request';

export function getPeerList(){
    var url = Tool.restful("peer/all");
    return {
        type:GET_PEER_LIST,
        promise:client=>client.post(url)
    }
}
