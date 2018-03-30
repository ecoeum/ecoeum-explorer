import React,{Component} from 'react';
import {getPeerList} from '@/redux/actions/Peer';
import {connect} from 'react-redux';
import {Table,Spin} from 'antd';
import locale from '@/components/locale';
import Container from '@/components/Container';

locale.init();

const columns = [{
    title:locale.get('ip'),
    dataIndex:'url',
    key:'url',
    render:(text)=>{let regexp = /\d+\.\d+\.\d+\.\d+/;return <span>{text.match(regexp)}</span>}
},{
    title:locale.get('port'),
    dataIndex:'url',
    key:'port',
    render:(text)=>{let regexp = /(?::)(\d+)/;return <span>{text.match(regexp)[1]}</span>}
},{
    title:locale.get('status'),
    dataIndex:'status',
    key:'status',
    render:(text)=>{return <span>{text==1?"在线":"离线"}</span>}
},{
    title:locale.get('os'),
    dataIndex:'os',
    key:'os'
},{
    title:locale.get('height'),
    dataIndex:'height',
    key:'height'
}];

class Peer extends Component {
    constructor(props) {
        super(props);
        this.state={
            pagination:{
                pageSize:10,
                defaultCurrent:1
            }
        };
        this.handleOnTableChange = this.handleOnTableChange.bind(this);
        this.fetch = this.fetch.bind(this);
    }
    componentWillMount(){
        this.fetch();
    }
    handleOnTableChange(pagination){
        let pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({pagination:pager});
        this.fetch();
    }

    fetch(){
        this.props.getPeerList();
    }
    render() {
        const peer = this.props.Peer||{};
        return (
            <Container>
                <Spin tip={locale.get("dataLoading")} spinning={peer.isLoading}>
                    {
                        peer.errorMsg?peer.errorMsg:
                        <Table
                            dataSource={peer.result}
                            columns={columns}
                            bordered
                            pagination={this.state.pagination}
                            rowKey="url"
                        />
                    }
                </Spin>
            </Container>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        Peer:state.Peer
    }
}

export default connect(mapStateToProps,{getPeerList})(Peer);
