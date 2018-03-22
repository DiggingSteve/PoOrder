<template>
      <div>
<div class="top">
  <div class="top-left">
       唯凯订单管理系统
  </div>

  <div class="tabnav-right">
    <div>{{area}}</div>
    <div>项目进度</div>
    <div>{{usrname}}</div>
    <!-- <div><router-link to="/login">退出</router-link></div> -->
    <div @click="loginOut">退出</div>
    <select v-model="locale">
        <option value="English">英文</option>
        <option value="Chinese">中文</option>
      </select>

  </div>

</div>
	 <div class='main'>
	    <div class="main-left" :class="[mainLeftShow?'aniShow':'aniHide']">
        <!-- <div style="height:100px;padding:15px;border-bottom:1px solid #3A4C58"><div style="height:50px;border-bottom:2px solid #728691;font-size:20px;font-weight:900;color:#fff;font-style:italic">唯凯订单管理系统</div></div> -->

      <template v-for="navitem in navArr" v-if="navitem.relations.length>0">
                 <ul  v-show="mainLeftShow">
          <h2 @click="navitem.ifShow = !navitem.ifShow "><i class="el-icon-menu" style="margin-right:8px;"></i>{{navitem.text}}</h2>
          <el-collapse-transition>
          <div v-show="navitem.ifShow">
          <template v-for="(relation,index) in navitem.relations" >
                         			 <li v-bind:id="relation.id" v-bind:class="{checked:index==nowIndex}"  >
  <div  class='level-first' v-show="!relation.redirect"  @click="toggleNav(index)">{{relation.text}}<i :class="[(index==nowIndex)?'el-icon-arrow-up':'el-icon-arrow-down']" style="margin-right:15px;"></i></div>
					<el-collapse-transition>
        <div v-show="index==nowIndex||relation.redirect">
           <ul :class="[relation.redirect?'level-first':'level-first-ul']"  >
             <!-- <li  v-for="(zimenu,index2) in relation.zimenu" @click="toggleZiNav(index2,zimenu.text)" v-bind:class="{Zichecked:zimenu.text==ziIndex}" >{{zimenu.text}}</li> -->
					       <router-link :to="zimenu.temp" v-for="(zimenu,index2) in relation.zimenu">
						         <li  @click="toggleZiNav(index2,zimenu.text,zimenu.temp)" v-bind:class="{Zichecked:zimenu.text==ziIndex}" >{{zimenu.text}}</li>
                  </router-link>
          	</ul>
       </div>
     </el-collapse-transition>
			 </li>

          </template>
          </div>
          </el-collapse-transition>
	      </ul>

      </template>


		</div>


		<div class="displayArrow" :style="{left:!mainLeftShow?0:200+'px'}" >
		     <a class="pngfix" href="javascript:void(0);" @click="ArrowToggle"></a>
		</div>




		 <div class="main-right">
		     <div class="tabNav">
             <router-link :to="item.temp" v-for="(item,index) in tabRel" @contextmenu.prevent.native="openMenu(index,$event)">
			              <span  @click="changeTab(item.text)" v-bind:class="{tabChecked:item.text==tabIndex}" >{{item.text}}
                      <i @click.stop="closeTab(item.text)"   @mouseover="hoverClose(item.text)" @mouseout="hoverClose('')" :class="[item.text==ifClose?'el-icon-close bgnone':'tab-close']" ></i>
                      </span>

            </router-link>
              <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeTags(1)">关闭右侧标签</li>
      <li @click="closeTags(2)">关闭左侧标签</li>
      <li @click="closeTags(3)">关闭其他标签</li>
    </ul>
 <!-- :style="{backgroundColor:(item.text==tabIndex)?'#fff':'#999'}" -->
			    <!-- <span v-for="(val,index) in tabRel" @click="changeTab(val)" v-bind:class="{tabChecked:val==tabIndex}" >{{val}}<i @click.stop="closeTab(val)" class='close'></i></span> -->
			 </div>

           <div class="main-right-content">
			   <keep-alive>
				        <!-- <component v-bind:is="currentView">
				         </component> -->
                 <router-view>
                 </router-view>
			   </keep-alive>
		   </div>

		 </div>
	 </div>
      </div>
</template>

<script>
import router from '../router/index.js'



