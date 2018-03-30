require('@/utils');

import React,{Component} from 'react';
import Nav from '@/components/nav/Nav';
import RootRouter from '@/router/RootRouter';

import './App.css';

export default class App extends Component{
    render(){
        return (
            <div>
                <Nav />
                <RootRouter />
            </div>
        )
    }
}
