import React,{Component} from 'react';
import {Button,Form,Icon,Input} from 'antd';
import locale from '@/components/locale';
import Container from '@/components/Container';

import './Transfer.css';

locale.init();

const FormItem = Form.Item;
const formItemLayout = {
    labelCol:{
        xs:{span:12},
        sm:{span:6}
    },
    wrapperCol:{
        xs:{span:12},
        sm:{span:16}
    }
};
const tailItemLayout={
    wrapperCol:{
        xs:{
            span:12,
            offseet:12
        },
        sm:{
            span:16,
            offset:6
        }
    }
};

export default class CreateAccount extends Component{
    constructor(props){
        super(props);
        this.handleTransfer = this.handleTransfer.bind(this);
    }
    handleTransfer(){
        console.log("do transfer");
    }
    render(){
        return (
            <Container>
                <div className="content">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label={locale.get('accountAddress')}
                        >
                            <Input
                                prefix={<Icon type="bank"/>}
                                placeholder={locale.get('inputToAccountAddress')}
                            />

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={locale.get('transferMoney')}
                        >
                            <Input
                                prefix={<Icon type="pay-circle-o"/>}
                                placeholder={locale.get('inputTransferMoney')}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={locale.get('mainKey')}
                        >
                            <Input
                                prefix={<Icon type="key"/>}
                                placeholder={locale.get('inputYourKey')}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={locale.get('remark')}
                        >
                            <Input
                                prefix={<Icon type="form"/>}
                                placeholder={locale.get('inputYourRemark')}
                            />

                        </FormItem>

                        <FormItem
                            {...tailItemLayout}
                        >
                            <Button
                                type="primary"
                            >
                                {locale.get('doTransfer')}
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Container>
        )
    }
}