export default {
  name: 'app',
  data () {
		return {
       locale: 'Chinese' ,
      navArr:[
        {
          system:'po',
          text:"订单系统",
          relations:[
       //   {text:'po订单管理',redirect:"orderTaking",zimenu:[{text:'po订单管理',temp:'orderTaking'}]},
      	// {text:'po业务管理',zimenu:[{text:'po业务新增',temp:'newBusiness'},{text:'po业务确认',temp:'businessConfm'},{text:'po业务查询',temp:'businessQuery'},{text:'费用确认',temp:'costConfirmation'}]}
          ],
          ifShow:true
          }
          ,{
            system:'cz',
            text:'操作系统',
            relations:[
                // {text:'结算管理',zimenu:[{text:'对账管理',temp:'reconciliationMng'}]},
			          // {text:'凭证管理',redirect:"credentialMng",zimenu:[{text:'凭证管理',temp:'credentialMng'}]},
			          // {text:'提交结算',redirect:"submissionStl",zimenu:[{text:'提交结算',temp:'submissionStl'}]}
            ],
            ifShow:false
          }
      ],
			nowIndex:0,//显示的一级导航
			ziIndex:"", //显示的二级导航
			tabRel:[], //标签组
			currentView:'' , // 显示的模板
			tabIndex:'',     //显示的标签页
			mainLeftShow:true,  //是否显示左侧导航
      ifClose:"", //标签页关闭按钮hover样式
      visible: false, //右键标签页关闭菜单
      top: 0,
      left: 0,
      selectedTagIndex:-1, //选择的右键菜单索引
      area:localStorage.getItem('area'),
      usrname:localStorage.getItem('usrname'),


		}
  },
   components: {

  },
  methods:{
	  toggleNav:function(index){
		  //一级导航
     if(this.nowIndex==index){
       this.nowIndex=-1;
     }else{
         this.nowIndex=index;
     }
	  }
	  ,
	  toggleZiNav:function(index,val,temp){
     let tabRel=this.tabRel;
		 this.currentView=this.getCurentView(val); //切换显示模板
		   this.tabIndex=val;
       this.ziIndex=val; //二级导航
       let n=0;
       for(let i in tabRel){
             if(val==tabRel[i].text){
		            n++
		         }
       }
       if(n==0){
                 this.tabRel.push({text:val,temp:temp}) //增加标签页
              //   console.log(this.tabRel)
       }

	  }
	  ,closeTab:function(val){
      //console.log(this.tabRel.length)
     // console.log(this.tabRel)
        if(this.tabRel.length==1){
          return;
        }
      let tabRel=this.tabRel
      for(let i in tabRel){
        if(val==tabRel[i].text){
         tabRel.splice(i,1);
      //   console.log(tabRel)
        }
      }

      this.redirectRoute();
    },
    redirectRoute(){ //重定向路由
         this.ziIndex="";   //去除二级导航选中状态
			 let showTab=this.tabRel[this.tabRel.length-1]
			 this.currentView=this.getCurentView(showTab.text)
       this.tabIndex=showTab.text;
       this.ziIndex=showTab.text;
      //  this.$nextTick(function () {
      //      this.routePush(showTab.temp)
      //  })
      setTimeout(() => {
            this.routePush(showTab.temp)
      }, (0));
    },
    routePush(path){
      console.log(path)
    
     this.$router.push({path:path})
    },
	  changeTab:function(val){
		 this.currentView=this.getCurentView(val); //切换显示模板
		  this.tabIndex=val;
		  this.ziIndex=val;
	  },
	  ArrowToggle:function(){
		this.mainLeftShow=!this.mainLeftShow
	  },
	  getCurentView:function(val,type){
   //默认不传tyep.返回模板英文名称，传tyep,返回模板中文标题
   var relations=[]
   this.navArr.map(function(item){
      relations=relations.concat(item.relations)

   })


          for(var i=0;i<relations.length;i++){
            console.log()
        var menu=relations[i]['zimenu'];
        for(var n=0;n<menu.length;n++){
          if(!type){
              if(menu[n].text==val){
              return menu[n].temp
              }
          }else{
              if(menu[n].temp==val){
               return {text:menu[n].text,index:i}
              }
          }

        }
        }
    }
    ,hoverClose(text){//标签页关闭按钮
              this.ifClose=text;
    }
    ,closeTags(type) {
      //1 右侧 2左侧 3其他
      let index=this.selectedTagIndex;
      let tabRel=this.tabRel
      if(type==1){
          this.tabRel=tabRel.slice(0,index+1)
      }

      if(type==2){
          this.tabRel=tabRel.slice(index,tabRel.length)
      }
      if(type==3){

         this.tabRel=[tabRel[index]]
      }
       this.redirectRoute();


    },
    openMenu(index,e) {
      console.log(index)
      this.visible = true
     this.selectedTagIndex = index
      this.left = e.clientX
      this.top = e.clientY-30
    },
    closeMenu() {
      this.visible = false
    }
    ,loginOut(){//登出
           this.$router.push({path:'/login'})
           localStorage.clear();
           sessionStorage.clear()

    }
    ,createNav(getnav){

              var  getNav=getnav
              var  relations=[] //改系统下的导航目录
              var router=[];
              for(let i in getNav){
                let item=getNav[i]
                let temp=item.auturl.split('.')[0]
                 if(item.auturl!=="admin/frmPoSearch.aspx"){
                           var n=-1;
                         for(let j in relations){
                             let reItem=relations[j];
                             if(reItem.text==item.module){
                                 n=j
                             }
                         }
                         if(n==-1){
                             relations.push({"text":item.module,zimenu:[{text:item.autname,temp:temp,'node':item.node}]})
                               router.push({path:"",component:resolve => require(['./index.vue'], resolve),meta:{title:item.module},children:[{"path":temp,component:(resolve) => require(['./'+temp+'.vue'], resolve),meta:{title:item.autname}}]})
                         }else{
                            relations[n].zimenu.push({text:item.autname,temp:temp,'node':item.node})
                            router[n].children.push({"path":temp,component:(resolve) => require(['./'+temp+'.vue'], resolve),meta:{title:item.autname}})

                         }
                 }
              }
              for(let i in relations){
                if(relations[i].zimenu.length==1){
                     relations[i].redirect=relations[i].zimenu[0].temp
                }
              }
             this.navArr[0].relations=relations

            this.$router.addRoutes(router);
             //this.$router.push({path:'/orderTaking'})


           let temp=this.$route.path.substr(1)
          // alert(temp)
           if(temp=="index"){ //如果是首页，跳转到第一个导航
             temp=relations[0].zimenu[0].temp
              this.$router.push({path:temp})
          }
                let text=this.getCurentView(temp,1).text
                this.nowIndex=this.getCurentView(temp,1).index
                this.toggleZiNav(0,text,temp)


    }

  },

  created:function(){






  },
   mounted(){

      var nav=sessionStorage.getItem('nav')
        if(nav){
          this.createNav(JSON.parse(nav))
        }else{
          this.$axios({method:'get',url:this.$store.state.publicWebApi+'api/UserAut',params:{logname:localStorage.getItem('usrname'),appname:"唯凯订单管理系统",area:"上海",scope:"1"},loading:false,tip:false}).then(res=>{
             res.data.push({"autcode":"SH_POMANAGEMENT_PAGE_BUSINESSUQUER1","autname":"节点","auturl":"BoNode.vue","type":1,"module":"唯凯订单管理","aorder":12,"morder":0,"node":-1});
             this.createNav(res.data);
                sessionStorage.setItem("nav",JSON.stringify(res.data))
            })

//获取全部模板数据
  this.$axios({method:'get',url:this.$store.state.publicWebApi+'api/UserTemplet',params:{logname:localStorage.getItem('usrname'),project:'bomanagement'},loading:false,tip:false}).then(results=>{
     console.log(results.data);
            let res=results.data;
             this.$store.commit('setTableTmpAll',res)
  }).catch(error=>{

  })


  }

  },
  watch:{
    $route(){
     //获取全部模板数据
  this.$axios({method:'get',url:this.$store.state.publicWebApi+'api/UserTemplet',params:{logname:localStorage.getItem('usrname'),project:'bomanagement'},loading:false,tip:false}).then(results=>{
     console.log(results.data);
            let res=results.data;
             this.$store.commit('setTableTmpAll',res)
  }).catch(error=>{

  })

    }
    ,
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
    locale(val){
      console.log(val)
            this.$i18n.locale=val
    }
  }

}
</script>

