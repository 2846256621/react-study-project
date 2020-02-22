import React, {Component} from 'react';
import {
    Card,
    Button,
    List,
    Avatar,
    Badge,
    Spin
} from "antd";

import {connect} from  'react-redux'  //连接redux


//标记已读
import {
    markNotificationReadById,
    markALLNotificationRead
} from "../../actions/notification";

class Notifications extends Component {

    render() {
        console.log(this.props); //有dispatch 表示连接store成功
        return (
            <Spin spinning={this.props.isLoading}>
            <Card title="通知中心" bordered={false}
                  extra={<Button type="primary" ghost
                         disabled={this.props.list.every(item =>item.hasRead === true)}
                         onClick={this.props.markALLNotificationRead}
                        >全部标记为已读</Button>
                  }
            >
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                        /**通过 redux 来做 标记已读功能
                         * 在actions中进行传参设计
                         * reducer中进行处理
                         * */
                        <List.Item extra={item.hasRead ?
                            null :
                            <Button type="dashed"
                                    onClick={this.props.markNotificationReadById.bind(this,item.id)} >标为已读</Button>}>
                            <List.Item.Meta
                                avatar={<Badge dot={!item.hasRead}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></Badge>}
                                title={item.title}
                                description={item.desc}
                            />
                        </List.Item>
                    )}
                />,
            </Card>
            </Spin>
        );
    }


}
const mapState = (state) =>{
    const {
        list = [],
        isLoading
    } = state.notification;
    return{
        list,   //往 this.props中 注入数据
        isLoading
    }
};

/** 通过connect 将这些方法直接加入 this.props*/
export default connect(mapState,{markNotificationReadById,markALLNotificationRead})(Notifications);