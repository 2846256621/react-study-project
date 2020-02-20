import React, {Component} from 'react';
import {
    Card,
    Button
} from 'antd'
class Edit extends Component {
    render() {
        console.log(this.props);
        return (
            <Card
                title="编辑文章"
                // title={this.props.location.state.title}   //这样写 刷新就会出错
                bordered={false}
                extra={<Button type="primary" ghost>取消</Button>} //卡片右上角的操作区域
            >

            </Card>
        );
    }
}

export default Edit;