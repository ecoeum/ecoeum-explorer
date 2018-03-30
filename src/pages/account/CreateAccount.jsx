import React,{Component} from 'react';
import {Button,Row,Col,Icon,Card,Input,message,Spin} from 'antd';
import locale from '@/components/locale';
import Container from '@/components/Container';
import {createNewAccountByPassword} from "@/redux/actions/Account";
import {connect} from 'react-redux';

import "./CreateAccount.css";

const fileDownload = require('react-file-download');

locale.init();

class CreateAccount extends Component{
    constructor(props){
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }
    handleCreate(){
        let pwd = this.refs.txtPassword.input.value;
        if(!pwd || pwd.length<8){
            message.error(locale.get("lengthShort",{name:locale.get("password"),length:8}));
            return;
        }
        this.props.createNewAccountByPassword(pwd);
    }
    handleDownload(){
        let account = this.props.Account||{};
        let result = Object.assign({"mainPassword":"","accountAddress":""},account.result);
        let content = locale.get("accountPassword")+"："+result.mainPassword+"\r\n"+locale.get("accountAddress")+"："+result.accountAddress;
        fileDownload(content,"account.txt");
    }
    render(){
        let account = this.props.Account||{};
        let result = Object.assign({"mainPassword":"","accountAddress":""},account.result);
        return (
            <Container>
                <Spin spinning={account.isLoading==true} tip={locale.get("dataLoading")}>
                    <div className="ca-content">
                        <Row className="ca-tip">
                            <Col>
                                {locale.get('createAccountWarning')}
                            </Col>
                        </Row>
                        <Row className="ca-data">
                            <Col>
                                <div style={{marginBottom:5,color:'#ff5900'}}>{locale.get("inputPasswordTip")}</div>
                                <Input
                                    ref="txtPassword"
                                    prefix={<Icon type="key"/>}
                                    placeholder={locale.get("inputYourPassword")}
                                />
                            </Col>
                        </Row>
                        <Row className="ca-button-area">
                            <Col>
                                {
                                    result.accountAddress.length==0?<Button type="primary" onClick={this.handleCreate}>{locale.get('agreeCreate')}</Button>:<Button type="primary" onClick={this.handleDownload}>{locale.get('download')}</Button>
                                }
                            </Col>
                        </Row>
                        {
                            result.accountAddress.length>0?
                                (
                                    <div>
                                        <Row className="ca-tip red">
                                            <Col>
                                                {locale.get('createAccountTip')}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Card
                                                    title={<div><Icon type="key" style={{marginRight:3}}/>{locale.get('mainPassword')}</div>}
                                                    type="inner"
                                                    bodyStyle={{height:80}}
                                                >
                                                    {result.mainPassword}
                                                </Card>
                                                <Card
                                                    title={<div><Icon type="bank" style={{marginRight:3}}/>{locale.get('yourAccountAddress')}</div>}
                                                    type="inner"
                                                    style={{marginTop:-1}}
                                                    bodyStyle={{height:80}}
                                                >
                                                    {result.accountAddress}
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                                :""
                        }
                    </div>
                </Spin>
            </Container>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        Account:state.Account
    }
}

export default connect(mapStateToProps,{createNewAccountByPassword})(CreateAccount);