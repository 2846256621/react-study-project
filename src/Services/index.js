import axios from 'axios'
import {
    message
} from 'antd'
// const isDev = process.env.NODE_ENV = 'development';
const services = axios.create({
    baseURL:'http://rap2api.taobao.org/app/mock/244572'
});

//全局拦截器
services.interceptors.request.use((config)=>{
    config.data = Object.assign({},config.data,{
       // authToken:window.localstorage.getItem('authToken')
       authToken:'isToken'
    });
    return config
});

services.interceptors.response.use((res)=>{
    if(res.data.code === 200){
        return res.data
    }else{
        //全局处理错误
        message.error(res.data.errMsg)
    }
});

/**传入分页参数 后端 的默认传参为 {offset: 0, limited: 10, authToken: "isToken"}*/
/**获取文章列表*/
export const getArticle = (offset=0,limited=10)=>{
    return services.post('/api/v1/articleList',{
        offset,
        limited
    })
};

/**通过id删除文章*/
export const deleteArticle = (id)=>{
    return services.post('/api/v1/articleDelete/id',{
        id
    })
};

/**通过id 获取文章*/
export const getArticleById = (id)=>{
    return services.post('/api/v1/article/id',{
        id
    })
};

/**修改之后 保存文章*/
export const saveArticle = (data)=>{
    return services.post('/api/v1/articleEdit/:id',data)
};