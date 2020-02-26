import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import {
    Form,
    Icon,
    Input,
    Button,
    Checkbox,
    Card
} from 'antd';


import './login.css'
import {connect} from 'react-redux'

import {login} from '../../actions/login'


//表单的 样式 响应式
const wrapperCol = {
   xs:{
       span:18,
       offset:3
   },
   md:{
       span:16,
       offset:4
   }
};
class Login extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values); //todo 调用login登录接口 并传入 登录的表单参数
            }
        });
    };
    render() {
        // console.log(this.props);

        const { getFieldDecorator } = this.props.form;

        /**判断是否登录，登录则进入首页*/
        return (
            this.props.isLogin
            ?
            <Redirect to="/admin"/>
            :
            <Card
                title="REACT Admin 登录"
                className="yu-login"
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item wrapperCol={wrapperCol}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input
                            disabled={this.props.isLoading}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={wrapperCol}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input
                            disabled={this.props.isLoading}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={wrapperCol}>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox disabled={this.props.isLoading}>记住我</Checkbox>)}

                    <Button type="primary" htmlType="submit"
                            loading={this.props.isLoading}
                            className="login-form-button yu-login-btn">
                        登录
                    </Button>
                </Form.Item>
            </Form>
            </Card>

        );
    }
}
const mapState = (state)=>{
    return{
        isLogin:state.login.isLogin,
        isLoading:state.login.isLoading
    }
};
export default connect(mapState,{login})(Form.create()(Login));