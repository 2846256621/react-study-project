import React, {Component, Fragment} from 'react';
import {
    Button,
    Spin,
    Timeline
} from 'antd'

//装饰器模式配置
const testHOC = (WrappedComponent) =>{
    return class HOCComponent extends Component{
        render(){
            return<Fragment>
                <WrappedComponent/>
                <div>这是高阶组件里的信息</div>
            </Fragment>
        }
    }
};

// @testHOC
class App extends Component {
    render() {
        return (
            <div>
                <Button type="primary">Primary</Button>
                <Timeline>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>,
                <Spin>用于页面和区块的加载中状态。 何时使用#
                    页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。</Spin>
            </div>
    )
        ;
    }
}

export default testHOC(App);

