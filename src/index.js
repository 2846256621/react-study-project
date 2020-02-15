import React from 'react'
import {render} from 'react-dom'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import {mainRouter} from "./routes";

import App from './App'

render(
    <Router>
        <Switch>
            <Route path='/admin' render={(nextProps)=>{
                //todo 需要登录才会访问admin
                return <App {...nextProps}/>
            }}/>

            {
                mainRouter.map(route=>{
                    return <Route key={route.pathname}
                                  path={route.pathname}
                                  component={route.component}/>
                })
            }
            <Redirect to='/admin' from='/' exact/>
            <Redirect to='/404'/>
        </Switch>
    </Router>,
    document.querySelector('#root')
);