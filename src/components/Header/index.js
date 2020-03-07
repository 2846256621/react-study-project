import React, {Component} from 'react';
import './index.css'

//要调用 actions 就必须先建立 redux 连接
import {connect} from 'react-redux'
import { addTodoList,selectAllTodos} from '../../actions/todos'
class Header extends Component {

    keyEnter = (e)=>{
      if(e.keyCode === 13){
          //action中调用接口，然后进行请求，返回数据给reducer，去更新数据
          //组件传入数据给action，然后去触发reducer 进行数据更新
          this.props.addTodoList({
              id:this.props.todoCount+1,
              title:e.target.value,
              completed:false
          });
          e.target.value = '';
      }
    };
    handleCheckAll = (e)=>{
        this.props.selectAllTodos(e.target.checked)
    };
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <div className="header-content">
                    <input id="toggle-all"
                           className="toggle-all"
                           type="checkbox"
                           onChange={this.handleCheckAll}
                    />
                    <label id="check-all"/>

                    <input className="new-todo"
                        ref="newTodo"
                        placeholder="What needs to be done?"
                        onKeyDown={this.keyEnter.bind(this)}
                    />
                </div>
            </header>
        )
    }
}
const mapState = (state)=>{
  return {
      todoCount:state.todos.todoList.length,
  }
};
export default connect(mapState,{addTodoList,selectAllTodos})(Header);