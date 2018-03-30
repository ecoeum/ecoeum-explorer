import React,{Component} from 'react';
import {getBlockList} from '@/redux/actions/Block';
import {connect} from 'react-redux';
import {Table,Spin} from 'antd';
import locale from '@/components/locale';
import {Link} from 'react-router-dom';
import Container from '@/components/Container';
 
locale.init();
const columns = [{
    title:locale.get('blockID'),
    dataIndex:'hash',
    key:'blockID',
    render:(text,item)=><Link to={{pathname:'/viewBlock',state:item}}>{text}</Link>
},{
    title:locale.get('height'),
    dataIndex:'index',
    key:'height'
},{
    title:locale.get('trsCount'),
    dataIndex:'transactions.length',
    key:'trsCount'
},{
    title:locale.get('generator'),
    dataIndex:'miner',
    key:'generator'
},{
    title:locale.get('date'),
    dataIndex:'timestamp',
    key:'date',
    render:text=> {const dt = new Date(text*1000);return <span>{dt.format('yyyy-MM-dd hh:mm:ss')}</span>}
}];

class Block extends Component {
    constructor(props) {
        super(props);
        this.state={
            pagination:{
                pageSize:10,
                total:0,
                pageTotal:0,
                current:1,
                bookmark:[],
                next:true,
                prev:false
            }
        };
        this.handleOnTableChange = this.handleOnTableChange.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.fetch = this.fetch.bind(this);
    }
    componentWillMount(){
        this.fetch();
    }
    handleOnTableChange(cur){
        if(cur<1 || cur>this.state.pagination.pageTotal){
            return;
        }
        this.state.pagination.current = cur;
        this.state.pagination.prev = this.state.pagination.current>1;
        this.state.pagination.next = this.state.pagination.pageTotal>this.state.pagination.current;
        this.fetch();
    }
    handleNextPage(){
        this.handleOnTableChange(this.state.pagination.current+1)
    }
    handlePrevPage(){
        this.handleOnTableChange(this.state.pagination.current-1);
    }
    fetch(){
        this.props.getBlockList(this.state.pagination.pageSize,this.state.pagination.bookmark[this.state.pagination.current-1]);
    }
    render() {
        const block = this.props.Block||{};
        if(block!=null && block.result!=null && block.result.docs!=null){
            if(this.state.pagination.total==0) {
                this.state.pagination.total = block.result.docs[0].index;
                this.state.pagination.pageTotal = Math.ceil(this.state.pagination.total/this.state.pagination.pageSize);
            }
            this.state.pagination.bookmark[this.state.pagination.current] = block.result.bookmark;
        }

        return (
            <Container>
                <Spin tip={locale.get("dataLoading")} spinning={block.isLoading}>
                    {
                        block.errorMsg?block.errorMsg:
                        <Table
                            dataSource={block.result.docs}
                            columns={columns}
                            rowKey="hash"
                            bordered
                            onChange={this.handleOnTableChange}
                            pagination={false}
                        />
                    }
                    <ul className="ant-pagination ant-table-pagination">
                        <li title="Previous Page" tabIndex={0} className={this.state.pagination.prev==true?"ant-pagination-enable ant-pagination-item":"ant-pagination-disabled ant-pagination-item"} >
                            <a className="ant-pagination-item-link" onClick={this.handlePrevPage}>上一页</a>
                        </li>
                        <li title="2/5" className="ant-pagination-item" style={{border:0}}>
                            {this.state.pagination.current}<span>／</span>{this.state.pagination.pageTotal}
                        </li>
                        <li title="Next Page" tabIndex={0} className={this.state.pagination.next==true?"ant-pagination-enable ant-pagination-item":"ant-pagination-disabled ant-pagination-item"} >
                            <a className="ant-pagination-item-link" onClick={this.handleNextPage}>下一页</a>
                        </li>
                    </ul>
                </Spin>
            </Container>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        Block:state.Block
    }
}

export default connect(mapStateToProps,{getBlockList})(Block);
