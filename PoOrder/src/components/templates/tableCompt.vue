
<style lang="less" scoped>
table{
  //width:100%;
}



#topDivTable{
 position:relative;
 height:380px;
 border:1px solid #ccc;
 box-sizing: border-box;
 border-radius:1px;
 margin:0px 0px;
 overflow:scroll;
 overflow-y:auto;
 overflow-x:auto;


}

#headFixed{
   position:absolute;
   z-index:999;
   height:50px;
   overflow:hidden;
}
#divTable{
  // width: -moz-calc(100% - 10px);
  // width: -webkit-calc(100% - 10px);
  // width: calc(100% - 10px);
  width:100%;
   position:absolute;
}

#leftSideFixed{
    position:absolute;
    z-index:999;
    //background-color:#fff;
}



.trRow{
 color:#333;
 font-size:12px;
background-color:#fff;
}
.trRow td,th{
  height:32px;
  line-height:32px;
  min-width:100px;
  text-align:center;
  padding:0px 8px;
  border:1px solid #ccc;
  white-space:nowrap;

}
.thfont{
  font-weight:600;
}
.thfont th{
   background-color:#f5f7fa;
   border-top:0px solid #ccc;
}
.trRow .inputDuv{
  width:50px;
  min-width:50px;
}

// .thfont th[field="operation"]{
//   width:150px!important;
// }

.operation{
  min-width:150px;
}
td i{
  display:inline-block;
  width:16px;
  height:16px;
  margin-right:12px;
  font-size:14px;
  cursor:pointer;
}


 .fixDiv{
   display: flex;
   flex-wrap: nowrap;
   height: 32px;
   line-height: 32px;
   align-items: center;
   margin-top: 0px;
   position: absolute;
 }
 .fixHeadDiv{
   height: 32px;
   line-height: 32px;
   min-width: 100px;
   text-align: center;
   padding: 0px 8px;
  //  border-bottom: 1px solid #ccc;
  //  border-right: 1px solid #ccc;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   background: #EEF1F6;
  }
  // .checkbox{
  //   max-width:100px!important;
  // }
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
.ziTable{

}
</style>


<template>
  <div style="width:100%;height:100%;text-align:left;">




    <div style="height:32px;display:flex;justify-content:space-between;align-items:center;border:1px solid #ccc;padding:0 5px;border-bottom:none">
      <h2>查询结果</h2>
      <tableFieldConfig :name="name"></tableFieldConfig>
    </div>




    <div id="topDivTable" v-scroll="onScroll">




      <!--滚动表身-->
      <div id="divTable">
        <table>

          <tr class="trRow thfont" ref="mybox">
            <th v-for="(relation,index) in dataTable[0]"  :class='[relation.field]' :width="{width:getWidth(relation.field)}" >{{relation.title}}</th>
            <th v-for="(relation,index) in dataTable[1]"  :class='[relation.field]' :width="{width:getWidth(relation.field)}" >{{relation.title}}</th>
          </tr>

