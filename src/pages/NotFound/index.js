import React, {Component} from 'react';
import imgUrl from '../../assets/1.jpg'
class NotFound extends Component {
    render() {

        return (
            <div>
                 404
                <img src={imgUrl}/>
            </div>
        );
    }
}

export default NotFound;
