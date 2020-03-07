import React, {Component} from 'react';
import {connect} from 'react-redux'
import './index.css'
import {getTodosCheck,deleteTodos} from '../../actions/todos'

class TodoList extends Component {
    // handleChange = (id,e)=>{
    //     console.log(this.props.todos);
    //     this.props.getTodosCheck({
    //         checked:e.target.checked
    //     })
    // };
    constructor(){
        super();

    }
    componentDidMount(){
    }
    handleDelete(id){
        // console.log(id);
        this.props.deleteTodos(id)
    }
    render() {
        console.log(this.props);
        return (
            <section className="main">
                <ul className="todo-list">
                    {

                        this.props.todos.map(item=>{
                            return(
                                <li key={item.id}>
                                    <div className="view">
                                        <label>
                                            <input className="toggle-check" type="checkbox"
                                                   defaultChecked={item.completed}
                                                   // onChange={this.handleChange.bind(this)}
                                            />
                                        </label>

                                        {/*双击修改*/}
                                        <label>{item.title}</label>

                                        <button className="destroy" onClick={this.handleDelete.bind(this,item.id)}/>
                                    </div>
                                    {/*编辑框   因为这里可以取消编辑 不保存 所以不双向绑定数据*/}
                                    <input className="edit" type="text"/>
                                </li>
                            )
                        })
                    }

                </ul>
        </section>
        );
    }
}
const mapState = (state)=>{
    return{

    }
};

// export default TodoList;
export default connect(mapState,{getTodosCheck,deleteTodos})(TodoList);