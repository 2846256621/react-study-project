import React, {Component} from 'react';
import {
    Card,
    Button,
    Table,
    Tag
} from 'antd'

import {getArticle} from "../../Services";

import moment from 'moment'  //格式化时间 moment.js 库

//将键名 换成中文
const titleDisplayMap = {
    id:'id',
    title:'标题',
    author:'作者',
    createAt:'创建时间',
    amount:'阅读量'
};

class ArticleList extends Component {
    constructor(){
        super();
        this.state={
            dataSource : [],
            columns : [],
            total:0
        }
    }
    //创建columns
    createColumns = (columnKeys)=>{

      return columnKeys.map(item=>{
           if(item === 'amount'){
               return{
                   title: titleDisplayMap[item],
                   key: item,
                   dataIndex: item,
                   //不想使用table 默认的数据渲染 生成复杂数据的渲染函数
                   render:(text,record)=>{   //record就是 当前这条数据
                       const {amount} = record;
                       //todo 根据阅读量的大小 进行条件渲染，同理 对于职位不同来进行不同渲染
                       /** 总经理:'001'， 经理: '002', 主管: '003'
                        *  const titleMap = {
                        *      '001':'red'
                        *      '002':'yellow'
                        *      '003':'green'
                        *  }
                        *  return <Tag color={titleMap[titleKey] }>{record.title}</Tag>
                        * */
                       return <Tag color={amount>200 ? "magenta":"cyan" }>{record.amount}</Tag>
                   }
               }
           }
           if(item === 'createAt') {
               return {
                   title: titleDisplayMap[item],
                   key: item,
                   dataIndex: item,
                   //不想使用table 默认的数据渲染 生成复杂数据的渲染函数
                   render: (text, record) => {   //record就是 当前这条数据
                       const {createAt} =record;
                       return moment(createAt).format('YYYY年MM月DD日 hh:mm:ss')
                   }
               }
           }
            return{
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item,
            }
        });
    };
    getData = ()=>{
        getArticle()
            .then(res=>{
                console.log(res.data.list[0]);
                const columnKeys = Object.keys(res.data.list[0]);
                const columns = this.createColumns(columnKeys);
                this.setState({
                    total:res.total,
                    dataSource:res.data.list,
                    columns
                })
            })
            .catch(err=>{
                console.log(err);
            })
    };

    componentDidMount(){
        this.getData();
    }
    render() {
        return (
            <Card title="文章列表" bordered={false}  extra={<Button>导出Excel</Button>} >
                <Table
                       rowKey = {record=>{return record.id}}  //表格行 key 的取值
                       dataSource={this.state.dataSource}
                       columns={this.state.columns}
                       // loading={true}  //加载
                        pagination={{     //分页
                            total:this.state.total,
                            hideOnSinglePage:true
                            // pageSize:1
                        }}
                />;
            </Card>
        );
    }
}

export default ArticleList;