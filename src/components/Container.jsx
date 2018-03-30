import React,{Component} from 'react';

export default class Container extends Component{
    render(){
        return (
            <div className="page-box">
                {this.props.children}
            </div>
        )
    }
}
