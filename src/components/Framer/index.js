import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from '../../assets/logo.png'
import './framer.less'
import {withRouter} from 'react-router-dom'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class Framer extends Component {
    //侧边导航
    onMenuClick = ({ key})=>{
        this.props.history.push(key)
    };
    //面包屑导航
    renderBreadcrumb() {
        const items = this.props.menus.map((route, idx) => {
            return <Breadcrumb.Item key={idx}>{route.title}</Breadcrumb.Item>;
        });
        return <Breadcrumb>{items}</Breadcrumb>;
    };
    render() {
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
                            selectedKeys={[this.props.location.pathname]}  //高亮选择
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
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {this.renderBreadcrumb()}
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