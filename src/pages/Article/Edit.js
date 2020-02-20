import React, {Component,createRef} from 'react';
import {
    Card,
    Button,
    Form,
    Icon,
    Input,
    DatePicker,
    Spin,
    message,
} from 'antd'

//富文本编辑器
import E from 'wangeditor'

import './edit.css'

import {
    getArticleById,
    saveArticle
} from "../../Services";
import moment from 'moment'

/**利用栅格系统进行表单的布局，共24格*/
const formItemLayout = {
    labelCol:{ span:4 }, //label 标签布局
    wrapperCol:{ span:16 } //需要为输入控件设置布局样式时
};

class Edit extends Component {
    constructor(){
        super();
        //动态表单提示信息
        this.state = {
            titleValidateStatus:"",
            titleHelp:'',
            isLoading:false, //是否保存的状态
        };
        this.editRef = createRef();
    }
    /**表单默认事件*/
    handleSubmit = (e)=>{
        e.preventDefault();//阻止默认事件
        /**时时得到表单提交后的 值*/
        this.props.form.validateFields((err, values) => {

            const data = Object.assign({},values,{
                createAt : values.createAt.valueOf(), //将时间修改成时间戳
                id:this.props.match.params.id, //data中 没有id,从路由中获取
            });
            // console.log(data);
            this.setState({
                isLoading:true
            });
            /**提交修改*/
            saveArticle(data)
                .then(res=>{
                    message.success(res.data.msg);
                    //根据需求跳转
                    this.props.history.push('/admin/article')
                })
                .finally(()=>{
                    this.setState({
                        isLoading:false
                    })
                });
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    /**富文本编辑 查看文档 用法*/
    initEditor = ()=>{
        // E 是一个 editor 的方法
        this.editor = new E(this.editRef.current);

        //当文本内容改变时，就会执行的操作
        this.editor.customConfig.onchange = (html)=> {
             // html 即变化之后的内容
            this.props.form.setFieldsValue({
                content: html,
            });
         };
        //最后创建
        this.editor.create();
    };
    componentDidMount(){
        this.initEditor(); //建立 富文本
        this.setState({
            isLoading:true
        });
        getArticleById(this.props.match.params.id) //从路由里取id
            .then(res=>{
                // console.log(res.data);
                //使用 setFieldsValue  来动态设置其他控件的值。
                // this.props.form.setFieldsValue({
                //     title:res.data.title,
                //     author:res.data.author,
                //     amount:res.data.amount,
                //     createAt:moment(res.data.createAt),
                //     content:res.data.content
                // });
                //同上
                const {id,...data} =res.data;
                data.createAt = moment(data.createAt);

                this.props.form.setFieldsValue(data);
                /**设置富文本 内容 查看文档*/
                this.editor.txt.html(data.content);

            })
            .finally(()=>{
                this.setState({
                    isLoading:false
                })
            })

    }

    render() {
        //经过 Form.create 包装的组件将会自带 this.props.form 属性
        const {
            getFieldDecorator
        } = this.props.form;
        return (
            <Card
                title="编辑文章"
                // title={this.props.location.state.title}   //这样写 刷新就会出错
                bordered={false}
                extra={<Button type="primary" ghost onClick={this.props.history.goBack}>取消</Button>} //卡片右上角的操作区域
            >
                <Spin spinning={this.state.isLoading}>
                 <Form className="login-form"
                      onSubmit={this.handleSubmit}
                      {...formItemLayout}
                >
                    <Form.Item
                        label="标题"
                        // validateStatus={this.state.titleValidateStatus}
                        // help={this.state.titleHelp}
                    >
                        {/*antd 提供的验证规则*/}
                        {
                            getFieldDecorator('title', {
                            rules: [
                                { required: true, message: '请输入标题！' },
                                // { min:4, message: '长度大于4' }

                                    // {
                                    //     //自定义校验（注意，callback 必须被调用）
                                    //     validator:(rule, value, callback)=>{
                                    //         if(value !== '123'){
                                    //             this.setState({
                                    //                 titleValidateStatus:'error',
                                    //                 titleHelp:'用户名不正确'
                                    //             })
                                    //         }else{
                                    //             this.setState({
                                    //                 titleValidateStatus:'',
                                    //                 titleHelp:''
                                    //             })
                                    //         }
                                    //         callback()  //callback 必须被调用
                                    //     }
                                    // }
                                ],
                        })(
                            <Input
                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Title"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="作者">
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入作者名！' }],
                            initialValue:'斤斤计较' //默认初始值
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Author"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="阅读量">
                        {getFieldDecorator('amount', {
                            rules: [{ required: true, message: '请输入阅读量！' }],
                        })(
                            <Input
                                prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="0"
                                type='number'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="发布时间">
                        {getFieldDecorator('createAt',{
                            rules: [{ required: true, message: '请选择创建时间！' }],
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Choose Time" />,
                        )}
                    </Form.Item>
                    <Form.Item label="文章内容">
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入内容！' }],
                        })(
                            //富文本编辑
                            <div className="yu-editor" ref={this.editRef}/>
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:4}}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            保存修改
                        </Button>
                    </Form.Item>
                </Form>
                </Spin>
            </Card>
        );
    }
}

export default Form.create()(Edit);