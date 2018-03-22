import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
// import orderTaking  from '@/components/orderTaking.vue'
// import newBusiness  from '@/components/newBusiness.vue'
// import businessConfm  from '@/components/businessConfm.vue'
// import businessQuery  from '@/components/businessQuery.vue'
// import costConfirmation  from '@/components/costConfirmation.vue'
// import reconciliationMng  from '@/components/reconciliationMng.vue'
// import credentialMng  from '@/components/credentialMng.vue'
// import submissionStl  from '@/components/submissionStl.vue'
// import businessUconfm  from '@/components/businessUconfm.vue'
// import businessUquery  from '@/components/businessUquery.vue'

// import axios from '../common/http'

// console.log(1111111111111)


//        var that=this;
//        axios.get('/api/navData').then(function(res){
//               console.log(res.data);


//           }).catch(function(err){
//                 console.log(err);
//           });


Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      redirect:"login",
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
     },
    {
      path: '/index',
      name: 'index',
      component: index,
    //  redirect: "/orderTaking"
     },
        // {
        //   path:"",
        //   component:index,
        //   redirect:"/orderTaking",
        //   system:"po",
        //   meta:{
        //     title:"po订单管理"
        //   },
        //   children:[
        //     {
        //       path:'/orderTaking',
        //       component:orderTaking,
        //       meta:{
        //         title:"po订单管理"
        //       }
        //     }
        //   ]
        // },
          // {
          //   path: '',
          //   component: index,
          //   system:"po",
          //   meta: {
          //     title: 'po业务管理',
          //     icon: 'form'
          //   },
          //   children: [
          //     {
          //       path: 'newBusiness',
          //       component: newBusiness,
          //       meta: {
          //         title: 'po业务新增'
          //       }
          //     },

          //     {
          //       path: 'businessConfm',
          //       component: businessConfm,
          //       meta: {
          //         title: 'po业务确认',
          //         icon: 'table'
          //       }
          //     },
              //  {
              //    path: 'businessUconfm',
              //    component: businessUconfm,
              //    meta: {
              //      title: 'po业务未确认',
              //      icon: 'table'
              //    }
              //  },
              //   {
              //     path: 'businessUquery',
              //     component: businessUquery,
              //     meta: {
              //       title: 'po业务未分配',
              //       icon: 'table'
              //     }
              //   },


              // {
              //   path: 'businessQuery',
              //   component: businessQuery,
              //   meta: {
              //     title: 'po业务查询',
              //     icon: 'table'
              //   }
              // },

              // {
              //   path: 'costConfirmation',
              //   component: costConfirmation,
              //   meta: {
              //     title: '费用确认',
              //     icon: 'table'
              //   }
              // }

        //     ]
        //   },

        // {
        // path: '',
        // component: index,
        // system:"cz",
        // meta: {
        //   title: '结算管理',
        //   icon: 'form'
        // },
        // children: [
        //   {
        //     path: 'reconciliationMng',
        //     component: reconciliationMng,
        //     meta: {
        //       title: '对账管理'
        //     }
        //   },

        //   { path: 'credentialMng', component: credentialMng, meta: { title: '凭证管理', icon: 'table' }},
        //   { path: 'submissionStl', component: submissionStl, meta: { title: '提交结算', icon: 'table' }}
        // ]
     // }
  ]
})
