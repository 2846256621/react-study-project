import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import {mainRoutes} from "./routes";
import zhCN from 'antd/es/locale/zh_CN'; //汉语配置
import App from './App'
import './index.less'
import ConfigProvider from "antd/es/config-provider";

//使用redux
import store from './store'
import {Provider} from 'react-redux'

render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router>
        <Switch>
            <Route path='/admin' render={(nextProps)=>{
                //权限 需要登录才会访问admin
                // return store.getState().login.isLogin ? <App {...nextProps}/> : <Redirect to='/login'/>
                //上面写法比较复杂，可以在App里面做权限认证
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
        </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
);