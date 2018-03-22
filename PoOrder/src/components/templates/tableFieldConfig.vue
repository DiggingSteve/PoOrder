<template>
  <div>

           <div class="tableFieldConfig">



           <el-select v-model="value" placeholder="可自定义父表格显示字段" @change="gettmp(value)">
      <el-option
        v-for="item in tmpArr"
        :key="item.value"
        :label="item.name"
        :value="item.jsondata">
         <span style="float: left">{{ item.name }}</span>

        <!-- <span style="float: right; color: #8492a6; font-size: 10px;width:13px;height:13px;color:#fff;background:red;border-radius:13px;text-align:center;line-height:13px!important;margin-left:5px;">x</span> -->
        <i class="el-icon-circle-close" style="float: right;color:#F56C6C;margin-left:3px;" @click="tbTem(item.id)"></i>

        <span :style="{background:item.isactivate==1?'orange':'grey'}" class="jihuo" @click="defaultActive(item.id)"></span>
      </el-option>

    </el-select>

    <el-select v-model="childValue" placeholder="可自定义子表格显示字段" @change="gettmpChild(childValue)">
      <el-option
        v-for="item in tmpArrChild"
        :key="item.value"
        :label="item.name"
        :value="item.jsondata">
         <span style="float: left">{{ item.name }}</span>

        <!-- <span style="float: right; color: #8492a6; font-size: 10px;width:13px;height:13px;color:#fff;background:red;border-radius:13px;text-align:center;line-height:13px!important;margin-left:5px;">x</span> -->
        <i class="el-icon-circle-close" style="float: right;color:#F56C6C;margin-left:3px;" @click="tbTem(item.id)"></i>
<!-- <span :style="{background:item.isactivate==1?'orange':'grey'}" class="jihuo"></span> -->
        <span :style="{background:item.isactivate==1?'orange':'grey'}" class="jihuo" @click="defaultActiveC(item.id)"></span>
      </el-option>

    </el-select>

    <span class="tableSetMuban" @click="dialogTableVisible = true">模板设置</span>
      </div>

<!-- 传送框 -->
    <el-dialog title="设置" :visible.sync="dialogTableVisible">
      <div style="margin-bottom:20px;">
         <el-button type="primary" @click="parentChild=1">父模板设置</el-button>
         <el-button type="primary" @click="parentChild=2">子模板设置</el-button>
     </div>
        <el-transfer v-model="valueTrans" :data="dataTrans" :titles="['列表字段','系统显示字段']" class="my-trans" v-if="parentChild==1"></el-transfer>
        <el-transfer v-model="valueTrans2" :data="dataTransC" :titles="['列表字段','系统显示字段']" class="my-trans" v-if="parentChild==2"></el-transfer>

        <div style="margin-top:20px;">
            <el-button type="primary" @click="tableTemVisible=true">保存</el-button>
            <el-button @click="dialogTableVisible=false">返回</el-button>
         </div>
</el-dialog>

<!-- 提示框 -->
<el-dialog title="提示" :visible.sync="tableTemVisible" style="" class="tableTem">
  <div>
     <el-radio v-model="tem" label="1">保存新模板</el-radio>
     <el-radio v-model="tem" label="2">替换原模板</el-radio>
  </div>
        <div style="margin-top:20px;" v-if="tem==1">
        <p>请输入模板名称:</p>
            <el-input v-model="tableTemName" placeholder="请输入模板名称" style="width:180px;"></el-input>
            <el-button type="primary" @click="tabTemSet('post')">保存</el-button>
         </div>

          <div style="margin-top:20px;" v-if="tem==2">
        <p>被替换模板名称:</p>
           <el-select v-model="muban" placeholder="请选择" style="width:180px;" v-if="parentChild==1">
    <el-option
      v-for="item in tmpArr"
        :key="item.value"
        :label="item.name"
        :value="item.id+' '+item.name">
    </el-option>
  </el-select>



    <el-select v-model="mubanC" placeholder="请选择" style="width:180px;" v-if="parentChild==2">
    <el-option
      v-for="item in tmpArrChild"
        :key="item.value"
        :label="item.name"
        :value="item.id+' '+item.name">
    </el-option>
  </el-select>

            <el-button type="primary" @click="tabTemSet('put')">保存</el-button>
         </div>
