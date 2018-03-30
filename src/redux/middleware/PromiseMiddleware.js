import request from '../request';

export const REQUEST = "request";
export const SUCCESS = "success";
export const FAIL = "fail";

export default store=>next=>action=>{
    const {dispatch,getState} = store;
    /*如果dispatch来的是一个funciton，此处不做处理，直接进入下一级*/
    if(typeof action === 'function'){
        action(dispatch,getState);
        return;
    }
    /*解析action*/
    const {
        promise,
        type,
        afterSuccess,
        ...rest
    } = action;

    /*没有promise，证明不是想要发送ajax请求，就直接进入下一步啦！*/
    if(!action.promise){
        return next(action);
    }

    /*开始请求的时候，发一个action*/
    next({
        ...rest,
        type:type,
        status:REQUEST
    });

    /*定义请求成功时的方法*/
    const onResolved = result =>{
        result = result.data;
        next({
            ...rest,
            result,
            type:type,
            status:SUCCESS
        });
        if(afterSuccess){
            afterSuccess(dispatch,getState,result);
        }
    };

    /*定义请求失败时的方法*/
    const onRejected = error => {
        next({
            ...rest,
            error,
            type:type,
            status:FAIL
        });
    };

    return promise(new request()).then(onResolved,onRejected).catch(error=>{
        console.error('MIDDLEWARE ERROR:',error);
        onRejected(error);
    })

}
export function processData(state,status,data) {
        switch(status){
            case REQUEST:
                return {
                    ...state,
                    isLoading:true
                };
            case SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    result:data,
                    errorMsg:''
                };
            case FAIL:
                return {
                    ...state,
                    isLoading:false,
                    errorMsg:'请求错误'
                }
            default:
                return state;
        }
    };
