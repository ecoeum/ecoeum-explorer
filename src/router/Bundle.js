import React,{Component} from 'react';

class Bundle extends Component{
    constructor(props){
        super(props);
        this.state={
            mod:null,
            isMounted:true
        }
    }
    componentWillMount(){
        this.load(this.props);
    }
    componentWillUnmount(){
        this.state.isMounted = false;;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.load!=this.props.load){
            this.load(nextProps);
        }
    }
    load(props){
        if(!this.state.isMounted){
            return;
        }
        this.setState({
            mod:null
        });
        props.load((mod)=>{
            this.setState({
                mod:mod.default?mod.default:mod
            })
        })
    }
    render(){
        return this.props.children(this.state.mod);
    }
}

export default Bundle;
