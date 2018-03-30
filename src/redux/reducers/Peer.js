import {GET_PEER_LIST} from '@/redux/actions/Peer';
import {processData} from "../middleware/PromiseMiddleware";

const initState = {
    isLoading:false,
    result:[],
    errorMsg:''
}

export default function reducer(state=initState,action){
    if(action.type==GET_PEER_LIST){
        return processData(state,action.status,action.result);
    }else{
        return state;
    }
}
