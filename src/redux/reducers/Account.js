import {GET_ACCOUNT_LIST,CREATE_NEW_ACCOUNT_BY_PASSWORD} from '@/redux/actions/Account';
import {processData} from "../middleware/PromiseMiddleware";

const initState = {
    isLoading:false,
    result:[],
    errorMsg:''
}

export default function reducer(state=initState,action){
    if(action.type==GET_ACCOUNT_LIST){
        state = processData(state,action.status,action.result);
    }else if(action.type == CREATE_NEW_ACCOUNT_BY_PASSWORD){
        state = processData(state,action.status,action.result);
    }
    return state;
}