</el-dialog>



  </div>
</template>

<script>


// import { request,reLogin } from '../../api/request'

export default {
    props:['name'],
    data(){
       return {
          tmpArr:[],  //父模板选择数组
          tmpArrChild:[],//子模板选择数组

          pageTableBasic:[], //此页表格的基础父模板
          pageTableBasicC:[], //此页表格的基础子模板

          pageTableBasic2:[],//传送基础数据父
          pageTableBasic2C:[],//传送基础数据子

          value:"", //父下拉框的value
          childValue:"", //子下拉框的value

          dialogTableVisible: false, //全屏弹窗
          tableTemVisible:false,//表格新增修改弹窗

          tableTemName:'',//模板新名称
          valueTrans:[],  //父模板穿梭框右侧值
          valueTrans2:[],//子模板穿梭框右侧值

          tem:'1',//新增还是修改模板
          muban:'',//被替换模板名称
          mubanC:'',//被替换子模板名称


          isactivate:-1,//父模板激活
          isactivateC:-1,//子模板激活
          parentChild:1,//父子模板切换

       }
    },
    methods:{
          getTmp(){ //获取全部模板数据

          let that=this;
          //axios.get('http://192.168.0.96/PublicWebApi/api/UserTemplet',

         this.$axios({method:'get',url:that.$store.state.publicWebApi+'api/UserTemplet',params:{logname:localStorage.getItem('usrname'),project:'bomanagement'},loading:false,tip:false}).then(results=>{
          console.log(results)
          let tableTem=results.data;
          let tmpArr=[]
          let tmpArrChild=[]
          let activeTmp={}//激活模板非固定数据
           let activeTmpC={}//激活模板非固定数据
            for(let i in tableTem){
              if(tableTem[i].jsondata){
                
                if(tableTem[i].url==that.name && tableTem[i].type==0){//父模板数据

                let ac=JSON.parse(tableTem[i].jsondata)[0]//固定所有基础表格数据
                let acfix=JSON.parse(tableTem[i].jsondata)[1]//非固定基础表格数据
                //let acfix=""
                let nac=[]//非固定所有基础表格非隐藏数据
                let nacfix=[]//固定所有基础表格非隐藏数据

                for(let i in ac){
                  if(!ac[i].hidden){
                    nac.push(ac[i])
                  }
                }

                for(let i in acfix){
                  if(!acfix[i].hidden){
                    nacfix.push(acfix[i])
                  }
                }

                that.pageTableBasic[0]=nac//固定非隐藏数据
                that.pageTableBasic[1]=nacfix//不固定非隐藏数据

                that.pageTableBasic2=JSON.parse(tableTem[i].jsondata)
              }

              if(tableTem[i].url==that.name && tableTem[i].type==20){
                tmpArr.push(tableTem[i])
              }

              if(tableTem[i].url==that.name && tableTem[i].type==60){
                tmpArrChild.push(tableTem[i])
              }


              if(tableTem[i].url==that.name && tableTem[i].type==40){//子模板数据
                //console.log(tableTem[i].jsondata)
                 let acfixChild=JSON.parse(tableTem[i].jsondata)[1]//非固定基础表格数据子
                 //console.log(acfixChild)
                  let nacfixChild=[]//固定所有基础表格非隐藏数据子
                   for(let i in acfixChild){
                  if(!acfixChild[i].hidden){
                    nacfixChild.push(acfixChild[i])
                  }
                }
                //console.log(nacfixChild)
                that.pageTableBasicC=nacfixChild//不固定非隐藏数据子

                that.pageTableBasic2C=JSON.parse(tableTem[i].jsondata)//传送数据子
                console.log(that.pageTableBasic2C)

              }


              if(tableTem[i].url==that.name && tableTem[i].type==20&&tableTem[i].isactivate==1){//父激活
                that.isactivate=1
                activeTmp=tableTem[i].jsondata
              }

              if(tableTem[i].url==that.name && tableTem[i].type==60&&tableTem[i].isactivate==1){//子激活
                that.isactivateC=1
                activeTmpC=tableTem[i].jsondata
              }

              }
              
            }

            that.tmpArr=tmpArr;
            that.tmpArrChild=tmpArrChild;
            let name=that.name.split('.')[0]

            if(that.isactivate==1){
              this.gettmp(activeTmp)

            }else{

              that.$store.commit('setTableData',[name,that.pageTableBasic])
            }

            if(that.isactivateC==1){
              this.gettmp(activeTmpC)

            }else{

              that.$store.commit('setChildTableData',[name,that.pageTableBasicC])
            }


         })


        }
        ,
        gettmp(value){ // 获取当前选择的父模板
          if(value){
            let tmpdata=JSON.parse(value)
          //console.log(tmpdata[0].id)
          let pageTableBasic=this.pageTableBasic[1]
          let pageTableBasicF=this.pageTableBasic[0]
          let newtmp=[]//模板非固定数据
          let newtmpF=[]//模板数据固定
          let dataTable=[]

          for(let i in tmpdata){//模板非固定数据中有隐藏
            for(let j in pageTableBasic){
              if(tmpdata[i].id==pageTableBasic[j].id&&!pageTableBasic[j].hidden){
                 newtmp.push(pageTableBasic[j])
              }
            }
          }

           for(let i in pageTableBasicF){//模板固定中有隐藏
             if(!pageTableBasicF[i].hidden){
              newtmpF.push(pageTableBasicF[i])
             }
           }
          console.log(newtmpF)
          dataTable[0]=newtmpF
          dataTable[1]=newtmp
          //console.log(dataTable)//显示模板


              this.$nextTick(function () {
                let name=this.name.split('.')[0]
              //console.log(name)
              //console.log(dataTable)
               this.$store.commit('setTableData',[name,dataTable])
              })
          }



         //  }
        },
        gettmpChild(value){// 获取当前选择的子模板
       if(value){
        let tmpdata=JSON.parse(value)
          //console.log(tmpdata[0].id)
          let pageTableBasicC=this.pageTableBasicC

          let newtmp=[]//模板非固定数据

          let dataTable=[]

          for(let i in tmpdata){//模板非固定数据中有隐藏
            for(let j in pageTableBasicC){
              if(tmpdata[i].id==pageTableBasicC[j].id&&!pageTableBasicC[j].hidden){
                 newtmp.push(pageTableBasicC[j])
              }
            }
          }

          dataTable=newtmp
          //console.log(dataTable)//显示模板


              this.$nextTick(function () {
                let name=this.name.split('.')[0]
              //console.log(name)
              //console.log(dataTable)
               this.$store.commit('setChildTableData',[name,dataTable])
              })
       }



        },
        tbTem(id){

          var that=this
          this.$confirm('您将删除本模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: action => {
            if(action=='confirm'){
               that.$axios({method:'delete',url:that.$store.state.publicWebApi+'api/UserTemplet',data:{id:id,logname:'admin',logExtraData:"PC,上海"},loading:false,tip:true})
               .then(results=>{
                if(results.data.resultstatus!=0){

                }else{

                    that.getTmp()

                }

               })
               .catch(error=>{

               })
            }else if(action=='cancel'){
                that.$message({
            type: 'info',
            message: '已取消删除'
          });
            }

          }
        })

 },
 tabTemSet(method){

  let that=this;
  let type="";
  if(that.parentChild==1){//父模板
    type=20
    that.valueTrans2=[]
  if(that.valueTrans.length>0){
     var tranData=[]
     for(let i in that.valueTrans){
       tranData.push({"id":that.valueTrans[i]})
     }

 if(method=="post"){
  if(that.tableTemName==""){
      this.$message({
            type: 'info',
            message: '输入模板名称'
          });
    return false
 }else{

// var postData={isactivate:0,jsondata:JSON.stringify(tranData),logname:localStorage.getItem('usrname'),name:that.tableTemName,type:type,url:that.name,project:"bomanagement",logExtraData:"PC,上海"}
this.$axios({method:'post',url:that.$store.state.publicWebApi+'api/UserTemplet', data:{isactivate:0,jsondata:JSON.stringify(tranData),logname:localStorage.getItem('usrname'),name:that.tableTemName,type:20,url:that.name,project:"bomanagement",logExtraData:"PC,上海"},loading:false,tip:true}).then((results)=>{
if(results.data.resultstatus==0){
  that.getTmp()
  that.dialogTableVisible=false
  that.tableTemVisible=false
  that.value=""
}
}).catch(()=>{

})

 }
     }else if(method=="put"){
      if(that.muban==""){
         this.$message({
            type: 'info',
            message: '请选择替换模板'
          });
    return false
      }else{

this.$axios({method:'put',url:that.$store.state.publicWebApi+'api/UserTemplet',data:{isactivate:0,jsondata:JSON.stringify(tranData),logname:localStorage.getItem('usrname'),id:that.muban.split(' ')[0],type:type,name:that.muban.split(' ')[1],url:that.name,project:"bomanagement",logExtraData:"PC,上海"},loading:false,tip:true}).then(results=>{

if(results.data.resultstatus==0){
  that.getTmp()
 that.value=""
  that.dialogTableVisible=false
  that.tableTemVisible=false
}
}).catch(error=>{

})
      }
    }


  }
  else{
    this.$message({
            type: 'info',
            message: '请设置模板'
          });
    return false
}
  }else if(that.parentChild==2){//子模板
    type=60
    that.valueTrans=[]
  if(that.valueTrans2.length>0){
     var tranData=[]
     for(let i in that.valueTrans2){
       tranData.push({"id":that.valueTrans2[i]})
     }

 if(method=="post"){
  if(that.tableTemName==""){
      this.$message({
            type: 'info',
            message: '输入模板名称'
          });
    return false
 }else{

// var postData={isactivate:0,jsondata:JSON.stringify(tranData),logname:localStorage.getItem('usrname'),name:that.tableTemName,type:type,url:that.name,project:"pomanagement",logExtraData:"PC,上海"}
this.$axios({method:'post',url:that.$store.state.publicWebApi+'api/UserTemplet', data:{isactivate:0,jsondata:JSON.stringify(tranData),logname:localStorage.getItem('usrname'),name:that.tableTemName,type:type,url:that.name,project:"bomanagement",logExtraData:"PC,上海"},loading:false,tip:true}).then((results)=>{
if(results.data.resultstatus==0){
  that.getTmp()
   that.childValue=""
  that.dialogTableVisible=false
  that.tableTemVisible=false
}
}).catch(()=>{

})

 }
     }else if(method=="put"){
      if(that.mubanC==""){
         this.$message({
            type: 'info',
            message: '请选择替换模板'
          });
    return false
      }else{

this.$axios({method:'put',url:that.$store.state.publicWebApi+'api/UserTemplet',data:{isactivate:0,jsondata:JSON.stringify(tranData),logname:localStorage.getItem('usrname'),id:that.mubanC.split(' ')[0],type:type,name:that.mubanC.split(' ')[1],url:that.name,project:"bomanagement",logExtraData:"PC,上海"},loading:false,tip:true}).then(results=>{
//console.log(results)
if(results.data.resultstatus==0){
  that.getTmp()
 that.childValue=""
  that.dialogTableVisible=false
  that.tableTemVisible=false
}
}).catch(error=>{

})
      }
    }


  }
  else{
    this.$message({
            type: 'info',
            message: '请设置模板'
          });
    return false
}
  }



 },
 defaultActive(id){  //默认模板
this.$axios.put(this.$store.state.publicWebApi+'api/UserTemplet',{id:id,isactivate:1,logExtraData:"PC,上海"}).then(results=>{
if(results.data.resultstatus==0){
  this.getTmp()
}
})
},

