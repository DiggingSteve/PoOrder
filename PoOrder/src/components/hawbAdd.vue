<template>
  <div>
   <!-- <h2>表格31</h2>
     <input type='text'> -->
     <div v-if="nextService==0">
        <div style="border:1px solid #304156;margin-bottom:18px;">
           <p class="mawbInfo" style="margin-bottom:20px;">请填写以下内容
     <!--   <el-button @click="show1=!show1" style="float:right;height:10px;line-height:3px;">收缩</el-button> -->
           </p>
    
           <formcompt :input-view-data="inputViewData" @wtdataP="wtdataP"></formcompt>
        </div>

    <div style="border:1px solid #304156;margin-bottom:18px;padding-bottom:30px;">
       <p class="mawbInfo" style="margin-bottom:20px;">您需要唯凯提供哪些服务？
     <!--   <el-button @click="show1=!show1" style="float:right;height:10px;line-height:3px;">收缩</el-button> -->
       </p>

       <div style="padding-bottom:20px;width:900px;margin:10px auto 0" class="nofloat">
            <div style="float:left">
               <p style="color:#304156;font-size:14px;letter-spacing:0.1em;">始发港服务(PVG)</p>
               <p style='width:80px;border:1px solid #304156;margin-top:8px;margin-bottom:20px;'></p>

                <div style="margin-bottom:30px;" v-for="item in service.sfg">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">{{item.servicename}}:</span>
                 <el-checkbox v-model="item.model" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;positon:relative">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(item.id)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowName==item.id" style="width:160px;position:absolute;margin-left:80px;margin-top:-20px;">
                              <el-input type="textarea" @click.native.stop="textShowName=item.id" v-model="item.model2"></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>


            <!-- <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">分标签制作:</span>
                 <el-checkbox v-model="service.fbqzz" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(1)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==1" style="width:300px">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>

            <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">报关服务:</span>
                 <el-checkbox v-model="service.bgfw" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(2)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==2" style="width:300px">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>

            <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">仓库服务:</span>
                 <el-checkbox v-model="service.ckfw" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(3)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==3" style="width:300px">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>

            <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">卡车服务:</span>
                 <el-checkbox v-model="service.kcfw" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(4)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==4" style="width:300px">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div> -->
        </div>
        
         
        <div style="float:right;">
               <p style="color:#304156;font-size:15px;letter-spacing:0.1em;">目的港服务(LAX)</p>
               <p style='width:80px;border:1px solid #304156;margin-top:8px;margin-bottom:20px;'></p>

               <div style="margin-bottom:30px;" v-for="item in service.mdg">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">{{item.servicename}}:</span>
                 <el-checkbox v-model="item.model" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;positon:relative">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click.stop="textShow(item.id)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowName==item.id" style="width:160px;position:absolute;margin-left:80px;margin-top:-20px;" @click.stop="textShow(item.id)">
                              <el-input type="textarea" @click.native.stop="textShowName=item.id" v-model="item.model2"></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>


           <!--  <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">清关服务:</span>
                 <el-checkbox v-model="service.mdg.qgfw" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(6)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==6" style="width:300px">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>

            <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">仓库服务:</span>
                 <el-checkbox v-model="service.mdg.ckfw" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(7)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==7" style="width:300px">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>

            <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">卡车服务:</span>
                 <el-checkbox v-model="service.mdg.kcfw" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(8)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==8" style="width:300px">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div>

            <div style="margin-bottom:30px;">
                <div style="display:inline-block;vertical-align:sub;font-size:14px;">
                <span class="serviceTitle">检验检疫服务:</span>
                 <el-checkbox v-model="service.mdg.jyjyfw" style="margin-right:120px;"></el-checkbox>
                </div>
                <div style="display:inline-block;vertical-align:top;font-size:14px;">
                      <span style="">操作要求</span>
                      <i class="el-icon-edit" @click="textShow(9)"></i>
                          <el-collapse-transition>
                            <div v-show="textShowIndex==9" style="width:300px;">
                              <el-input type="textarea" ></el-input>
                            </div>
                          </el-collapse-transition>
                  </div>
            </div> -->
           </div>

           
       </div>
 <el-button style="float:right;margin-top:-30px;margin-right:20px;" @click="nextPage(1)">下一步</el-button>
    </div>
    </div>

    <!-- 服务选项 -->
    <div v-if="nextService==1" class='cargoInfo'>
        <div style="border:1px solid #304156;margin-bottom:18px;">
           <p class="mawbInfo" style="margin-bottom:20px;">配舱信息
     <!--   <el-button @click="show1=!show1" style="float:right;height:10px;line-height:3px;">收缩</el-button> -->
           </p>
    <div class="page-container-main">
          <div class="input-item width289">
             <div class="input-title">分运单号</div>
             <div  class="input-content input-required">
               <el-input v-model="cargoPlan.hawb"></el-input>
             </div>
          </div>

          <div class="input-item width289">
             <div class="input-title">PO订单编号</div>
             <div  class="input-content">
               <el-input v-model="cargoPlan.pono"></el-input>
             </div>
          </div>

          <div class="input-item width289">
             <div class="input-title">小件数</div>
             <div  class="input-content">
               <el-input v-model="cargoPlan.smallpiece"></el-input>
             </div>
          </div>

          <div class="input-item width289">
          </div>

          <div class="input-item width289">
          <div class="input-title">要求航班号</div>
             <div  class="input-content">
               <el-input v-model="cargoPlan.yqhbh"></el-input>
             </div>
          </div>

          <div class="input-item width289">
          <div class="input-title">要求航班日期</div>
             <div  class="input-content">
               <el-date-picker
                          v-model="cargoPlan.yqhbrq"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
             </div>
          </div>

          <div class="input-item width289">
          <div class="input-title">起飞时间</div>
             <div  class="input-content">
                <el-date-picker
      v-model="cargoPlan.yqrq"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
             </div>
          </div>


          
               
   <!--       <el-date-picker
      v-model="cargoPlan.yqhbrq"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker> -->
             
          


         </div>
           <!-- <formcompt :input-view-data="inputViewData"></formcompt> -->
        </div>

    <el-button @click="nextPage(0)">返回</el-button>
    </div>

  </div>
