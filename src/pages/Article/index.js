import React, {Component} from 'react';
import {
    Card,
    Button,
    Table,
    Tag,
    Modal,
    Typography,
    message
} from 'antd'

const { Text } = Typography;
// 引入接口
import {
    getArticle,
    deleteArticle
} from "../../Services";

//格式化时间 moment.js 库
import moment from 'moment'

//导出Excel的库 sheetjs.js
import  XLSX from 'xlsx'

/** 组合columns时  将键名 对应换成中文*/
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
            dataSource : [],  // 文章的list
            columns : [],  //从list中分离出的table 的标头
            total:0,
            isLoading:false,
            offset:0,
            limited:10,
            articleTitle:'',
            deleteModalVisible:false, // 删除弹框的展示
            deleteArticleConfirmLoading:false, //确定按钮上的loading
            deleteArticleId:null,//要删除的id
        }
    }

    /**创建columns,根据类型的不同 作出不同的判断*/
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
        /**将前面 固定的 渲染好之后，加一个 操作的渲染*/
        col.push({
           title:'操作',
           key:'action',
           render: (text,record)=>{
               return (
                   <Button.Group>
                     <Button size='small' type="primary" ghost>编辑</Button>
                     <Button size='small' type="danger" ghost onClick={this.showDeleteArticleModel.bind(this,record)}>删除</Button>
                   </Button.Group>
               )
           }
        });
        return col;
    };

    /**删除弹框*/
    showDeleteArticleModel = (record)=>{
        /**使用函数的方式，定制感不强*/
        // Modal.confirm({
            // title: <Typography>此操作不可逆，请慎重</Typography> ,
            // content: `确定要删除文章《${record.title}》吗？`,
            // okText:'确认删除',
            // cancelText:'我点错了',
            // onOk:()=>{
            //     deleteArticle(record.id)
            //         .then(res =>{
            //             console.log(res);
            //
            //         })
            //         .catch(err=>{});
            // },
            // onCancel:()=>{}
        // });
        this.setState({
            articleTitle:record.title,
            deleteModalVisible:true,
            deleteArticleId:record.id
        })
    };

    /**取消删除 关闭弹框*/
    handleDeleteCancel = ()=>{
        this.setState({
            deleteModalVisible:false
        })
    };

    /**删除文章 根据id*/
    handleDeleteArticle = ()=>{
        console.log(this.state.deleteArticleId);
        this.setState({
            deleteArticleConfirmLoading:true
        });
        deleteArticle(this.state.deleteArticleId)
            .then(res=>{
                message.success(res.data.msg); //显示提示消息

                /**此时分页的时候，是留在当前页还是回到首页  */
                /**若 回到首页*/
                this.setState({
                    offset:0
                },()=>{
                    this.getData(); //重新请求数据
                });
            })
            .catch(err=>{
                message.success('删除文章失败');
            })
            .finally(()=>{
                this.setState({
                    deleteArticleConfirmLoading:false, //确认按钮的loading 取消
                    deleteModalVisible:false  //关闭弹窗
                });
            })
    };

    /**获取文章列表的 发送ajax请求*/
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
                /**设置 columns 与 dataSource 的内容*/
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

    /** 获取当前分页信息 去请求那一页的数据*/
    onPageChange = (page,pageSize) =>{
        // console.log(page, pageSize);
        this.setState({
            offset :pageSize *(page -1),
            limited:pageSize
        },()=>{
            /**点击分页过后，改变传参的数据，进行新的一次请求*/
            this.getData();  //异步获取 并发送请求
        })
    };

    /** 可改变当前分页的大小，然后去请求*/
    onShowSizeChange =(current, size)=>{
        // console.log(current, size);
        this.setState({
            offset :0, //每次请求 回到首页
            // offset :size*(current-1), //每次请求 停在当前页
            limited:size
        },()=>{
            this.getData();  //异步获取 并发送请求
        })
    };

    /** 导出excel  使用xlsx 实际上是前端发送请求，后端返回一个文件下载的地址）*/
    toExcel = () =>{
        console.log('excel');

        /**组合需要导入的数据 成 二维数组*/
        const data = [Object.keys(this.state.dataSource[0])]; /**excel第一行是表头 [["id","title","author","amount","createAt"]]*/

        //excel后面是 数据
        for(let i=0;i<this.state.dataSource.length;i++){
            // data.push(Object.values(this.state.dataSource[i]));
            /**一条条手动 push，时间格式可以修改成正确的*/
            data.push([
               this.state.dataSource[i].id,
               this.state.dataSource[i].title,
               this.state.dataSource[i].author,
               this.state.dataSource[i].amount,
               moment(this.state.dataSource[i].createAt).format('YYYY年MM月DD日 hh:mm:ss')
            ])
        }
        // console.log(data);

        /**导出 excel 操作*/
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

        XLSX.writeFile(wb, `文章导出-${this.state.offset/this.state.limited +1}-${moment().format('YYYY-MM-DD-HH-SS')}.xlsx`)
    };


    /**此生命周期 进行初始化ajax请求  进行第一次请求（默认状态）*/
    componentDidMount(){
        this.getData();
    }

    //渲染
    render() {
        //todo 表格是根据 columns 与 dataSource 来确定表格内容的
        return (
            <Card title="文章列表" bordered={false} extra={<Button onClick={this.toExcel}>导出Excel</Button>}>
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

                <Modal
                    title={<Typography>此操作不可逆，请慎重</Typography>}
                    visible={this.state.deleteModalVisible}
                    onOk={this.handleDeleteArticle}
                    onCancel={this.handleDeleteCancel}
                    confirmLoading={this.state.deleteArticleConfirmLoading}
                >
                    确定要删除文章 <Text type="warning">《{this.state.articleTitle}》</Text>吗？
                </Modal>
            </Card>

        );
    }
}

export default ArticleList;