import base from './base'
import http from './http'


export const getTodos = ()=>{
    return http.get(`${base.baseUrl}/getTodoList`);
};
export const addTodos = (data)=>{
    return http.post(`${base.baseUrl}/addTodoList`,{
          data:JSON.stringify(data)
    })
};

