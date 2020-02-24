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
  return{
      type:actionTypes.LOGIN_FAILED
  }
};

export const login = (userInfo)=>{
    return dispatch =>{
        dispatch(startLogin());
        loginIn(userInfo)
            .then(res =>{
                if(res.data.code === "200"){
                    dispatch(loginSuccess(res.data.data));
                }
                else{
                    dispatch(loginFailed())
                }
            })

    }
};