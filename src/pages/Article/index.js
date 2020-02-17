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
            total:0,
            isLoading:false,
            offset:0,
            limited:10
        }
    }

    //todo 创建columns,根据类型的不同 作出不同的判断
    createColumns = (columnKeys)=>{

      const col =  columnKeys.map(item=>{
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
        //将前面 固定的 渲染好之后，加一个 操作的渲染
        col.push({
           title:'操作',
           key:'action',
           render: ()=>{
               return (
                   <Button.Group>
                     <Button size='small' type="primary" ghost>编辑</Button>
                     <Button size='small' type="danger" ghost>删除</Button>
                   </Button.Group>
               )
           }
        });
        return col;
    };
    // ajax请求
    getData = ()=>{
        //设置 loading 动画
        this.setState({
            isLoading:true
        });
        getArticle(this.state.offset,this.state.limited) //传入 分页的参数
            .then(res=>{
                // console.log(res.data.list[0]);
                const columnKeys = Object.keys(res.data.list[0]);//获取键名
                const columns = this.createColumns(columnKeys);
                //根据请求 返回的数据，来组成columns,即表格的表头
                //todo 设置 columns 与 dataSource 的内容
                this.setState({
                    total:res.total,
                    dataSource:res.data.list,
                    columns,
                })
            })
            .catch(err=>{
                //处理错误
                console.log(err);
            })
            .finally(()=>{
                this.setState({
                    isLoading:false
                });
            })
    };

    //todo 获取当前分页信息 去请求那一页的数据
    onPageChange = (page,pageSize) =>{
        console.log(page, pageSize);
        this.setState({
            offset :pageSize *(page -1),
            limited:pageSize
        },()=>{
            //todo 点击分页过后，改变传参的数据，进行新的一次请求
            this.getData();  //异步获取 并发送请求
        })
    };

    //todo 可改变当前分页的大小，然后去请求
    onShowSizeChange =(current, size)=>{
        console.log(current, size);
        this.setState({
            offset :0, //每次请求 回到首页
            // offset :size*(current-1), //每次请求 停在当前页
            limited:size
        },()=>{
            this.getData();  //异步获取 并发送请求
        })
    };

    //此生命周期 进行初始化ajax请求
    //todo 进行第一次请求（默认状态）
    componentDidMount(){
        this.getData();
    }


    render() {
        //todo 表格是根据 columns 与 dataSource 来确定表格内容的
        return (
            <Card title="文章列表" bordered={false} extra={<Button>导出Excel</Button>}>
                <Table
                    rowKey={record => {
                        return record.id
                    }}  //表格行 key 的取值
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    loading={this.state.isLoading}  //加载动画 自定义标志
                    pagination={{     //分页设置
                        current: this.state.offset / this.state.limited + 1, //当前页
                        total: this.state.total,
                        hideOnSinglePage: true, //只有一页时是否隐藏分页器
                        // pageSize:10,  //每页条数 若要动态 则不先设置值
                        showQuickJumper: true, //快速跳转到某页
                        showSizeChanger: true, //是否可以改变每页多少条数据
                        onShowSizeChange: this.onShowSizeChange,	//pageSize 变化的回调
                        onChange: this.onPageChange, //页码改变的回调，参数是改变后的页码及每页条数
                        pageSizeOptions:['10','15','30','45']	//指定每页可以显示多少条
                    }}
                />;
            </Card>
        );
    }
}

export default ArticleList;