<template v-for="(row,index) in dataContent">
          <tr class="trRow" >


            <td v-for="item in dataTable[0]" :class='[item.field]'>

              <template v-if="item.field === 'checkbox'">
                <input type="checkbox">
              </template>
              <template v-else-if="item.field=== 'index'">
                {{(currentPage-1)*pageSize+1+index}}
              </template>
              <template v-else-if="item.field=== 'operation'">
                <template v-for="cell in item.formatter.split('\'')[1].split(',')">
                  <i v-if="cell=='setCell'" class="el-icon-delete" @click="setCell(cell)"></i>
                  <i v-else-if="cell=='sureCell'" class="el-icon-check" @click="sureCell(cell)"></i>
                  <i v-else-if="cell=='cancelCell'" class="el-icon-close" @click="cancelCell(cell)"></i>
                  <i v-else="cell=='dialogueCell'" class="el-icon-message" @click="dialogueCell(cell)"></i>
                </template>

           <!-- <i class="el-icon-arrow-down" style="margin-right:20px"></i> -->
              </template>
               <template v-else-if="item.field==='pono'">
              <i v-if="row.potype=='1'||row.isSplit!='0'" class="el-icon-arrow-down" @click="openNestedTables(((currentPage-1)*pageSize+index))"></i>{{row[item.field]}}
              </template>
              <template v-else>
                {{row[item.field]}}
              </template>
            </td>

            <td v-for="(item,index) in dataTable[1]">
              {{row[item.field]}}
            </td>

          </tr>
                <!-- <tr v-if="ziTableIndex==index">
                  <td  colspan="30"  class="ziTable" :height="{height:getHeight('ziTable')}">
                   <nestedTables></nestedTables>
                  </td>
                  </tr> -->

                  <tr v-if="ziTableIndex==((currentPage-1)*pageSize+index)">
                  <td  colspan="30"   :class="'ziTable'+index" :height="getHeight('ziTable'+((currentPage-1)*pageSize+index))">
                   <!-- <nestedTables2 style="z-index:999;position:relative;left:200px" :name="name" :table-data-res="tableDataRes"></nestedTables2> -->
                 <!-- <nested-tables :style="{left:dataTable[0].length*100+'px'}"></nested-tables> -->
                 <!-- <nested-tables3  :style="getLeft" :table-data="tableData" hide-fixed="date"></nested-tables3> -->
                 <nested-tables3  :style="getLeft" :head="head" hide-fixed="" :tableData5="dataContent"></nested-tables3>
                    <!-- <nestedTables2 :style="getLeft" style="position:relative" :name="name" :table-data-res="tableDataRes"></nestedTables2> -->

                  </td>
                  </tr>

          </template>
        </table>

      </div>

      <!--滚动表身end-->


    <!--表头固定-->
    <div id="headFixed" :style="styleObj"  v-run="register('test1')">
    <table>
      <tr class="trRow thfont">
        <th v-for="(relation,index) in dataTable[0]"  :class="[relation.field+'Fixed']">{{relation.title}}</th>
       <th v-for="(relation,index) in dataTable[1]"  :class="[relation.field+'Fixed']">{{relation.title}}</th>
    </tr>
    </table>
    </div>
      <!--表头固定end-->

      <!--左侧固定列-->
      <div id="leftSideFixed" :style="styleObj2">

      <table>

      <tr class="trRow thfont" :style="styleObj" style="position:absolute;z-index:1002">
                  <th v-for="(relation,index) in dataTable[0]" :class="[relation.field+'Fixed']">{{relation.title}}</th>
      </tr>
        <tr class="trRow thfont">
        <th v-for="(relation,index) in dataTable[0]" :class="[relation.field+'Fixed']">{{relation.title}}</th>
        </tr>


<template  v-for="(row,index) in dataContent">
      <tr class="trRow">
          <td v-for="item in dataTable[0]" :class="[item.field+'Fixed']">
              <template v-if="item.field === 'checkbox'">
              <input type="checkbox">
              </template>
              <template v-else-if="item.field=== 'index'">
                {{(currentPage-1)*pageSize+1+index}}
              </template>
              <template v-else-if="item.field=== 'operation'">
              <template v-for="cell in item.formatter.split('\'')[1].split(',')">
              <i v-if="cell=='setCell'" class="el-icon-delete" @click="setCell(cell)"></i>
              <i v-else-if="cell=='sureCell'" class="el-icon-check" @click="sureCell(cell)"></i>
              <i v-else-if="cell=='cancelCell'" class="el-icon-close" @click="cancelCell(cell)"></i>
              <i v-else="cell=='dialogueCell'" class="el-icon-message" @click="dialogueCell(cell)"></i>
              </template>


              </template>
               <template v-else-if="item.field==='pono'">
              <i v-if="row.potype=='1'||row.isSplit!='0'" class="el-icon-arrow-down" @click="openNestedTables(((currentPage-1)*pageSize+index))"></i>{{row[item.field]}}
              </template>
              <template v-else>
              {{row[item.field]}}
              </template>
          </td>
      </tr>
      <!-- <tr v-if="ziTableIndex==index">
        <td  colspan="30" class="ziTable">
         {{ziTableIndex}}{{index}}
        </td>
      </tr> -->

      <tr v-if="ziTableIndex==((currentPage-1)*pageSize+index)">
        <td  colspan="30" :class="'ziTable'+((currentPage-1)*pageSize+index)+'Height'" style="position:relative">
          <!-- <div :class="'ziTable'+index">

          </div> -->
         <!-- {{ziTableIndex}}{{index}}{{row.ziTable}} -->
         <!-- <table>
           <tr><th>姓名</th></tr>
                <tr v-for="nestItem in tableData">
                    <td>{{nestItem.name}}</td>
                  </tr>
         </table> -->
        <!--  <nested-tables3  :table-data="tableData" show-fixed="date" class="operationFixed" style="float:right;max-width:150px;position:absolute;top:0px;right:0px;" ></nested-tables3> -->

        </td>
      </tr>

    </template>


      </table>
      </div>
      <!--左侧固定列end-->


    </div>

