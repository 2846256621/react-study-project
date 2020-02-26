import actionType from '../actions/actionTypes'

//是否登录的标志
const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'));
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) ||  JSON.parse(window.sessionStorage.getItem('userInfo'));
const initState = {
    ...userInfo,  //初始化返回的数据
    isLogin:isLogin,
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
            return {
                //登录失败 则返回初始化状态,重新定义,而不是开始就获取的
                id:'',
                avatar:'',
                displayName:'',
                isLogin:false,
                isLoading:false,
                role:''
            };
        default:
            return state
    }
}