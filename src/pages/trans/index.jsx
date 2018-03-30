import React,{Component} from 'react';
import {getTransList} from '@/redux/actions/Trans';
import {connect} from 'react-redux';
import {Table,Spin,Button,Modal} from 'antd';
import locale from '@/components/locale';
import Container from '@/components/Container';

import './index.css';

locale.init();

class Trans extends Component {
    constructor(props) {
        super(props);
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
            title:locale.get('sender'),
            dataIndex:'sender',
            key:'sender'
        },{
            title:locale.get('recipient'),
            dataIndex:'recipient',
            key:'recipient'
        },{
            title:locale.get('height'),
            dataIndex:'height',
            key:'height'
        },{
            title:locale.get('date'),
            dataIndex:'date',
            key:'date'
        },{
            title:locale.get('data'),
            dataIndex:'data',
            key:'data',
            render:(text,item)=><Button onClick={()=>{this.handleShow(item)}}>{locale.get('view')}</Button>
        }];
        this.state={
            pagination:{
                pageSize:10,
                total:0,
                //pageTotal:0,
                current:1,
                bookmark:[],
                next:true,
                prev:false
            },
            visible:false,
            transData:{}
        };
        this.handleOnTableChange = this.handleOnTableChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.fetch = this.fetch.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleOK = this.handleOK.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentWillMount(){
        this.fetch();
    }
    handleOnTableChange(cur){
        if(cur<1){
            return;
        }
        this.state.pagination.current = cur;
        this.state.pagination.prev = this.state.pagination.current>1;
        //this.state.pagination.next = this.state.pagination.pageTotal>this.state.pagination.current;
        this.fetch();
    }
    handleNextPage(){
        this.handleOnTableChange(this.state.pagination.current+1)
    }
    handlePrevPage(){
        this.handleOnTableChange(this.state.pagination.current-1);
    }
    fetch(){
        this.props.getTransList(this.state.pagination.pageSize,this.state.pagination.bookmark[this.state.pagination.current-1]);
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
    render() {
        const trans = this.props.Trans||{};
        if(trans!=null && trans.result!=null && trans.result.docs!=null){
            //if(this.state.pagination.total==0) {
                //this.state.pagination.total = trans.result.docs[0].index;
                //this.state.pagination.pageTotal = Math.ceil(this.state.pagination.total/this.state.pagination.pageSize);
            //}
            this.state.pagination.bookmark[this.state.pagination.current] = trans.result.bookmark;
        }
        return (
            <Container>
                <Spin tip={locale.get("dataLoading")} spinning={trans.isLoading}>
                    {
                        trans.errorMsg?trans.errorMsg:
                            <Table
                                dataSource={trans.result.docs}
                                columns={this.transColumns}
                                bordered
                                rowKey="hash"
                                pagination={false}
                            />
                    }
                </Spin>
                <ul className="ant-pagination ant-table-pagination">
                    <li title="Previous Page" tabIndex={0} className={this.state.pagination.prev==true?"ant-pagination-enable ant-pagination-item":"ant-pagination-disabled ant-pagination-item"} >
                        <a className="ant-pagination-item-link" onClick={this.handlePrevPage}>上一页</a>
                    </li>
                    <li title="2/5" className="ant-pagination-item" style={{border:0}}>
                        {this.state.pagination.current}
                    </li>
                    <li title="Next Page" tabIndex={0} className={this.state.pagination.next==true?"ant-pagination-enable ant-pagination-item":"ant-pagination-disabled ant-pagination-item"} >
                        <a className="ant-pagination-item-link" onClick={this.handleNextPage}>下一页</a>
                    </li>
                </ul>
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
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        Trans:state.Trans
    }
}

export default connect(mapStateToProps,{getTransList})(Trans);
