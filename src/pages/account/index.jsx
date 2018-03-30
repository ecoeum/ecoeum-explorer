import React,{Component} from 'react';
import {getAccountList} from '@/redux/actions/Account';
import {connect} from 'react-redux';
import {Table,Spin} from 'antd';
import locale from '@/components/locale';
import Container from '@/components/Container';

locale.init();

const columns = [{
    title:locale.get('address'),
    dataIndex:'address',
    key:'address'
},{
    title:locale.get('balance'),
    dataIndex:'balance',
    key:'balance'
},{
    title:locale.get('publicKey'),
    dataIndex:'publicKey',
    key:'publicKey'
}];

class Account extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.getAccountList();
    }
    render() {
        let account = this.props.Account||{};
        return (
            <Container>
                <Spin tip={locale.get("dataLoading")} spinning={account.isLoading}>
                    {
                        account.errorMsg?account.errorMsg:
                        <Table
                            dataSource={account.result}
                            columns={columns}
                            rowKey="key"
                            bordered
                        />
                    }
                </Spin>
            </Container>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        Account:state.Account
    }
}

export default connect(mapStateToProps,{getAccountList})(Account);
