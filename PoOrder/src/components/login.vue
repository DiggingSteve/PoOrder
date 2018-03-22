<template>
<!-- <div>
      <div class="box" >
          <div><input type="text" value="admin"></div>
          <div><input type="password" value="txjet2202"><br></div>
          <div><input type="button" value="登录" @click="login" style="width:232px;"></div>

      </div>
  </div> -->
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>

        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"  @keyup.enter.native="login"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </el-form>
        </div>




    </div>

</template>

<script>


export default{
  data(){
       return {
                ruleForm: {
                    username: 'admin',
                    password: 'txjet2202'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
   },
   methods:{


     login(){
       var that=this;
	    this.$axios({method:'get',url:this.$store.state.publicWebApi+'api/UserLogin',params: {usrname:that.ruleForm.username,pwd:that.ruleForm.password},loading:true,tip:true})

	.then(response=>{

                            
                       if(response.data.resultstatus==0){
                         this.$router.push({path:'/index'})
                         localStorage.setItem('ticket' ,response.data.ticket)
                        localStorage.setItem('area' ,response.data.area)
                        localStorage.setItem('usrname' ,response.data.logname)
                       }
                      
    // that.mountRouter()
         this.getGroupid()


        }).catch(function(err){
           console.log(err);
       });

   }

          ,getGroupid(){//获取全部groupid
            this.$axios({method:'get',url:this.$store.state.publicWebApi+'api/PubTypeCode',params:{groupid:-1},loading:false,tip:false}).then(res=>{
              // console.log('groupType')
              localStorage.setItem("groupType",JSON.stringify(res.data))
            })
          }

          }
    ,created(){
     var that=this
    document.onkeydown = function(e){
    if(!e) e = window.event;
    if((e.keyCode || e.which) == 13){
    that.login()
    }
}
      
 
     
   //document.getElementByIdx_x("input1").click(); //调用登录按钮的登录事件
}

   ,mounted () {

   }

}
</script>

<style scoped>
/* .box{
  display:flex;align-items:center;justify-content:center;flex-direction:column;position:absolute;top:0px;width:100%;height:100%;
  background-color: #304156;
}
.box div{
  color:#fff;
  font-size: 20px;
   margin-top:12px;

} */
    .login-wrap{
      position: absolute;
        background-color: #304156;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:380px;
        height:230px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
       .ms-login .el-input__inner{
      height:40px;
      line-height: 40px;
    }
</style>









