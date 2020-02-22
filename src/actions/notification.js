import actionTypes from './actionTypes'
import {getNotifications} from '../Services'
//修改通知时 状态加载
const startMarkAsRead = () =>{
    return{
        type:actionTypes.START_MARK_AS_READ
    }
};
const finishMarkAsRead = () =>{
    return{
        type:actionTypes.FINISH_MARK_AS_READ
    }
};

/**标记已读，异步*/
export const markNotificationReadById = (id) =>{

    // console.log(id);
    return dispatch =>{
        dispatch(startMarkAsRead());
        //在这里发送一个服务端的请求 修改通知的状态
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload:{
                    id
                }
            });
            dispatch(finishMarkAsRead())
        },1000)
    }
};

/**全部标记为已读*/
export const markALLNotificationRead = () =>{

    return dispatch =>{
        dispatch(startMarkAsRead);
        //todo 在这里发送一个服务端的请求，只是用setTimeout 模拟发了ajax
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATION_AS_READ_BY_ID
            });
            dispatch(finishMarkAsRead())
        },1000)
    }
};

/**去请求 通知消息列表*/
export const getNotificationList = () =>{

    return dispatch =>{
        dispatch(startMarkAsRead);
        //发送请求 得到通知列表 新建一个actionTypes 是为了传参给 reducer
        getNotifications()
            .then(res=>{
                dispatch({
                   type:actionTypes.RECEIVED_NOTIFICATION_LIST,
                   payload:{
                       list:res.data.list
                   }
                });
                dispatch(finishMarkAsRead())
            })
    }
};