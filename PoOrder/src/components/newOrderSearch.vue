   
<template>
<div class="rootdiv">

<div  class="page-container-box">
             <h2>查询条件</h2>
                <formcompt :input-view-data="inputViewData" @wtdataP="wtdataP"></formcompt>

               
  <el-button  @click="search" type="primary" style="margin-left:50px;height:28px;line-height:4px">查询</el-button>
  <el-button  @click="reset" type="primary" style="height:28px;line-height:4px">重置</el-button>
</div>

<el-button type="primary" style="margin-left:50px;height:28px;line-height:4px" @click="hawbAddInfo = true">分单上榜新增</el-button>
<el-button type="primary" style="height:28px;line-height:4px;margin-bottom:20px;">总单上榜新增</el-button>

 <tableCompt :name="name" :table-data-res="tableDataRes"></tableCompt>

<!-- 分单上榜新增 -->
 <el-dialog
  title="分单上榜新增"
  :visible.sync="hawbAddInfo"  class="hawb" >
 
  <hawbAdd></hawbAdd>
</el-dialog>
<!--  <div style="width:200px;">

    <div><span>选择地域</span><input v-model="message" placeholder="请选择" @click.stop="isShow=!isShow" ></div>
        <div style="border:1px solid #ccc;padding:10px;margin-top:5px;" v-show="isShow">
          <div  @click.stop="isShow=true">
           <div @click="checkAllFucn"><input type="checkbox" id="item" v-model="allCheck">全部</div>
              <div v-for="(item,index) in area">
              <input type="checkbox"  v-model="message" :id="item" :value="item">
                <label :for="item"> {{item}}</label>
              </div>
          </div>
         </div>
  </div> -->

</div>

</template>

<script>
import tableCompt from "./templates/tableCompt"
import formcompt from "./templates/formCompt"
import hawbAdd from "./hawbAdd"
import { searCondition } from '../api/localStorage.js'
    export default {
      components: {
               tableCompt,formcompt,hawbAdd
        },
        data () {
            return {
              name:"newOrderSearch.vue",
              hawbAddInfo:false,
              inputViewData:[
                      // {"title":"公司名称",id:"gsmc",type:1,class:'width100',width:"50","model":"","whereC":"like","sear":'1',"defaultModel":""},
                      {"title":"公司名称",id:"companyName",type:1,"model":"",width:"50",class:'width100',"whereC":"like","sear":'1',"defaultModel":""},
                      {"title":"委托项目",id:"wtkhname",type:10,"model":"",width:"50",class:'width100',"whereC":"like","sear":'1',"defaultModel":"",jsonArr:{type:"all",comxz:'1',system:'',area:"",timestamp:"0"}},

                      // {"title":"委托客户",id:"wtkhname2",type:11,"model":"",width:"50",class:'width100',"whereC":"like","sear":'1',"defaultModel":"",jsonArr:{type:"all",area:"",timestamp:"0"}},

                      {"title":"始发港",id:"sfg",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":""},
                      {"title":"目的港",id:"mdg",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":""},
                      {"title":"航班日期",id:"hbrq",type:7,class:'width100',width:"50","model":"","sear":"1","defaultModel":""},
                      {"title":"航班号",id:"hbh",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":""},
                      {"title":"要求航班",id:"yqhbh",type:1,"model":"","sear":"1","defaultModel":"","whereC":"like"},
                      {"title":"订单来源",id:"dom",type:5,"model":[],"whereC":"in","sear":'1',options:[],"defaultModel":[],"groupid":102},
                      {"title":"订单编号",id:"orderno",type:1,"model":"","sear":"1","defaultModel":"","whereC":"like"},
                      {"title":"货物性质",id:"hwxz",type:5,"model":[],"whereC":"in","sear":'1',options:[],"defaultModel":[],groupid:115},
                      {"title":"业务类型",id:"ywlx",type:5,"model":[],"whereC":"in","sear":'1',options:[
                      {
                      value:'1',
                      label:'国际业务'
                      },
                      {
                      value:'2',
                      label:'国内业务'
                      }
                      ],"defaultModel":[]},
                      {"title":"运输方式",id:"ysfs",type:5,"model":[],"whereC":"in","sear":'1',options:[{
                      value:'1',
                      label:'空运'
                      },{
                      value:'2',
                      label:'海运'
                      },{
                      value:'3',
                      label:'陆运'
                      }],"defaultModel":[]},

                    

                      // {"title":"始发港",id:"sfg",type:1,"model":"","sear":'1',"defaultModel":"PVG"},



                      // {"title":"创建人",id:"cjr",type:1,"model":"","sear":"1","defaultModel":""},
                      // {"title":"总运单号",id:"mawb",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":""},
                      // {"title":"分运单号",id:"hawb",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":""},


                      // {"title":"报关类型",id:"bglx",type:5,"model":"","sear":'1',"defaultModel":""},
                      // {"title":"货物性质",id:"hwxz",type:5,"model":"","sear":'1',"defaultModel":""},
                      // {"title":"销售地",id:"xsd",type:1,"model":"","sear":'1',"defaultModel":""},
                      // {"title":"操作地",id:"czd",type:1,"model":"","sear":'1',"defaultModel":""}
                 ],
                   tableDataRes:[],
                   wtkhid:"",
                   wtxmid:""
              // message:[],
              //  area:['上海','北京','广州','深圳'],
              //  isShow:false,
              //  allCheck:false,
            }
        },
        methods: {
          search(){
      
    console.log(JSON.stringify(searCondition(this.inputViewData)))
    //console.log(this.wtxmid)
    //console.log(this.wtkhid)
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

        

        
           reset(){
                     
            let data=this.inputViewData;
                for(var i in data){
                  data[i].model=data[i].defaultModel
                }
            }
          // checkAllFucn(){
          //   if(this.allCheck==true){
          //         this.message=[]
          //   }else{
          //         this.message=this.area
          //   }
          // },
          //    closeMenu(e) {
          //       this.isShow = false
          //     }
        },
         watch:{
            // message(){
            //        if(this.message.length==this.area.length){
            //           this.allCheck=true;
            //          }else{
            //            this.allCheck=false;
            //         }
            // },
            //  isShow(value) {
            //      document.body.addEventListener('click',this.closeMenu)
            //     }
          },
          created(){
                let groupData=JSON.parse(localStorage.getItem('groupType'))

          let inputData=this.inputViewData
          for(let i in inputData){
            for(let j in groupData){
              if(inputData[i].groupid==groupData[j].groupid){
                inputData[i].options.push({'value':groupData[j].typename,'label':groupData[j].typename})
              }
            }
          }
          }
    }
</script>

 <style>

.hawb .el-dialog{width:1300px!important;margin-top:4%!important;}
.hawb .el-dialog__body{padding:20px 20px;}
.hawb .el-input__inner{line-height: 26px;}
  </style>



