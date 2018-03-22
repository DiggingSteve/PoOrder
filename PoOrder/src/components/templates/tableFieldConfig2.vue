<template>
  <div>

           <div>
           <el-select  v-model="value" placeholder="可自定义表格显示字段" @change="getSeltTmp(value)">
      <el-option
        v-for="item in tmpArr"
        :key="item.value"
        :label="item.name"
        :value="item.jsondata">
          <span style="float: left">{{ item.name }}</span>
      <!-- <span style="float: right; color: #8492a6; font-size: 13px" @click="delTmp(item.id)">X{{item.id}}</span> -->
<i class="el-icon-delete" style="float: right;margin-top:3px"  @click="delTmp(item.id)"></i>
      </el-option>

    </el-select>
    <span class="tableSetMuban" @click="dialogTableVisible = true">模板设置</span>
      </div>


<!-- 穿梭框 -->
    <el-dialog title="设置" :visible.sync="dialogTableVisible">
        <el-transfer v-model="valueTrans" :data="dataTrans" :titles="['列表字段', '系统显示字段']" class="my-trans"></el-transfer>
        <div style="margin-top:20px;">
            <el-button type="primary" @click="dialogVisible = true">保存</el-button>
            <el-button @click="dialogTableVisible = false">返回</el-button>
         </div>
    </el-dialog>

<!-- 新增模板确认弹窗 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="saveTmp">确 定</el-button>
  </span>
</el-dialog>



  </div>
</template>

<script>


export default {
    props:['name'],
    data(){
       return {
          tmpArr:[],  //模板选择数组
         // dataTable:[],
          pageTableBasic:[], //此页表格的基础模板
          value:"", //下拉框的value
          dialogTableVisible: false, //全屏弹窗
          dialogVisible:false,
          valueTrans:[],  //穿梭框右侧值

       }
    },
    methods:{
          getTmp(){ //获取全部模板数据
                let that=this;
                this.$axios.get('api/UserTemplet',
                  {
                    params: {
                      logname:'admin',
                      project:'pomanagement'
                    }
                  }).then(function(response){
                //   console.log(response.data);
                  let res=response.data;

                  let tmpArr=[]
                  for(let i in res){
                        if(res[i].url==that.name && res[i].type==0 ){
                          that.pageTableBasic=JSON.parse(res[i].jsondata)
                        }

                        if(res[i].url==that.name && res[i].type==20 ){
                          tmpArr.push(res[i])
                        }

                  }
                  that.tmpArr=tmpArr;
                  that.tmpAll=res;
                  let name=that.name.split('.')[0]
                        that.$store.commit('setTableData',[name,that.pageTableBasic])


                }).catch(function(err){

                });

        }
        ,
        getSeltTmp(value){ // 获取当前选择的模板

          let tmpdata=JSON.parse(value)
          var tmpAll=this.tmpAll
          for(let i in tmpAll){
            if(tmpAll[i].url==this.name &&  tmpAll[i].type==0){
              let t=JSON.parse(tmpAll[i].jsondata) //此页的基础模板
              let newtmp=[]

              for(let i in t[1]){
                for(let j in tmpdata){
                  if(t[1][i].id==tmpdata[j].id){
                    newtmp.push(t[1][i])
                  }
                }

              }

              let dataTable=[]
              dataTable[0]=t[0] //表格模板的固定字段
              dataTable[1]=newtmp;//表格模板的显示字段

              this.$nextTick(function () {
             let name=this.name.split('.')[0]

               this.$store.commit('setTableData',[name,dataTable])
              })

            }
          }
        },
        saveTmp(){
        // console.log(this.valueTrans)
         var valueTrans=this.valueTrans.map(function(val){
            return {id:val}
         })
         console.log(this.name)
        // console.log(JSON.stringify(valueTrans))
          var json={logname:"admin",project:"pomanagement",url:this.name,type:20,isactivate:0,jsondata:JSON.stringify(valueTrans)};
              json.name="修改268"
             // json.id="268"
              this.$axios.post('api/UserTemplet',json).then((res)=>{
                console.log(res)
                this.getTmp()
              })
              }
          ,delTmp(id){
             this.$axios.delete('api/UserTemplet',{data:{logname:"admin",id:id,logExtraData:'PC,上海'}}).then((res)=>{

               this.getTmp()
             })
             }

    }
    ,computed: {
      // tmpAll(){
      //    return this.$store.state.tableTmpAll;
      // },
      dataTrans(){
        var newDataTrans=[]
        var pagetmp=this.pageTableBasic[1]
            for(let i in pagetmp){
                newDataTrans.push({key:pagetmp[i].id,label:pagetmp[i].title})
            }
           // console.log(newDataTrans)
            return  newDataTrans;
      }

    },
    mounted(){
      this.getTmp()


    }

}
</script>
<style>
  .tableSetMuban{
    display: inline-block;
    min-width: 70px;
    height: 28px;
    line-height: 28px;
    color: #444;
    margin: 0px;
    text-align: center;
    background: #F8F8F8;
    border: 1px solid #ccc;
    cursor: pointer;
    text-decoration: none;
  }
  .el-input__inner{
    height:28px!important;
  }
</style>

