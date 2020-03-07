import axios from 'axios';

const instance = axios.create({
    timeout:1000*12
});
instance.interceptors.request.use(
    config =>{
        return config;
    },
    error =>{
        Promise.error(error);
    }
);
instance.interceptors.response.use(
    res => res.status === 200 ?Promise.resolve(res):Promise.reject(res),
    error =>{
        const { response } = error;
        if(response){
            return Promise.reject(response);
        }
        else{

        }
    }
);
export default instance;