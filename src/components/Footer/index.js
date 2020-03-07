import React, {Component} from 'react';
import './index.css'

class Footer extends Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <footer className="footer"  >
                <span className="todo-count"><strong>{!this.props.todoCount?0:this.props.todoCount}</strong> item left</span>
                <ul className="filters">
                    <li>
                        <a className="selected" href="#" onClick={()=>this.props.filterTodos('ALL')}>All</a>
                    </li>
                    <li>
                        <a className="selected" href="#" onClick={()=>this.props.filterTodos('ACTIVE')}>Active</a>
                    </li>
                     <li>
                         <a className="selected" href="#" onClick={()=>this.props.filterTodos('COMPLETED')}>Completed</a>
                     </li>
                </ul>
                {/*若全都没完成，则隐藏此按钮 */}
                <button className="clear-completed"
                onClick={this.handleClearCompleted}>Clear completed</button>
            </footer>
        );
    }
}
export default Footer;
