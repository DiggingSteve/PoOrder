

<template>
    <div>
        <!-- {{inputModalData}} -->
        <div  class="page-container-box">
             <h2>查询条件</h2>
                <formcompt :input-view-data="inputViewData"  :input-modal-data="inputModalData"></formcompt>

               

        </div>
<!--          <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
                <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="80%">
  <submissionStl></submissionStl>
</el-dialog> -->
<div id="searchForm">

      <el-button  @click="search" type="primary">查询</el-button>
      <el-button  @click="reset" type="primary">重置</el-button>
      <el-button  @click="mainOrderDetailVisible = true" type="text">总单详情</el-button>

      <!-- <select v-model="locale">
        <option>English</option>
        <option>Chinese</option>
      </select> -->
      <p>{{$t('message.hello')}}</p>

    </div>

      <tableCompt :name="name" :table-data-res="tableDataRes"></tableCompt>

      <el-dialog
        title="总单详细"
        :visible.sync="mainOrderDetailVisible"
        size='large'
        class="orderdialog"
        center>
        
        <mainOrderDetail></mainOrderDetail>

      </el-dialog>
    </div>
</template>
<script>
import tableCompt from "./templates/tableCompt"
import formcompt from "./templates/formCompt"
import mainOrderDetail from "./mainOrderDetail"
import { searCondition } from '../api/localStorage.js'
    export default {
        components: {
          tableCompt,
          formcompt,
          mainOrderDetail
        },
        data () {
            return {
               name:"orderTaking.vue",
               dialogVisible: false,
                 inputViewData:[
                      // {"title":"公司名称",id:"gsmc",type:1,class:'width100',width:"50","model":"","whereC":"like","sear":'1',"defaultModel":""},
                      {"title":"订单编号",id:"orderno",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":"",required: true},
                      {"title":"委托客户",id:"wtkhname",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":"",required: true},
                      {"title":"货物品名",id:"pm",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":"",required: true},
                      {"title":"订单受理日期",id:"acceptancedate",type:7,class:'width100',width:"50","model":"","sear":"1","defaultModel":"",required: true},
                      {"title":"要求航班",id:"yqhbh",type:1,"model":"","sear":"1","defaultModel":"","whereC":"like",required: true},
                      {"title":"目的港",id:"mdg",type:1,"model":"LAX","sear":'1',"defaultModel":"LAX",required: true},
                      {"title":"要求航班日期",id:"yqhbrq",type:7,class:'width100',width:"50","model":"","sear":"1","defaultModel":"",required: true},
                      {"title":"订单来源",id:"dom",type:5,"model":[],"whereC":"in","sear":'1',options:[],"defaultModel":[],"groupid":102,required: false},

                      {"title":"状态",id:"status",type:5,"model":[],"whereC":"in","sear":'1',options:[{
                        value: '1',
                        label: '未受理'
                      }, {
                        value: '100',
                        label: '已受理'
                      }, {
                        value: '200',
                        label: '已退回'
                      }],"defaultModel":[],required: false},

                      // {"title":"始发港",id:"sfg",type:1,"model":"","sear":'1',"defaultModel":"PVG"},



                      // {"title":"创建人",id:"cjr",type:1,"model":"","sear":"1","defaultModel":""},
                      // {"title":"总运单号",id:"mawb",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":""},
                      // {"title":"分运单号",id:"hawb",type:1,"model":"","whereC":"like","sear":'1',"defaultModel":""},


                      // {"title":"报关类型",id:"bglx",type:5,"model":"","sear":'1',"defaultModel":""},
                      // {"title":"货物性质",id:"hwxz",type:5,"model":"","sear":'1',"defaultModel":""},
                      // {"title":"销售地",id:"xsd",type:1,"model":"","sear":'1',"defaultModel":""},
                      // {"title":"操作地",id:"czd",type:1,"model":"","sear":'1',"defaultModel":""}
                 ],
                 inputModalData:
                     {
                         ddly:[],
                         bglx:[],
                         hwxz:[]
                     },
                 tableDataRes:[],

              mainOrderDetailVisible: false
            }
        },
        methods:{
           		  search(){
                  var that=this
                        console.log(JSON.stringify(searCondition(this.inputViewData)))




                         var that=this;
                         this.$axios.get('http://localhost:8080/api/dataContent').then(function(res){
                           //console.log(res.data);

                          that.tableDataRes=res.data.data;
                          that.dataContent=res.data.data.slice(0,that.pageSize);
                                  }).catch(function(err){
                                       console.log(err);
                                  });

			      },
                  reset(){
                      // this.inputModalData={ddly:[],bglx:[],hwxz:[]};
                      let data=this.inputViewData;
                      for(var i in data){
                        data[i].model=data[i].defaultModel
                      }
                  }
        }
        ,created(){
          let groupData=JSON.parse(localStorage.getItem('groupType'))

          let inputData=this.inputViewData
          for(let i in inputData){
            for(let j in groupData){
              if(inputData[i].groupid==groupData[j].groupid){
                inputData[i].options.push({'value':groupData[j].typename,'label':groupData[j].typename})
              }
            }
          }

               //console.log(this.$store.state.count)
        }
        ,watch: {
           locale(val){
            console.log(val)
            this.$i18n.locale=val
           }
  }
    }


</script>
<style>
/*.page-container-main{
    margin-right:0px;
}
#searchForm{
 margin:10px;
  display: inline-block;
}
*/
</style>
