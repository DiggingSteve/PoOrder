<template>
  <div style="width:1200px;margin:0 auto;">
    <!-- <iframe src="https://www.xize.xyz/po/index.html#/costConfirmation" width="100%" height="500"></iframe> -->

    <!-- 总单信息 -->

    <div style="margin-bottom:18px;border:1px solid #304156;">
    <p class="mawbInfo">总单信息<el-button @click="show1=!show1" style="float:right;height:10px;line-height:3px;">收缩</el-button></p>
     <el-collapse-transition>
    <listCompt :listContent="listContent" :mawbC="1" :content="content" v-show='show1'></listCompt>
     </el-collapse-transition>
    </div>

    <!-- 总单应收费用 -->
    <div style="border:1px solid #304156;margin-bottom:18px;">
       <p class="mawbInfo" style="margin-bottom:5px;">总单应收费用</p>
       <table cellpadding="5" cellspacing="10"  style="width:100%;text-align:center">
         <tr>
         <th>订单编号</th>
         <th>分运单号</th>
         <th>免</th>
         <th>结算项目</th>
         <th>服务项目</th>
         <th>结算方式</th>
         <th>数量</th>
         <th>单价</th>
         <th>币种</th>
         <th>金额</th>
         <th>RMB金额</th>
         <th>汇率</th>
         <th>备注</th>
         </tr>
         <tr v-for="item in tableData1">
         <td>{{item.orderno}}</td>
         <td>{{item.hawb}}</td>
         <td>{{item.isfree}}</td>
         <td>{{item.usrname}}</td>
         <td>{{item.item}}</td>
         <td>{{item.wagetype}}</td>
         <td>{{item.num}}</td>
         <td>{{item.piece}}</td>
         <td>{{item.currency}}</td>
         <td>{{item.leastwageall}}</td>
         <td>{{item.wageall}}</td>
         <td>{{item.changerate}}</td>
         <td>{{item.remark}}</td>
         </tr>
       </table>
    </div>

    <!-- 总单应付费用 -->
    <div style="border:1px solid #304156;">
       <p class="mawbInfo" style="margin-bottom:5px;">总单应收费用</p>
       <table cellpadding="5" cellspacing="10"  style="width:100%;text-align:center">
         <tr>
         <th>订单编号</th>
         <th>分运单号</th>
         <th>免</th>
         <th>结算项目</th>
         <th>服务项目</th>
         <th>结算方式</th>
         <th>数量</th>
         <th>单价</th>
         <th>币种</th>
         <th>金额</th>
         <th>RMB金额</th>
         <th>汇率</th>
         <th>备注</th>
         </tr>
         <tr v-for="item in tableData2">
         <td>{{item.orderno}}</td>
         <td>{{item.hawb}}</td>
         <td>{{item.isfree}}</td>
         <td>{{item.usrname}}</td>
         <td>{{item.item}}</td>
         <td>{{item.wagetype}}</td>
         <td>{{item.num}}</td>
         <td>{{item.piece}}</td>
         <td>{{item.currency}}</td>
         <td>{{item.leastwageall}}</td>
         <td>{{item.wageall}}</td>
         <td>{{item.changerate}}</td>
         <td>{{item.remark}}</td>
         </tr>
       </table>
    </div>

    <!-- 分单信息 -->
   <div style="margin-top:18px;">
    <el-tabs type="card" closable @tab-remove="removetab" v-model="hawbindex" @tab-click="showT">

     <p class="mawbInfo" style="">分单信息</p>
  <el-tab-pane
    :key="item.hawb"
    v-for="(item, index) in hawbContent"
    :label="item.hawb"
    :name="String(index)"
    :testid="index"
    style="border:1px solid #304156;padding-bottom:18px;"
  >
   <listCompt :listContent="listContent2" :hawbC="1" :hawbContent="hawbContent[index]"></listCompt>


   <div style="flex-direction:row;flex-wrap:nowrap;justify-content:space-around;display:flex;margin-bottom:20px;">
     <p><el-button>航线费用</el-button><span style='color:orange;margin-left:10px;margin-right:10px;'>盈利：0.00元</span></p>
     <p><el-button>客服费用</el-button><span style='color:orange;margin-left:10px;margin-right:10px;'>盈利：0.00元</span></p>
     <p><el-button>延伸费用</el-button><span style='color:orange;margin-left:10px;margin-right:10px;'>盈利：0.00元</span></p>
     <p><el-button>费用总览</el-button><span style='color:orange;margin-left:10px;margin-right:10px;'>盈利：0.00元</span></p>
   </div>

    <p class="mawbInfo" style="margin-bottom:5px;">分单应收费用</p>
       <table cellpadding="5" cellspacing="10"  style="width:100%;text-align:center;padding-left:20px;padding-right:20px;">
         <tr>
         <th>免</th>
         <th>结算项目</th>
         <th>服务项目</th>
         <th>结算方式</th>
         <th>数量</th>
         <th>单价</th>
         <th>币种</th>
         <th>金额</th>
         <th>RMB金额</th>
         <th>汇率</th>
         <th>备注</th>
         </tr>
         <tr v-for="item in tableData3">
         <td>{{item.isfree}}</td>
         <td>{{item.usrname}}</td>
         <td>{{item.item}}</td>
         <td>{{item.wagetype}}</td>
         <td>{{item.num}}</td>
         <td>{{item.piece}}</td>
         <td>{{item.currency}}</td>
         <td>{{item.wageall}}</td>
         <td>{{item.leastwageall}}</td>
         <td>{{item.changerate}}</td>
         <td>{{item.remark}}</td>
         </tr>
       </table>

        <p class="mawbInfo" style="margin-bottom:5px;">分单应付费用</p>
       <table cellpadding="5" cellspacing="10"  style="width:100%;text-align:center;padding-left:20px;padding-right:20px;">
         <tr>
         <th>免</th>
         <th>结算项目</th>
         <th>服务项目</th>
         <th>结算方式</th>
         <th>数量</th>
         <th>单价</th>
         <th>币种</th>
         <th>金额</th>
         <th>RMB金额</th>
         <th>汇率</th>
         <th>备注</th>
         </tr>
         <tr v-for="item in tableData4">
         <td>{{item.isfree}}</td>
         <td>{{item.usrname}}</td>
         <td>{{item.item}}</td>
         <td>{{item.wagetype}}</td>
         <td>{{item.num}}</td>
         <td>{{item.piece}}</td>
         <td>{{item.currency}}</td>
         <td>{{item.wageall}}</td>
         <td>{{item.leastwageall}}</td>
         <td>{{item.changerate}}</td>
         <td>{{item.remark}}</td>
         </tr>
       </table>



  </el-tab-pane>
