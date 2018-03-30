export const GET_ACCOUNT_LIST = "account/GET_ACCOUNT_LIST";
export const CREATE_NEW_ACCOUNT_BY_PASSWORD = "account/CREATE_NEW_ACCOUNT_BY_PASSWORD";

export function getAccountList(){
    return {
        type:GET_ACCOUNT_LIST,
        promise:client=>client.get('http://127.0.0.1:8080/api/account.json')
    }
}

export function createNewAccountByPassword(password){
    //let url = '/account/createNewAccountByPassword';
    let url = 'http://127.0.0.1:8080/api/createAccount.json';
    return {
        type:CREATE_NEW_ACCOUNT_BY_PASSWORD,
        promise:client=>client.get(url,{'password':password})
    }
}