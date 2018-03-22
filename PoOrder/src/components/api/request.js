import axios from 'axios';
import router from '../../router'
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';

axios.defaults.baseURL = '';
axios.defaults.headers.common['Authorization'] =localStorage.getItem('ticket')
axios.defaults.headers.post['content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';



let token = localStorage.getItem("ticket"); //获取存储在本地的token


axios.interceptors.request.use(
    config => {

     console.log(config)
       if (token) {
         config.headers.Authorization = token; //携带权限参数
       }

      Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
        return config;
    },
    err => {
        return Promise.reject(err);
    }

);

axios.interceptors.response.use(
    response => {

    	if(response.data.resultstatus&&response.data.resultstatus!=0){
           Notification.error({
                                    title: '错误',
                                    message: response.data.resultmessage,
                                    duration:500
                                 });
    	}else{
          Notification.success({
                                title: '成功',
                                message: response.data.resultmessage,
                                duration:500
                             });
    	}

    	setTimeout(function(){
    	 	Loading.service().close()
    	 },500)

    	//console.log(window.location.href)

        if(response.status == 401) {
            router.push({
                path: '/login'
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.data)
    });


const request= function request(url,method,data) {
  return axios({
  	url:url,
  	method:method,
  	params: data
  })
}

const reLogin=function reLogin(){
	 router.push({
               path: '/login'
            })
}

export {
	request,
	reLogin
}