</el-tabs>
  </div>
    <!-- <listCompt :listContent="listContent2" :hawbC="1"></listCompt> -->

  </div>
</template>

<script>
import listCompt from "./templates/listCompt"
  export default {
    data() {
      return {
        show1:true,
hawbindex:'0',
listContent:[//总单字段
{"id":"orderno","name":"订单编号",width:'50%',color:'red'},
{"id":"mawb","name":"总运单号",width:'50%',color:'red'},
{"id":"allpiece","name":"总件数",width:'25%',color:'green'},
{"id":"allweight","name":"总重量",width:'25%',color:'green'},
{"id":"allvolume","name":"总体积",width:'25%',color:'green'},
{"id":"zdpiece","name":"制单件数",width:'25%',color:'green'},
{"id":"zdweight","name":"制单重量",width:'25%',color:'green'},
{"id":"zdvolume","name":"制单体积",width:'25%',color:'green'},
{"id":"jfweight","name":"计费重量",color:'green'}
],
 content:{//总单数据
                "orderno":"HBO20180200001AE/PVG",
                "mawb":"112-111111111",
                allpiece:"36",
                allweight:"280.0",
                allvolume:"1.60",
                zdpiece:"36",
                zdweight:"280.0",
                zdvolume:"1.60",
                jfweight:"848.0"
               },
listContent2:[//分单字段
{"id":"wtkhname","name":"委托客户",width:'50%',color:'green'},
{"id":"usrname","name":"委托项目",width:'50%',color:'green'},
{"id":"allpiece","name":"总件数",width:'25%',color:'green'},
{"id":"allweight","name":"总重量",width:'25%',color:'green'},
{"id":"allvolume","name":"总体积",width:'25%',color:'green'},
{"id":"zdpiece","name":"制单件数",width:'25%',color:'green'},
{"id":"zdweight","name":"制单重量",width:'25%',color:'green'},
{"id":"zdvolume","name":"制单体积",width:'25%',color:'green'},
{"id":"jfweight","name":"计费重量",width:'25%',color:'green'}
],

 hawbContent:[//分单数据
               {hawb:"YSSHA18001001",wtkhname:"上海邮申国际货运有限公司",usrname:"基础-上海邮申国际货运有限公司",allpiece:"10",allweight:"120.0",allvolume:"0.70",zdpiece:"10",zdweight:"120.0",zdvolume:"0.70",jfweight:"368.00"},
               {hawb:"NNRSHA1801602",wtkhname:"上海邮申国际货运有限公司",usrname:"基础-上海邮申国际货运有限公司",allpiece:"26",allweight:"160.0",allvolume:"0.90",zdpiece:"26",zdweight:"160.0",zdvolume:"0.90",jfweight:"480.00"},
],

tableData1:[//总单应收
{orderno:"BO180200003AE/PVG",hawb:"YSSHA18001001",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''},
{orderno:"BO180200004AE/PVG",hawb:"NNRSHA1801602",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''}
],

tableData2:[//总单应付
{orderno:"BO180200003AE/PVG",hawb:"YSSHA18001001",isfree:"是",usrname:"东航货站",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''},
{orderno:"BO180200004AE/PVG",hawb:"NNRSHA1801602",isfree:"是",usrname:"上海唯凯国际空运出口操作部",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''}
],
tableData3:[//分单应收
{orderno:"YSSHA18001001",hawb:"YSSHA18001001",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''},
{orderno:"NNRSHA1801602",hawb:"NNRSHA1801602",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''}
],
tableData4:[//分单应付
{orderno:"YSSHA18001001",hawb:"YSSHA18001001",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''},
{orderno:"NNRSHA1801602",hawb:"NNRSHA1801602",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''}
],


      }
    },
    methods:{
      removetab(targetName) {
        console.log(targetName)
        this.hawbContent=this.hawbContent.splice(Number(targetName)-1,1)
        this.hawbindex = String(Number(targetName)-1);
        // let tabs = this.hawbContent;
        // let activeName = this.hawbindex;
        // if (activeName === targetName) {
        //   tabs.forEach((tab, index) => {
        //     if (index === Number(targetName)) {
        //       activeName = String(index + 1)||String(index - 1)
        //       // let nextTab = tabs[index + 1] || tabs[index - 1];
        //       // if (nextTab) {
        //       //   activeName = nextTab.name;
        //       // }
        //     }
        //   });
        // }
        // console.log(activeName)
        // this.hawbindex = activeName;

      },
      showT(targetName){
        var that=this
        if(targetName.$attrs.testid==0){
            //alert(0)
            that.tableData3=[{orderno:"YSSHA18001001",hawb:"YSSHA18001001",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''},
{orderno:"NNRSHA1801602",hawb:"NNRSHA1801602",isfree:"是",usrname:"基础-上海邮申国际货运有限公司",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''}]
        }else if(targetName.$attrs.testid==1){
            //alert(1)
            that.tableData3=[{orderno:"33333333",hawb:"YSSHA18001001",isfree:"是",usrname:"3333333",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''},
{orderno:"555555",hawb:"NNRSHA1801602",isfree:"是",usrname:"555555",item:"服务项目",wagetype:'票',num:1,piece:'5.00',currency:'人民币',leastwageall:'5.00',wageall:'5.00',changerate:'1.00',remark:''}]
        }
        //console.log(targetName)
        //console.log(targetName.$attrs.testid)

      }
    },

    components: {
          listCompt
    }
  }
</script>
<style>
.mawbInfo{background:#304156;color:#fff;padding:5px 5px 5px 10px;font-size: 14px;}
table tr{height:30px;line-height: 30px;}
.el-tabs__item.is-active{color:#304156;}
.el-tabs__header{border-bottom:1px solid #304156;}
.el-tabs__header{margin-bottom:0;}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{border:1px solid #304156;border-bottom-color:#fff}
.el-button:focus, .el-button:hover{color:#304156;border-color:#304156 }
.el-tab-pane{padding-left: 0;padding-right: 0}
/*  th{
    text-align: center!important;
  }*/
</style>