<!-- 分页组件 -->
    <div class="block" style="margin-top:10px;">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataRes.length">
      </el-pagination>
    </div>




  </div>
</template>

<script>
import tableFieldConfig from './tableFieldConfig'
import nestedTables from './nestedTables'
import nestedTables2 from './nestedTables2'
import nestedTables3 from './nestedTables3'


    export default {
       props:['tableDataRes',"name"],
       components: {
         tableFieldConfig,nestedTables,nestedTables2,nestedTables3
       },
        data () {
            return {
                position: {scrollTop: '0px', scrollLeft: '0px'},
                //dataTable:[], //表格模板
                dataContent:[], //表格分页显示的数据
               // tableDataRes:[],  //表格查询结果
                elements : {},
                pageSize:20,//默认每页显示数据
                currentPage:1, //目前页码
                ziTableIndex:-1,
                  tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                  }],
                  getLeft:{
                            left:'0px',
                            width:'0px'
                      } //左侧子表格的定位和宽度

			   }
        },

			methods: {

		  onScroll:function(e, position){
						  this.position = position;
					 },

		  getComputedVal:function(val,row,index,item){
			      let myDefaultFunc=this.myDefaultFunc;
				    	let fieldName=item.field;
					   if(fieldName=='checkbox'){
						 return '<input type="checkbox">'
					   }
						if(fieldName=='index'){
						 return index+1
					   }
						if(fieldName=='operation'){
						 	//var funcSet=this.funcSet;

						 // return '<i class="el-icon-delete" ></i><i class="el-icon-check"></i><i class="el-icon-close"></i><i class="el-icon-message"></i>'

						/*	var setCell=this.setCell;
						  let func= eval(row.formatter);
					       return func(val);*/
					   }

					   return val;
					} ,

		   setCell(val){
		  				   alert(val)
						},
        sureCell(val){
          alert(val)
        },
        cancelCell(val){
          alert(val)
        },
        dialogueCell(val){
          alert(val)
        },
		   funcSet(val,row,index){
							  console.log(val);
						},
					register (flag) {
						return (el)=>{
							this.elements[flag] = el;
						}
					},
			myDefaultFunc(funname,val,row,index){

			            let setCell=this.setCell;
						var funcArr=funname.split(',');
						var fun="";
						for(let i in funcArr){
						     let fun2=eval(funcArr[i])
							if(fun2 && typeof(fun2)=='function'){
							   fun+= fun2(val,row,index)
								}
						}
						   return fun;
					},
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize=val
          this.dataContent=this.tableDataRes.slice(0,val)
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.currentPage=val;
          this.dataContent=this.tableDataRes.slice((val-1)*this.pageSize,val*this.pageSize)
        }
        ,getWidth(name){

          var that=this;

          setTimeout(function(){
            var box = document.getElementsByClassName(name);
            var BoxFixed=document.getElementsByClassName(name+'Fixed');
            if(box[0]){
                   let  w=box[0].clientWidth
                   let BoxFixedWidth=BoxFixed[0].clientWidth
        //           let  h=box[0].clientHeight
        //           let className=box[0].className
        //           let textContent=box[0].textContent
        //
                    if(w==BoxFixedWidth){
                      return;
                    }
                    for(var i in BoxFixed){
                      if(typeof BoxFixed[i] =='object'){
                        BoxFixed[i].style['min-width']=w+1+"px"
                        BoxFixed[i].style['width']=w+1+"px"
                      }
                    }
            }
                  },0)



        }
        ,getHeight(name){
               //console.log(name)
          var that=this;

          setTimeout(function(){
            var box = document.getElementsByClassName(name);
             var BoxHeight=document.getElementsByClassName(name+'Height');

            if(box[0]){
                   //let  w=box[0].clientWidth
                  //let  h=box[0].clientHeight
                   let h=box[0].children[0].clientHeight //获取td里面的子元素高度
                    for(var i in BoxHeight){
                      if(typeof BoxHeight[i] =='object'){
                        //console.log(box[i])
                        BoxHeight[i].style['height']=h+1+"px"

                      }
                    }
            }

                  },0)



        }
      ,openNestedTables(index){
      //alert(index)
      //console.log(JSON.stringify(this.dataContent))
      if(index==this.ziTableIndex){
         this.ziTableIndex=-1
      }else{
        this.ziTableIndex=index
      }
     // console.log(this.dataContent[index].ziTable)
// this.dataContent[index].ziTable=!this.dataContent[index].ziTable;
     // console.log(this.dataContent[index].ziTable)

       // this.dataContent.push({})
      }
      },
			 directives : {
                 run (el, binding) {
					if (typeof binding.value == 'function')
						binding.value(el);
				 }
			},
			computed:{
			   styleObj: function () {
		         	// let h=this.dataContent.length*33;

              //   return {
              //       top:this.position.scrollTop>h?h:this.position.scrollTop+'px'
              //       } //已经不知道当初为什么要这样设置高度，应该是防止没有分页的问题。

                return {
                    top:this.position.scrollTop+'px'
                    }

					},

		  	styleObj2: function () {
					return {
					     left:this.position.scrollLeft+'px',
					    }
           }
        //  ,

        //     getLeft(){


        //               let left=document.getElementById('leftSideFixed').clientWidth
        //               let ziRigthTableWidth=document.getElementById('divTable').clientWidth
        //               return {
        //                     left:left+'px',
        //                     width:ziRigthTableWidth-left+'px'
        //                   }


        //     }
          ,
        dataTable(){


          let name=this.name.split('.')[0]

            var data=this.$store.state.tablePageTmp[name]
             // console.log(name)
           // console.log(data)
            if(data){
              return data
            }else{
                return []
            }



           },
           head(){

  let name=this.name.split('.')[0]

            var data=this.$store.state.childrenTablePageTmp[name]
             // console.log(name)
           // console.log(data)
            if(data){
              //alert(data)
              return data
            }else{
                return []
            }


           }


			 },
			mounted () {
      //  this.heightFi=document.getElementsByClassName('ziTable0')[0].clientHeight+'px';

       // this.getTmpdata()

        //this.init()
       // console.log(global.getTableData())

      }
      ,watch:{
         tableDataRes(){
              this.dataContent=this.tableDataRes.slice(0,this.pageSize);
         }

      },
      beforeUpdate(){

      },
      updated(){
                          // this.$nextTick(function () {

                          //  })
                   var that=this;
                   let left1="";
                   let left2="";
                           setTimeout(function(){
                    //let left=document.getElementById('leftSideFixed').clientWidth
                    if(document.getElementsByClassName('checkboxFixed')[0]){
                        left1=document.getElementsByClassName('checkboxFixed')[0].clientWidth
                    }
                    if(document.getElementsByClassName('indexFixed')){
                        left2=document.getElementsByClassName('indexFixed').clientWidth
                    }
               
                     let ziRigthTableWidth=document.getElementById('divTable').clientWidth
                    if(left1&&left2){
                        var obj={
                           left:left1+left2+'px',
                            //width:ziRigthTableWidth+left+'px'
                          }
                          if(that.getLeft.left!=obj.left){
                             that.getLeft=obj

                          }
                    }
                  

                  },0)
             //    console.log(2)

      }


    }











</script>


