import actionType from '../actions/actionTypes'

const initState = {
  id:'',
  display:'',
  avatar:'',
  role:'',
  isLogin:false,
  isLoading:false
};

export default (state=initState,action)=>{

    switch (action.type) {
        case actionType.START_LOGIN:
            return{
                ...state,
                isLoading: true
            };
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.userInfo,  //合并传入的userInfo
                isLogin:true, //登录成功
                isLoading:false
            };
        case actionType.LOGIN_FAILED:
            return initState; //登录失败 则返回初始化状态
        default:
            return state
    }
}