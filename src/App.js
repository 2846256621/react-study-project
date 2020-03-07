import React, {Component} from 'react';

import './App.css';
import {connect} from 'react-redux'
import {
    Header,
    TodoList,
    Footer,
} from "./components";
import {getTodoList} from './actions/todos'
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            tag:'ALL',
            todoList:[]
        };
    }

    componentDidMount(){
       this.props.getTodoList();
    }
    changeTodos = (value)=>{
        this.setState({
            tag:value,
            todoList:[],
            todoCount:0
        });

        this.getChangeTodos(value);
    };
    getChangeTodos =(tag)=>{
        if(tag === 'ALL'){
            this.setState({
                todoList:this.props.todoList,
                todoCount:this.props.todoList.length
            });
        }else if(tag === 'ACTIVE'){
            this.setState({
                todoList:this.props.activeTodoList,
            },()=>{
                this.setState({
                    todoCount:this.state.todoList.length
                })
            });

        }else if(tag === 'COMPLETED'){
            this.setState({
                todoList:this.props.completedTodoList,
            },()=>{
                this.setState({
                    todoCount:this.state.todoList.length
                })
            });

        }
    };
    render() {
        console.log(this.state.todoCount);
        return (
          <div className="container">
             <Header/>
                 <div className="content">
                     <TodoList todos={this.state.todoList.length >0?this.state.todoList:this.props.todoList} tag={this.state.tag}/>
                </div>
             <Footer filterTodos={this.changeTodos.bind(this)} todoCount={this.state.todoCount}/>
          </div>
        )
    }
}
const mapState = (state)=>{
    return{
        todoList:state.todos.todoList,
        allTodoList:state.todos.todoList,
        activeTodoList:state.todos.todoList.filter(item=>{return !item.completed}),
        completedTodoList:state.todos.todoList.filter(item=>{return item.completed})
    }
};
export default connect(mapState,{getTodoList})(App);
