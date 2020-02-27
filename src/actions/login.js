import actionTypes from './actionTypes'

import {loginIn} from '../Services'

const startLogin = () =>{
    return{
        type:actionTypes.START_LOGIN
    }
};

//登录成功 参数为成功返回的数据
const  loginSuccess = (userInfo)=>{
    //需要传参给 reducer 进行处理
    return{
      type:actionTypes.LOGIN_SUCCESS,
      payload:{
          userInfo
      }
    }
};

const  loginFailed = ()=>{
    // 登录失败 清除信息
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userInfo");
    window.sessionStorage.removeItem("authToken");
    window.sessionStorage.removeItem("userInfo");
    return{
      type:actionTypes.LOGIN_FAILED
    }
};
/**退出登录
 * 需要告诉服务端已退出登录
 * 这里
 * 使用异步的dispatch
 */
export const loginOut = ()=>{
    return dispatch =>{
        dispatch(loginFailed())
    }
};
/**
 * 1. 在services 中定义 loginIn接口
 * 2. 在actions中 调用services中的此接口，定义传入的参数及回调方法，封装成login方法
 *      将请求成功 返回的数据，传入actions中的 成功的回调函数
 *      成功的回调函数 再将数据以及 type 传给 reducer
 *      在reducer中case 匹配type，进行数据的更新
 * 3. view 层组件调用actions中的login方法，将表单数据作为参数 传入
 * */
export const login = (userInfo)=>{
    return dispatch =>{
        dispatch(startLogin());
        loginIn(userInfo)
            .then(res =>{
                if(res.data.code === "200"){
                    const {
                        authToken,
                        ...userInfo
                    } = res.data.data;

                    //做持久化存储
                    if(userInfo.remember === true){
                        window.localStorage.setItem("authToken",authToken);
                        window.localStorage.setItem("userInfo",JSON.stringify(userInfo));

                    }else{
                        window.sessionStorage.setItem("authToken",authToken);
                        window.sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
                    }
                    dispatch(loginSuccess(res.data.data));
                }
                else{
                    dispatch(loginFailed())
                }
            })

    }
};

/**修改头像*/
export const changeAvatar = (avatarUrl) =>{
  return{
      type:actionTypes.CHANGE_AVATAR,
      payload:{
          avatarUrl
      }
  }
};