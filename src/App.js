import React, {Component, Fragment} from 'react';

import {Route,Switch,Redirect} from 'react-router-dom'
import {adminRoutes} from './routes'

import{ Framer} from './components'
//装饰器模式配置 高阶组件
// const testHOC = (WrappedComponent) =>{
//     return class HOCComponent extends Component{
//         render(){
//             return<Fragment>
//                 <WrappedComponent/>
//                 <div>这是高阶组件里的信息</div>
//             </Fragment>
//         }
//     }
// };

// @testHOC

const menus = adminRoutes.filter(route => route.isNav === true);
class App extends Component {
    render() {
        return (
                <Framer menus={menus}>
                    <Switch>
                        {
                            adminRoutes.map(route=>{
                                return(
                                    <Route
                                        key={route.pathname}
                                        path={route.pathname}
                                        exact={route.exact}
                                        render={(routerProps)=>{
                                                return <route.component {...routerProps}/>
                                            }
                                        }
                                    />
                                )
                            })
                        }
                        <Redirect to={adminRoutes[0].pathname} from='/admin' exact/>
                        <Redirect to='/404'/>
                    </Switch>
                </Framer>
         );
    }
}

export default App;

