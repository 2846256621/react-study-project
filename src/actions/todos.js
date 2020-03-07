import actionType from './actionTypes'
import {getTodos,addTodos} from '../api/todos'


export const getTodoList = ()=>{
    return dispatch =>{
        getTodos()
            .then(res=>{
                if(res.data.code === 200){
                    // console.log(res.data);
                    dispatch({
                        type: actionType.GET_TODOS_SUCCESS,
                        payload: {
                            todoList:res.data.todos
                        }
                    });
                }
            })
    }
};

export const addTodoList = (data)=>{
  return dispatch =>{
      addTodos(data)
          .then(res=>{
              // console.log(res.data);
              dispatch({
                  type:actionType.ADD_TODOS_SUCCESS,
                  payload: {
                      todoList: res.data.todos
                  }
              })
          })
  }
};

export const deleteTodos = (id)=>{
    return dispatch =>{
        dispatch({
            type:actionType.DELETE_TODOS,
            payload:{
                id,
            }
        })
    }
};
export const getTodosCheck = (status)=>{
    return dispatch =>{
        dispatch({
            type:actionType.GET_TODOS_CHECKED,
            payload:{
                id:status.id,
                completed:status.checked
            }
        })
    }
};
export const selectAllTodos = (checked)=>{
    return dispatch =>{
        dispatch({
            type:actionType.SELECT_ALL_TODOS,
            payload:{
                checked
            }
        })
    }
};