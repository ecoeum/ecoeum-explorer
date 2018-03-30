import React,{Component} from 'react';
import {Table,Modal,Button} from 'antd';
import Container from '@/components/Container';
import locale from '@/components/locale';
import cookies from 'js-cookie';
import {connect} from 'react-redux';
import {getBlockByIndex,getBlockByHash} from "@/redux/actions/Block";

import './ViewBlock.css';

const columns = [{
    dataIndex:'key',
    key:'key',
},{
    dataIndex:'value',
    key:'value'
}];

class ViewBlock extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataList:[],
            transData:{},
            transactions:[]
        };
        this.transColumns = [{
            title:locale.get('id'),
            dataIndex:'id',
            key:'id'
        },{
            title:locale.get('hash'),
            dataIndex:'hash',
            key:'hash'
        },{
            title:locale.get('type'),
            dataIndex:'type',
            key:'type'
        },{
            title:locale.get('data'),
            dataIndex:'data',
            key:'data',
            render:(text,item)=><Button onClick={()=>{this.handleShow(item)}}>{locale.get('view')}</Button>
        }];
        this.handleShow = this.handleShow.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.findBlock = this.findBlock.bind(this);
        this.buildData = this.buildData.bind(this);
    }
    componentDidMount(){
        let data = this.props.location.state;
        if(!data){
             data = JSON.parse(cookies.get("block-view-data"));
        }else {
            if(!!data.search){
                this.findBlock(data.search);
                return;
            }else {
                cookies.set("block-view-data", JSON.stringify(data));
            }
        }
        data = this.buildData(data);
        this.setState(data);
    }
    findBlock(search){
        if(/^\d+$/.test(search)) {
            this.props.getBlockByIndex(search);
        }else if(/^[a-zA-Z0-9]{64}$/.test(search)){
            this.props.getBlockByHash(search)
        }
    }
    buildData(block){
        if(!block){
            return;
        }
        let list = [];
        for(let key in block){
            if(key=="transactions"){
                list.push({"key":locale.get(key),"value":block[key].length});
                continue;
            }

            list.push({"key":locale.get(key),"value":block[key]});
        }
        return {dataList:list,transactions:block.transactions};
    }
    handleShow(item){
        let data = {};
        data.inputs = JSON.stringify(item.data.inputs);
        data.outputs = JSON.stringify(item.data.outputs);
        this.setState({visible:true,transData:data});
    }
    handleOK(){
        this.setState({visible:false});
    }
    handleCancel(){
        this.setState({visible:false})
    }
    render(){
        let block = this.props.Block||{};
        if(!!block.result && !!block.result.hash){
            let data = this.buildData(block.result);
            this.state.dataList = data.dataList;
            this.state.transactions = data.transactions;
        }

        return (
            <Container>
                <h3>{locale.get('blockInfo')}</h3>
                <Table
                    dataSource={this.state.dataList}
                    columns={columns}
                    rowKey="key"
                    bordered
                    pagination={false}
                    showHeader={true}
                />
                <h3
                    style={{marginTop:20}}
                >{locale.get('transInfo')}</h3>
                <Table
                    dataSource={this.state.transactions}
                    columns={this.transColumns}
                    rowKey="id"
                    bordered
                    pagination={false}
                />
                <Modal
                    title={locale.get('transData')}
                    visible={this.state.visible}
                    onOk={this.handleOK}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div style={{marginTop:-10}}>
                        <h4>{locale.get('input')}</h4>
                        <div className='data-box'>{this.state.transData.inputs}</div>
                        <h4 style={{marginTop:15}}>{locale.get('output')}</h4>
                        <div className='data-box'>{this.state.transData.outputs}</div>
                    </div>
                </Modal>
            </Container>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        Block:state.Block
    }
}

export default connect(mapStateToProps,{getBlockByHash,getBlockByIndex})(ViewBlock);