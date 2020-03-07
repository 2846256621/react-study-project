import actionType from '../actions/actionTypes'

const initState = {
    todoList:[],
    isAllChecked:false
};

export default (state=initState,action)=>{
    switch (action.type) {
        case actionType.GET_TODOS_SUCCESS:
            return {
                ...state,
                todoList: action.payload.todoList
            };
        case actionType.ADD_TODOS_SUCCESS:
            return{
                ...state,
                todoList:action.payload.todoList
            };
        case actionType.DELETE_TODOS:
            let newTodos = state.todoList.filter(item=>{
                return item.id !== action.payload.id
            });
            return{
                ...state,
                todoList:newTodos
            };
        // case actionType.SELECT_ALL_TODOS:
        //     let tempTodos  = JSON.parse(JSON.stringify(state.todoList)) ;
        //     const newTodos = tempTodos.map(item=>{
        //        item.completed = action.payload.checked;
        //        return item;
        //     });
        //     return{
        //         ...state,
        //         todoList:newTodos
        //     };
        // case actionType.GET_TODOS_CHECKED:
        //     const newData = state.todoList.map((item) =>
        //         action.id === item.id ? {
        //             ...item,
        //             completed: action.completed
        //         } : item
        //     );
        //     return {
        //         ...state,
        //         todoList:newData
        //     };
        default:
            return state
    }
}