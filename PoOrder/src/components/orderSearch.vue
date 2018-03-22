<style>

</style>
<template>
   <div>

     <!-- <iframe src="https://www.xize.xyz/po/index.html#/orderTaking" width="100%" height="500"></iframe> -->
          <div  class="page-container-box">
             <h2>基本信息</h2>
                <!-- <formcompt :input-view-data="inputArr"  :input-modal-data="inputData"></formcompt> -->
            </div>


  <!-- 标签页模块 -->
        <div class="page-container-box page-tab-checkbox" >
          <h2>请选择总单服务项目</h2>
             <el-tabs v-model="activeName">
                <el-tab-pane label="用户管理" name="first" style="min-height:300px;padding-left:20px;">
                        <h3><i class="el-icon-document"></i>单证操作</h3>
                            <formcompt :input-view-data="dzczArr"  :input-modal-data="inputData"></formcompt>
                        <h3><i class="el-icon-document"></i>报关操作</h3>
                              <formcompt :input-view-data="bgczArr"  :input-modal-data="inputData"></formcompt>
                        <h3><i class="el-icon-document"></i>货物操作</h3>
                       <formcompt :input-view-data="hwczArr"  :input-modal-data="inputData"></formcompt>
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second" style="min-height:300px;padding-left:20px;">到达港服务</el-tab-pane>

              </el-tabs>

        </div>

</div>
</template>
<script>
import formcompt from './templates/formCompt'
    export default {
        data () {
            return {
              inputArr:[
                   {"title":"配舱操作",id:"pccz",type:2,width:"100",class:'width25',options:["委托客户1","委托客户2"]},
                   {"title":"委托客户",id:"wtkh",type:1},
                   {"title":"委托项目",id:"wtxm",type:3,options:['委托项目1','委托项目2'],groupid:53},
                   {"title":"预报件数",id:"ybjs",type:4,options:[{
                        value: '选项1',
                        label: '黄金糕'
                      }, {
                        value: '选项2',
                        label: '双皮奶'
                      }, {
                        value: '选项3',
                        label: '蚵仔煎'
                      }, {
                        value: '选项4',
                        label: '龙须面'
                      }, {
                        value: '选项5',
                        label: '北京烤鸭'
                      }]},
                   {"title":"预报重量",id:"ybzl",type:5,options: [{
                          value: '选项1',
                          label: '公司'
                        }, {
                          value: '选项2',
                          label: 'amazon'
                        }, {
                          value: '选项3',
                          label: 'po'
                        }, {
                          value: '选项4',
                          label: 'wff'
                        }, {
                          value: '选项5',
                          label: '北京烤鸭'
                        }]},
                   {"title":"预报体积",id:"ybtj",type:6},
                   {"title":"小件数",id:"xjs",type:1},
                   {"title":"分运单号",id:"fydh",type:1},
                   {"title":"始发港",id:"sfg",type:1},
                   {"title":"目的港",id:"mdg",type:1},
                   {"title":"PO订单编号",id:"pono",type:1},
                   {"title":"要求航班号",id:"yqhbh",type:1},
                   {"title":"要求航班日期",id:"yqhbrq",type:1},
                   {"title":"起飞时间",id:"qfsj",type:1,class:'width25',width:"100"},
                   {"title":"配舱操作",id:"pclx",type:1,class:'width100',width:"50"},
                   {"title":"要求全程天数",id:"yqqcts",type:1,width:"50"},
                   {"title":"航班日期",id:"hbrq",type:7,class:'width100',width:"100"},
                   {"title":"起飞时间",id:"h",type:1,class:'width100',width:"100"},
                   {"title":"运价币种",id:"yjbz",type:1,class:'width100',width:"50"},
                   {"title":"运价费用",id:"yify",type:1},
                   {"title":"分配比例",id:"fpbl",type:1},
                   {"title":"运价币种",id:"yjbk",type:1,class:'width100',width:"50"},
                   {"title":"分单数量",id:"fdsl",type:1}

                 ],
                 inputData: //绑定的数据值
                   {
                     pccz:[],
                     ybzl:[],
                     fydcz:[],
                     fdbqzz:[],
                     sjwj:[]
                   },
               dzczArr:[
                 {'title':'分运单操作',id:'fydcz',type:2,width:50,options:["唯凯操作","客户操作"],class:"width100"},
                 {'title':'操作要求',id:'czhh',type:8,width:50,ifconShow:false},
                 {'title':'分单标签制作',id:'fdbqzz',type:2,width:50,options:["唯凯操作","客户操作"],class:"width100"},
                 {'title':'操作要求',id:'fdbqzzyq',type:8,width:50,ifconShow:false},
                 {'title':'随机文件',id:'sjwj',type:2,width:50,options:["唯凯代制作","自送唯凯","送唯凯外场"],class:"width100"},
                 {'title':'操作要求',id:'sjwjyq',type:8,width:50,ifconShow:false}
               ]
               ,bgczArr:[
                  {'title':'报关方式',id:'bgfs',type:2,width:50,options:["唯凯报关","客户自报关"],class:"width100"},
                  {'title':'操作要求',id:'eee',type:8,width:50,ifconShow:false}
               ]
               ,hwczArr:[
                  {'title':'仓库服务',id:'ckfw',type:2,width:50,options:["自送唯凯仓库","外库提货","不进唯凯仓库"],class:"width100"},
                  {'title':'操作要求',id:'tt',type:8,width:50,ifconShow:false},
                  {'title':'车队服务',id:'cdfw',type:2,width:50,options:["唯凯送外场","客户自送外场"],class:"width100"},
                  {'title':'操作要求',id:'ss',type:8,width:50,ifconShow:false}
               ]
               ,  //点击页面其他地方，关闭textarea
                activeName:"first" //默认选中的标签页

            }
        },
        components: {
               formcompt
        },
        methods: {
        }
    }
</script>
