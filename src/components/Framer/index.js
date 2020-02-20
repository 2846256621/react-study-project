import React, {Component, Fragment} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from '../../assets/logo.png'
import './framer.less'
import {withRouter,Link} from 'react-router-dom'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//具体导航的名称
const breadcrumbNameMap = {
    '/admin':'首页',
    '/admin/dashboard':'仪表盘',
    '/admin/article':'文章管理',
    '/admin/article/edit/':'编辑文章',
    '/admin/settings':'设置',
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
        console.log(this.props);
        //对路径进行切分并去重，存放到this.state.pathSnippets中
        this.state.pathSnippets = this.props.location.pathname.split('/').filter(i => i);
        console.log(this.state.pathSnippets);
        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
            let url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
            return  breadcrumbNameMap[url]
        }) ;
        console.log( this.state.extraBreadcrumbItems);

    };

    componentWillMount() {
        this.getPath();
    }
    render() {

        /**url高亮设计  深层目录，高亮显示的时候，只取前两层，然后 最后再拼接*/
        const selectedKeysArr = this.props.location.pathname.split('/');
        selectedKeysArr.length = 3;

        return (
            <Layout className='yu-content'>
                <Header className="header yu-header">
                    <div className="yu-logo">
                        <img src={logo}/>
                    </div>
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
//使用withRouter 才有 内层的路由信息
export default withRouter(Framer);