import {combineReducers} from 'redux';

import Block from './reducers/Block';
import Trans from './reducers/Trans';
import Peer from './reducers/Peer';
import Account from './reducers/Account';

export default combineReducers({
    Block,
    Trans,
    Peer,
    Account
})
