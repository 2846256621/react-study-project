import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import {mainRoutes} from "./routes";
import zhCN from 'antd/es/locale/zh_CN'; //汉语配置
import App from './App'
import './index.less'
import ConfigProvider from "antd/es/config-provider";
render(
    <ConfigProvider locale={zhCN}>
    <Router>
        <Switch>
            <Route path='/admin' render={(nextProps)=>{
                //todo 需要登录才会访问admin
                return <App {...nextProps}/>
            }}/>
            {/*外部同级路由*/}
            {
                mainRoutes.map(route=>{
                    return <Route key={route.pathname}
                                  path={route.pathname}
                                  component={route.component}/>
                })
            }
            <Redirect to='/admin' from='/' exact/>
            <Redirect to='/404'/>
        </Switch>
    </Router>
    </ConfigProvider>,
    document.querySelector('#root')
);