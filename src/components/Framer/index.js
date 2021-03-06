import React, {Component, Fragment} from 'react';
import {
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Dropdown,
    Avatar,
    Badge
} from 'antd';
import logo from '../../assets/logo.png'
import './framer.less'
import {withRouter,Link} from 'react-router-dom'

import {connect} from  'react-redux'  //连接redux


//从actions 中引入方法 ，并注入props
import {getNotificationList} from '../../actions/notification'

import {loginOut} from '../../actions/login'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


//具体导航的名称
const breadcrumbNameMap = {
    '/admin':'首页',
    '/admin/dashboard':'仪表盘',
    '/admin/article':'文章管理',
    '/admin/settings':'设置',
    '/admin/article/edit':'编辑文章',
    '/admin/notifications':'通知中心'
};
class Framer extends Component {
    constructor(){
        super();
        this.state = {
            pathSnippets: null,
            extraBreadcrumbItems: [],
        }

    }
    //侧边导航
    onMenuClick = ({ key})=>{
        this.props.history.push(key)
    };

    //面包屑导航
    getPath = () => {
        //对路径进行切分并去重，存放到this.state.pathSnippets中
        this.state.pathSnippets = this.props.location.pathname.split('/').filter(i => i);

        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        this.state.extraBreadcrumbItems = this.state.pathSnippets.map((item, index) => {
            let url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
            return  breadcrumbNameMap[url]
        }) ;
        this.state.extraBreadcrumbItems.length = 3; //编辑文章时，后面的id 省略

    };

    componentDidMount() {
        this.getPath(); //面包屑导航
        this.props.getNotificationList(); //去得到通知列表
    }

    /** onClick	点击 MenuItem 调用此函数	function({ item, key, keyPath, domEvent })*/
    onDropMenuClick = ({key})=>{

        if(key === '/admin/logout'){
            this.props.loginOut(); //退出登录
        }
        else
         this.props.history.push(key)
    };

    //渲染下拉菜单
    dropDownMenu = ()=>{
        return (
            <Menu onClick={this.onDropMenuClick}>
            {/*key	item 的唯一标志*/}
            <Menu.Item key="/admin/notifications">
                <Badge dot={Boolean(this.props.notificationCount)}>
                    通知中心
                </Badge>
            </Menu.Item>
            <Menu.Item  key="/admin/settings">
                个人设置
            </Menu.Item>
            <Menu.Item  key="/admin/logout" >
                退出登录
            </Menu.Item>
        </Menu>)
    };
    render() {
        // console.log(this.props);
        /**url高亮设计  深层目录，高亮显示的时候，只取前两层，然后 最后再拼接*/
        const selectedKeysArr = this.props.location.pathname.split('/');
        selectedKeysArr.length = 3;

        return (
            <Layout className='yu-content'>
                <Header className="header yu-header">
                    <div className="yu-logo">
                        <img src={logo}/>
                    </div>

                    <Dropdown overlay={this.dropDownMenu}>
                        <span onClick={e => e.preventDefault()}>
                            <Avatar  src={this.props.avatar} style={{marginRight:10 }} />
                            <span>欢迎您！{this.props.displayName}</span>
                            <Badge count={this.props.notificationCount} offset={[-8,-10]}>
                                <Icon type="down" />
                            </Badge>
                        </span>
                    </Dropdown>

                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            selectedKeys={[selectedKeysArr.join('/')]}  //高亮选择 深层目录 只截取前两层
                            onClick={this.onMenuClick} //antd 提供的方法
                            style={{ height: '100%', borderRight: 0 }}>
                            {
                                //渲染侧边导航
                                this.props.menus.map(item=>{
                                    return (<Menu.Item key={item.pathname}>
                                                <Icon type={item.icon} />
                                                {item.title}
                                            </Menu.Item>)
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>

                        <Breadcrumb className="yu-bread" onClick={this.getPath()}>
                            {
                                this.state.extraBreadcrumbItems.map(item=>{
                                    return <Breadcrumb.Item key={item}>
                                            {item}
                                    </Breadcrumb.Item>
                                })
                            }
                         </Breadcrumb>

                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0
                            }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
const mapState = (state)=>{
  return{
      notificationCount: state.notification.list.filter(item =>{return item.hasRead===false}).length,  //通知条数
      avatar:state.login.avatar,
      displayName :state.login.displayName
  }
};
//使用withRouter 才有 内层的路由信息
export default connect(mapState,{getNotificationList,loginOut})(withRouter(Framer));