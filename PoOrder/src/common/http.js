import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';

//import { elIconLoading } from 'element-ui';
//axios.defaults.baseURL = 'http://localhost:8080';
//axios.defaults.baseURL = 'http://192.168.0.167/PublicWebApi/';

//     config.data = qs.stringify(config.data);

// 添加请求拦截器
 var loadinginstace
axios.interceptors.request.use(function (config) {
  console.log(config)
  // 在发送请求之前做些什么
  //console.log("拦截请求")
  let token=localStorage.getItem('ticket')
  if (token) {
         config.headers.Authorization = token; //携带权限参数
       }else{
        router.push({
                 path: '/login'
             })
       }
  if(config.loading==true){
     layer.load(); 
   
};
// loadinginstace=Loading.service({
//        lock: true,
//         spinner: 'el-icon-loading',
//          text: 'Loading',
//         background: 'rgba(0, 0, 0, 0.7)'
// });

  return config;
}, function (error) {
  // 对请求错误做些什么
  Notification.error({
              title: '错误',
              message: error.data.resultmessage,
              duration:1800
            });
      return Promise.reject(error.data.resultmessage);
  //return Promise.reject(error);
});



// 添加响应拦截器
axios.interceptors.response.use(function (response) {


      if(localStorage.getItem("ticket")){
        if(response.config.tip==true){
        if(response.data.resultstatus&&response.data.resultstatus!=0){
           Notification.error({
                                    title: '错误',
                                    message: response.data.resultmessage,
                                    duration:1000
                                 });
      }else{
          Notification.success({
                                title: '成功',
                                message: response.data.resultmessage,
                                duration:800
                             });
      }
     }
      
      }
       if(response.config.loading==true){
       layer.closeAll('loading');
       }
      // setTimeout(function(){
      //   Loading.service().close()
      //  },500)
     
  return response;
}, function (error) {
  // 对响应错误做点什么
        if(error.response.status==401){
         router.push({ 
                path: '/login' 
            })
      }
  return Promise.reject(error);
});

export default axios;
