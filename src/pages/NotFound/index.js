import React, {Component} from 'react';
import {
    Card
} from 'antd'

import imgUrl from '../../assets/1.jpg'
class NotFound extends Component {
    render() {

        return (
            <Card>
                 Not Found！
                <img src={imgUrl}/>
            </Card>
        );
    }
}

export default NotFound;
