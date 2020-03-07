
import React, {Component} from 'react';
export default class CheckboxItemcomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    _clickHandle(e) {
        this.props.checkAllChoose(!this.state.checked);
        this.setState({
            checked: this.state.checked ? false : true
        });
    }

    componentWillReceiveProps(nextprops) {
        console.log(nextprops.isAuto);
        if (nextprops.isAuto == false) this.state.checked = nextprops.Allchoose;
        if (nextprops.Reverse != this.props.Reverse) {
            this.setState({
                checked: !this.state.checked
            })
        }
    }

    render() {
        return (
            <input type="checkbox" value={this.props.value}
                   checked={this.props.Allchoose ? this.props.Allchoose : this.state.checked} onClick={(e) => {
                this._clickHandle(e)
            }}/>
        )
    }
}