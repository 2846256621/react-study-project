import React, {Component} from 'react';
import {
    Card
} from 'antd'
class NoAuth extends Component {
    render() {
        return (
            <Card>
                你没有权限查看此页面
            </Card>
        );
    }
}

export default NoAuth;