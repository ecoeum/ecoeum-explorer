import {GET_TRANS_LIST,GET_TRANS_BY_HASH}from '@/redux/actions/Trans';
import {SUCCESS,processData} from "@/redux/middleware/PromiseMiddleware";

const initState = {
    isLoading:false,
    result:{},
    errorMsg:''
}

export default function reducer(state=initState,action){
    if(action.type==GET_TRANS_LIST){
        let result = action.result || {};
        if(action.status==SUCCESS) {
            let docs = [];
            if (action.result.docs) {
                for (let i = 0; i < action.result.docs.length; i++) {
                    for (let j = 0; j < action.result.docs[i].transactions.length; j++) {
                        docs.push(action.result.docs[i].transactions[j]);
                    }
                }
            }
            result.docs = docs;
            result.bookmark = action.result.bookmark;
        }
        return processData(state,action.status,result);
    }else if(action.type==GET_TRANS_BY_HASH){
        return processData(state,action.style,action.result);
    }else{
        return state;
    }
}
