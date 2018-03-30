import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom';
import Bundle from './Bundle';
import Loading from '@/components/Loading';

import Block from 'bundle-loader?lazy&name=block!@/pages/block';
import ViewBlock from 'bundle-loader?lazy&name=viewBlock!@/pages/block/ViewBlock';
import Trans from 'bundle-loader?lazy&name=trans!@/pages/trans';
import Transfer from 'bundle-loader?lazy&name=transfer!@/pages/trans/Transfer';
import Peer from 'bundle-loader?lazy&name=peer!@/pages/peer';
import Account from 'bundle-loader?lazy&name=account!@/pages/account';
import CreateAccount from 'bundle-loader?lazy&name=createAccount!@/pages/account/CreateAccount';
import Page404 from 'bundle-loader?lazy&name=page404!@/pages/common/Page404';

const createComponent = (component)=>(props)=>(
    <Bundle load={component}>
        {
            (Component)=>Component?<Component {...props} />:<Loading />
        }
    </Bundle>
);

export default class RootRouter extends Component{
    render(){
        return	(
            <Switch>
                <Route exact path="/" component={createComponent(Block)}/>
                <Route path="/block" component={createComponent(Block)}/>
                <Route path="/viewBlock" component={createComponent(ViewBlock)}/>
                <Route path="/trans" component={createComponent(Trans)}/>
                <Route path="/peer" component={createComponent(Peer)}/>
                <Route path="/account" component={createComponent(Account)}/>
                <Route path="/createAccount" component={createComponent(CreateAccount)}/>
                <Route path="/transfer" component={createComponent(Transfer)}/>
                <Route component={createComponent(Page404)}/>
            </Switch>
        )
    }
}
