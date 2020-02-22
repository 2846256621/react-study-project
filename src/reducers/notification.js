
import actionTypes from '../actions/actionTypes'
const initState = {
    isLoading:false,
    list:[{
        id:1,
        title:'Lorem ipsum dolor sit',
        desc:'11你有一条消息未读，请尽快查收',
        hasRead:false
    },{
        id:2,
        title:'Lorem ipsum dolor sit',
        desc:'22你有一条消息未读，请尽快查收',
        hasRead:false
    },{
        id:3,
        title:'Lorem ipsum dolor sit',
        desc:'33你有一条消息未读，请尽快查收',
        hasRead:true
    },{
        id:4,
        title:'Lorem ipsum dolor sit',
        desc:'44你有一条消息未读，请尽快查收',
        hasRead:false
    },]
};

export default (state=initState,action) =>{
    switch (action.type) {
        /**得到actions里面传过来的通知列表数据，进行处理*/
        case actionTypes.RECEIVED_NOTIFICATION_LIST:
            return{
                ...state,
                list:action.payload.list
            };

        /**标记为已读*/
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(item =>{
               if(item.id === action.payload.id){
                   item.hasRead = true;
               }
               return item;
            });
            return {
                ...state, //原有数据
                list:newList //修改数据
            };
        /**全部标记为已读*/
        case actionTypes.MARK_ALL_NOTIFICATION_AS_READ_BY_ID:
            return {
                ...state, //原有数据
                list:state.list.map(item =>{
                    item.hasRead = true;
                    return item;
                })
            };
        /**开始修改状态 loading*/
        case actionTypes.START_MARK_AS_READ:
            return{
                ...state,
                isLoading: true
            };
        /**完成修改 loading*/
        case actionTypes.FINISH_MARK_AS_READ:
            return{
                ...state,
                isLoading: false
            };

        default:
            return state;
    }
}