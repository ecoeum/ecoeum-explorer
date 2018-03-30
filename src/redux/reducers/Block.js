import {GET_BLOCK_LIST,GET_BLOCK_BY_HASH,GET_BLOCK_BY_INDEX,GET_BLOCK_BY_TRANS_HASH} from '@/redux/actions/Block';
import {processData} from "../middleware/PromiseMiddleware";

const initState = {
    isLoading:false,
    result:{},
    errorMsg:''
}

export default function reducer(state=initState,action){
    if(action.type==GET_BLOCK_LIST){
        return processData(state,action.status,action.result);
    }else if(action.type == GET_BLOCK_BY_HASH){
        return processData(state,action.status,action.result);
    }else if(action.type==GET_BLOCK_BY_INDEX){
        return processData(state,action.status,action.result);
    }else if(action.type==GET_BLOCK_BY_TRANS_HASH){
        return processData(state,action.status,action.result);
    }else{
        return state;
    }
}