defaultActiveC(id){
  alert(id)
// this.$axios.put(this.$store.state.publicWebApi+'api/UserTemplet',{id:id,isactivate:1,logExtraData:"PC,上海"}).then(results=>{
// if(results.data.resultstatus==0){
//   this.getTmp()
// }
// })
}
}
    ,computed: {
      // tmpAll(){
      //    return this.$store.state.tableTmpAll;
      // },
      dataTrans(){//父模板传送
        var newDataTrans=[]

        var pagetmp=this.pageTableBasic2[1]
            for(let i in pagetmp){
                newDataTrans.push({key:pagetmp[i].id,label:pagetmp[i].title})
            }
           //console.log(newDataTrans)
            return  newDataTrans;
      },
      dataTransC(){//子模板传送
 var newDataTrans=[]

        var pagetmp=this.pageTableBasic2C[1]
            for(let i in pagetmp){
                newDataTrans.push({key:pagetmp[i].id,label:pagetmp[i].title})
            }
           //console.log(newDataTrans)
            return  newDataTrans;
      }

    },
    mounted(){
      //this.getTmp()
      var that=this

      let tableTem=that.$store.state.tableTmpAll
      //console.log(tableTem)
          let tmpArr=[]
          let tmpArrChild=[]
          let activeTmp={}//激活模板非固定数据
           let activeTmpC={}//激活模板非固定数据
            for(let i in tableTem){
              if(tableTem[i].jsondata){
                
                if(tableTem[i].url==that.name && tableTem[i].type==0){//父模板数据

                let ac=JSON.parse(tableTem[i].jsondata)[0]//固定所有基础表格数据
                let acfix=JSON.parse(tableTem[i].jsondata)[1]//非固定基础表格数据
                //let acfix=""
                let nac=[]//非固定所有基础表格非隐藏数据
                let nacfix=[]//固定所有基础表格非隐藏数据

                for(let i in ac){
                  if(!ac[i].hidden){
                    nac.push(ac[i])
                  }
                }

                for(let i in acfix){
                  if(!acfix[i].hidden){
                    nacfix.push(acfix[i])
                  }
                }

                that.pageTableBasic[0]=nac//固定非隐藏数据
                that.pageTableBasic[1]=nacfix//不固定非隐藏数据

                that.pageTableBasic2=JSON.parse(tableTem[i].jsondata)
              }

              if(tableTem[i].url==that.name && tableTem[i].type==20){
                tmpArr.push(tableTem[i])
              }

              if(tableTem[i].url==that.name && tableTem[i].type==60){
                tmpArrChild.push(tableTem[i])
              }


              if(tableTem[i].url==that.name && tableTem[i].type==40){//子模板数据
                //console.log(tableTem[i].jsondata)
                 let acfixChild=JSON.parse(tableTem[i].jsondata)[1]//非固定基础表格数据子
                 //console.log(acfixChild)
                  let nacfixChild=[]//固定所有基础表格非隐藏数据子
                   for(let i in acfixChild){
                  if(!acfixChild[i].hidden){
                    nacfixChild.push(acfixChild[i])
                  }
                }
                //console.log(nacfixChild)
                that.pageTableBasicC=nacfixChild//不固定非隐藏数据子

                that.pageTableBasic2C=JSON.parse(tableTem[i].jsondata)//传送数据子
                console.log(that.pageTableBasic2C)

              }


              if(tableTem[i].url==that.name && tableTem[i].type==20&&tableTem[i].isactivate==1){//父激活
                that.isactivate=1
                activeTmp=tableTem[i].jsondata
              }

              if(tableTem[i].url==that.name && tableTem[i].type==60&&tableTem[i].isactivate==1){//子激活
                that.isactivateC=1
                activeTmpC=tableTem[i].jsondata
              }

              }
              
            }

            that.tmpArr=tmpArr;
            that.tmpArrChild=tmpArrChild;
            let name=that.name.split('.')[0]

            if(that.isactivate==1){
              this.gettmp(activeTmp)

            }else{

              that.$store.commit('setTableData',[name,that.pageTableBasic])
            }

            if(that.isactivateC==1){
              this.gettmp(activeTmpC)

            }else{

              that.$store.commit('setChildTableData',[name,that.pageTableBasicC])
            }

    }

}
</script>
<style scoped>
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
    margin-right: 5px;
    text-decoration: none;
  }
  .jihuo{
    float:right; color:#8492a6;width:13px;height:13px;border-radius:13px;margin-top:1px;
  }
.tableTem .el-dialog--small{min-width: 0}
.el-input__inner{
   height:28px!important;
}
</style>