<style lang="less" scoped>
// @first-nav-bg:#4B616F; //一级导航
// @zi-nav-bg:#3A4C58; //顶部栏 二级导航 导航标签
// @zi-nav-hover-bg:#2C3B43; //子导航hover

@first-nav-bg:#304156; //一级导航
@zi-nav-bg:#1F2D3D; //顶部栏 二级导航 导航标签
@zi-nav-hover-bg:#021629; //子导航hover


@first-nav-font-color:#fff;
@zi-nav-font-color:rgb(191, 203, 217);
@zi-nav-text-color:#409eff; //子导航选中颜色

body{
  margin:0px;
  height:100%;
  overflow:hidden;
}
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
*{
padding:0px;
margin:0px;
}
li{
list-style:none
}

.top{
 position:relative;
 height:45px;
 line-height:45px;
 text-align:left;
 background-color:@zi-nav-bg;

 font-weight:999;
 text-indent:15px;
 color:#fff;

}
.top-left{
 // font-style: italic;
   font-size:20px;
}
.tabnav-right{
   position:absolute;
   right:0px;top:0px;margin-right:20px;
   height:100%;
   display: flex;

   justify-content: space-around;
   align-items: center;
   z-index: 1000;


}
.main{
  display:flex;
  position:absolute;
  top:45px;
  width:100%;
  overflow:hidden;
  bottom:0px;
}
.main-left{
   flex-shrink: 0;
  width:200px;
  height:100%;
  overflow:scroll;
  overflow-x:hidden;
  overflow-y:auto;
  background:@first-nav-bg;
 -webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Chrome/Safari/Opera */
-khtml-user-select: none; /* Konqueror */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently
not supported by any browser */
}
.main-right{
  flex:1;
  border-left:1px solid #ccc;
  // min-width:1170px;


}
.main-right-content{
    height: 100%;
   padding:15px 20px;
   padding-bottom: 60px;
    overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
}
.level-first{
  height:56px;
  line-height:56px;
 display: flex;
 align-items: center;
 justify-content: space-between;
  font-size:14px;
  text-indent:35px;
  cursor:pointer;
  border-bottom: 1px solid #3A4C58;
  color:@first-nav-font-color;
   white-space: nowrap;
}
.level-first-ul{

  background-color:@zi-nav-bg;
}
.level-first-ul li{
  height:40px;
  line-height:40px;
  text-align:left;
  font-size:14px;
  text-indent:35px;
  cursor:pointer;
  color:@zi-nav-font-color;
}
.level-first-ul li:hover{
  background: @zi-nav-hover-bg;
}
.checked{
	  display:block;
 }