</template>

<script>
  
   import formcompt from "./templates/formCompt"

 export default {


   components: {
              formcompt
        },
    data() {
      return {
        service:{//服务选择
sfg:[{"servicename":"分运单制作","id":"fydzz","model":0,"model2":"123"},{"servicename":"分单标签制作","id":"fbqzz","model":0,"model2":""},{"servicename":"报关服务","id":"bgfw","model":0,"model2":""},{"servicename":"仓库服务","id":"sfgckfw","model":0,"model2":""},{"servicename":"卡车服务","id":"sfgkcfw","model":0,"model2":""}],
mdg:[{"servicename":"抽单服务","id":"cdfw","model":0,"model2":""},{"servicename":"清关服务","id":"qgfw","model":0,"model2":""},{"servicename":"仓库服务","id":"mdgckfw","model":0,"model2":""},{"servicename":"卡车服务","id":"mdgkcfw","model":0,"model2":""},{"servicename":"检验检疫服务","id":"jyjyfw","model":0,"model2":""}]
         
        },
     cargoPlan:{//配舱信息
      hawb:"",
      pono:"",
      smallpiece:"",
      yqhbh:"",
      yqhbrq:"",
      qfrq:"",
      yqqcts:"",
      hbzl:"",
      hwxz:"",
      batterymodel:"",
      tradeterm:"",
      englishpm:"",
      chinesepm:""
     },

        nextService:0,//下一页显示

       textShowName:-1,//textarea显示隐藏
        inputViewData:[//配置基本信息
                    
                      {"title":"运输方式:",id:"ysfs",type:3,"model":"","defaultModel":"",options:['空运','海运','陆运','铁运'],width:100,class:'allwidth',minW:'100'},
                      {"title":"配舱操作:",id:"pccz",type:3,"model":"","defaultModel":"",options:['唯凯配舱','唯凯代操作'],width:100,class:'allwidth',minW:'100'},
                      {"title":"委托客户:",id:"wtkh",type:11,"model":"","defaultModel":"",class:'width579',required:true,jsonArr:{type:"all",area:"",timestamp:"0"}},
                      {"title":"委托项目:",id:"wtxm",type:10,"model":"","defaultModel":"",class:'width579',required:true,jsonArr:{type:"all",comxz:'1',system:'',area:"",timestamp:"0"}},
                   
                      {"title":"始发港:",id:"sfg",type:1,"model":"","sear":'1',"defaultModel":"",class:'width289',required:true},
                      {"title":"目的港:",id:"mdg",type:1,"model":"","sear":'1',"defaultModel":"",class:'width289',required:true},
                      {"title":"",class:'width289'},
                      {"title":"",class:'width289'},
                  

                      {"title":"预报件数:",id:"ybpiece",type:1,"model":"","defaultModel":"",class:'width289',required:true},
                      {"title":"预报重量:",id:"ybweight",type:1,"defaultModel":[],class:'width289',required:true},
                      {"title":"预报体积:",id:"ybvolume",type:1,"defaultModel":[],class:'width289',required:true},
                     
                 ],

      
    }
},

    methods: {
 
    textShow(name){
      if(name==this.textShowName){
        this.textShowName=-1
      }else{
        this.textShowName=name
      }
    },
    textClose(){
this.textShowName=-1
    },
    nextPage(value){
      this.nextService=value  
    },

      wtdataP(data){
            var inputData=this.inputViewData
            for(var i in inputData){
              if(inputData[i].type==data.type){
                if(data.type==10){
                  this.wtxmid=data.id
                }else if(data.type==11){
                  this.wtkhid=data.id
                }
                inputData[i].model=data.wtdata

              }
            }
          },

    
      
    },created:function(){

     //this.editableTabs.push(this.val)
      // console.log(this.mes)
    
       //myFunc(8)
        //this.Gloas.fff(33)
     
    },watch:{
          textShowName(value){
           if(value!=-1){
             document.body.addEventListener('click',this.textClose)
           }else{
            document.body.removeEventListener('click',this.textClose)
           }
        }
    }
    
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.mawbInfo{background:#304156;color:#fff;padding:5px 5px 5px 10px;font-size: 14px;}
.serviceTitle{margin-right:20px;min-width:120px;display:inline-block;text-align: right}
.nofloat:after{content:"";display:block;clear:both;}
.width289 .el-date-editor.el-input{width:180px;}
.cargoInfo .el-input__icon{line-height: 0}
</style>
