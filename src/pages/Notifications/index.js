import React, {Component} from 'react';
import {
    Card,
    Button,
    List,
    Avatar,
    Badge
} from "antd";

class Notifications extends Component {
    data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    render() {
        return (
            <Card title="通知中心" bordered={false} extra={<Button type="primary" ghost>全部标记为已读</Button>}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.data}
                    renderItem={item => (
                        <List.Item extra={<Button type="dashed" >标记为已读</Button>}>
                            <List.Item.Meta
                                avatar={<Badge dot><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>}
                                title={item.title}
                                description="你有一条消息未读，请尽快查收"
                            />
                        </List.Item>
                    )}
                />,
            </Card>
        );
    }
}

export default Notifications;