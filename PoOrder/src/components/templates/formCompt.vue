<template>

 <div class="page-container-main">
       <!-- 基本信息模板 -->
              <template v-for="(item,itemIndex) in inputViewData" >

                  <div :style="{'width':item.width==50?'640px':item.width+'%'}" :key="item.id">
                      <div class="input-item" :class="[item.class]">

                      <div class="input-title">{{item.title}}</div>
                      <div  class="input-content" :class="[item.required==true?'input-required':'']">

               

                        <template v-if="item.type==1">
                          <el-input v-model="item.model" :placeholder="item.placeholder"></el-input>
                        </template>


                        <template v-else-if="item.type==2">
                          <el-checkbox-group v-model="item.model">
                                  <el-checkbox  v-for="checkitem in item.options" :label="checkitem" :key="checkitem">{{checkitem}}</el-checkbox>
                              </el-checkbox-group>
                        </template>

                    <template v-else-if="item.type==3">
                          <el-radio v-model="item.model"  v-for="(radioitem,radioIndex) in item.options" :label="radioIndex" :key="radioitem" :style="{'min-width':item.minW+'px'}">{{radioitem}}</el-radio>
                        </template>


                      <template v-else-if="item.type==4">
                            <el-select v-model="item.model" placeholder="请选择">
                                        <el-option
                                          v-for="selitem in item.options"
                                          :key="selitem.value"
                                          :label="selitem.label"
                                          :value="selitem.value">
                                        </el-option>
                            </el-select>
                      </template>

                      <template v-else-if="item.type==5">
                        <el-select v-model="item.model" multiple placeholder="请选择">
                        <li class="el-select-dropdown__item"  @click="selmultiAll(item.title)" ><span>全部</span></li>
                        <el-option
                          v-for="selMulitem in item.options"
                          :key="selMulitem.value"
                          :label="selMulitem.label"
                          :value="selMulitem.value">
                        </el-option>
                      </el-select>
                      </template>

                      <template  v-else-if="item.type==6">
                        <el-date-picker
                          v-model="item.model"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                      </template>

                      <template v-else-if="item.type==7">
                              <el-date-picker
                                   v-model="item.model"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                            </el-date-picker>
                      </template>

                      <template v-else-if="item.type==8">
                        <div style="position:relative">
                                   <i class="el-icon-edit" @click="textareaShow(itemIndex)" ></i>
                                        <el-collapse-transition>
                                    <div v-show="item.ifconShow" style="margin-left:15px;margin-top:-15px;width:300px;position:absolute" @click.stop="item.ifconShow=true">
                                          <el-input type="textarea" ></el-input>
                                    </div>
                                  </el-collapse-transition>

                         </div>
                      </template>

                      <template v-else-if="item.type==10">

                      <wtxmField :search="item.jsonArr" :type="item.type" @wtdata="wtdata"></wtxmField>
                      </template>

                      <template v-else-if="item.type==11">
                      <wtxmField :search="item.jsonArr" :type="item.type" @wtdata="wtdata"></wtxmField>
                      </template>



                      </div>
                      </div>
              </div>
              </template>


</div>


</template>
<script>



// type 1简单输入框 2.多选 3单选 4下拉 5下拉多选 6单日期 7.双日期 8操作要求 9分泡 嵌套输入框  10委托项目  11委托客户
//width是输入框组件在每行所占的百分比
//class 是输入框占父级的宽度
import wtxmField from "./wtxmField"

    export default {
          props:['inputViewData'],
           components: {
               wtxmField
        },
        data () {
            return {
                  extarShow:-1
            }

        },
        methods: {
           selmultiAll(name){ //下拉全选
          let condition=this.inputViewData
          console.log(name)
          for(let i in condition){
            if(name==condition[i].title){
              if(condition[i].options.length!=condition[i].model.length){
                condition[i].model=[]
                let res2=condition[i].options
                for(let j in res2){
                  //if(res2.indexOf())
                  condition[i].model.push(res2[j].value)
                }
                //
              }else{
                condition[i].model=[]
              }
            }
          }
        }
        ,textareaShow(index){

           this.extarShow=index;
           let inputViewData=this.inputViewData;
            if(inputViewData[index].ifconShow==true){
                document.body.removeEventListener('click',this.closeMenu);
                inputViewData[index].ifconShow=!inputViewData[index].ifconShow;
                document.body.addEventListener('click',this.closeMenu)
            }else{

                setTimeout(() => {
                            inputViewData[index].ifconShow=!inputViewData[index].ifconShow;
                      }, 0);
            }


        }
        ,closeMenu(){
          let index=this.extarShow;
          let inputViewData=this.inputViewData;
                for(let i in inputViewData){
                  if(inputViewData[i].type==8){
                          inputViewData[i].ifconShow=false;
                  }
                }
          },
          wtdata(wtdata){
            this.$emit('wtdataP',wtdata);
          }
       

        }
        ,created(){
          //console.log(groupid)
          // let inputViewData=this.inputViewData;
          // for(let i in inputViewData){
          //    if(inputViewData[i].groupid){
          //      for(let j in groupid){
          //        if(inputViewData[i].groupid==groupid[j].groupid){
          //          console.log(groupid[j].name)
          //          inputViewData[i].options.push(groupid[j].name)
          //        }
          //      }
          //    }
          // }

        }
        ,watch:{
          extarShow(index){
                      document.body.addEventListener('click',this.closeMenu)
          }
        }
    }


</script>
<style>

.input-item{
  width:320px;
  min-width: 320px;
  margin-bottom:18px;
  display: flex;
  align-items: center;
}
.input-title{
  width:105px;
  text-align: right;
   flex-shrink: 0;
   font-size:14px;
}
.input-content{
  flex-grow: 1;
  margin-left:5px;

}
.input-required input{
    border: none;
    box-shadow: 0px 0px 1px 1px #fda8a8;
}
h2{
  font-size: 18px;
  color:#333;
}
</style>
