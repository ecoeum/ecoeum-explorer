import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import {Button,Input,Row,Col,Select,Dropdown,Icon,Menu,message} from 'antd';
import locale from '@/components/locale';
import history from '@/router/History';

import './Nav.css';

locale.init();

const menus = [
    {title:'block',url:'/block',index:0},
    {title:'trans',url:'/trans',index:1},
    {title:'peer',url:'/peer',index:2},
    /*{title:'account',url:'/account',index:3}*/
];

const tools = [
    {title:'createAccount',url:'/createAccount',index:0},
    {title:'transfer',url:'/transfer',index:1},
    {title:'votes',url:'/votes',index:2}
];

export default class Nav extends Component{
    constructor(props){
        super(props);
        this.state={
            index:0
        };
        this.handleNav = this.handleNav.bind(this);
        this.handleLocaleChange = this.handleLocaleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    handleNav(index){
        this.setState({index:index});
    }
    handleLocaleChange(value){
        locale.currentLocale = value;
        location.search='?lang='+value;
    }
    handleSearch(){
       let val = this.refs.txtSearch.input.value;
       if(/^\d+$/.test(val) || /^[a-zA-Z0-9]{64}$/.test(val)) {
            this.handleNav(1);
            history.push({pathname:'/viewBlock',state:{search:val}});
        }else{
            message.error(locale.get("invalidParameter"),1);
        }
    }
    render(){
        var that=  this;
        var toolsLayer = (
            <Menu>
                {
                    tools.map(function(v,i){
                        return (
                            <Menu.Item key={i}>
                                <Link to={v.url}>
                                    {locale.get(v.title)}
                                </Link>
                            </Menu.Item>
                        );
                    })

                }
            </Menu>
        )
        let pathname = location.pathname;
        for(let i=0;i<menus.length;i++){
            if(pathname.startsWith(menus[i].url)) {
                this.state.index = menus[i].index;
                break;
            }
        }

        return	(
            <div className="nav-bar">
                <Row type="flex" justify="start">
                    <Col span={2}>
                        <div className="logo"></div>
                    </Col>
                    <Col span={10}>
                        <ul>
                            {
                                menus.map(function(v,i){
                                    return (
                                        <li
                                            key={i}
                                            className={that.state.index==v.index?'active':''}
                                            onClick={()=>{that.handleNav(v.index)}}
                                        >
                                            <Link to={v.url}>
                                                {locale.get(v.title)}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </Col>
                    <Col span={12}>
                        <Row className="search" type="flex" justify="start">
                            <Col span={8}>
                                <Input placeholder={locale.get('searchTip')} ref="txtSearch"/>
                            </Col>
                            <Col span={6}>
                                <Button type="primary" icon="search" onClick={this.handleSearch}>{locale.getHTML('search')}</Button>
                            </Col>
                            <Col span={10}>
                                <Dropdown overlay={toolsLayer}>
                                    <a className="ant-dropdown-link" href="javascript:void(0)">
                                        {locale.get('tool')} <Icon type="down" />
                                    </a>
                                </Dropdown>
                                <Select
                                    size="default"
                                    style={{marginLeft:20}}
                                    defaultValue={locale.currentLocale}
                                    onChange={this.handleLocaleChange}>
                                    <Select.Option value="zh-CN">中文</Select.Option>
                                    <Select.Option value="en-US">English</Select.Option>
                                </Select>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}