.nochedked{
     display:none;
}

.tabNav{
  text-align:left;
  background-color:#fff;
  height:40px;
  line-height: 40px;
  border-bottom:1px solid #ccc;
  //position: fixed;
  width: 100%;
  white-space: nowrap;
  //  z-index: 1000;
  -webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Chrome/Safari/Opera */
-khtml-user-select: none; /* Konqueror */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently
not supported by any browser */
}
.tabNav span{
  min-width:108px;
  height:26px;
  line-height:26px;
  display:inline-block;
  color:#333;
  text-align:center;
  cursor:pointer;
  padding-left:5px;
  padding-right:5px;
  background-color:#F9F9F9;
  border-radius: 15px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-left:8px;
 font-size:12px;

}
.tabNav span i{
  width:10px;
  height: 10px;
  display:inline-block;
  margin-left:3px;
  cursor:pointer;
}
.bgnone{
   transform: scale(0.8,0.8)
}
.tabNav .tabChecked .bgnone{
  background-color:#1F2D3D;
}
.tab-close{
  border-radius: 50%;
  background-color: #999;
}
.level-first-ul .Zichecked{
     color:@zi-nav-text-color!important;
}
.Zichecked{
   color:@zi-nav-text-color!important;
}
.tabNav .tabChecked{

  background:@zi-nav-bg;
  border-radius: 15px;
  color:#fff;
  border: 1px solid #3A4C58;
}
.tabNav .tabChecked i{
  background-color: #fff;
}


.displayArrow{
    position: absolute;
    top: 45px;
    bottom: 0;
    width: 0px;
    height: 100%;
    z-index: 10;
    transition:left 0.2s ease 0s;
}
.pngfix{
    position: absolute;
    display: block;
    width: 17px;
    height: 61px;
    top: 50%;
    margin-top: -30px;
    outline: none;
	background:url('../../static/images/icon_arrow.png') no-repeat 0 0;
}
.pngfix:hover{
  background-position:right 0px;
 }



.noselect {
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Chrome/Safari/Opera */
-khtml-user-select: none; /* Konqueror */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently
not supported by any browser */
}
  .contextmenu {
    margin: 0;
    background: #eee;
    z-index: 2;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    z-index: 2000

  }
     .contextmenu li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #ccc;
      }
    }
    h2{
      text-indent:5px;
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
       white-space: nowrap;
    }
    .level-first a{
      color:#fff
    }
.aniShow{
  width:200px;
  transition:width 0.2s ease 0s;
}
.aniHide{
  width:0px;
  transition:width 0.2s ease 0s;
}
</style>









