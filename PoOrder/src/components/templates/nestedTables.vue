  <template>
    <el-table
      :data="tableData" style="width:100%;"  >

<template  v-for="item in head">
        <el-table-column :prop="item.prop" :label="item.label" :width="item.width" v-if="setShow(item.prop)">

      </el-table-column>
</template>

      <!-- <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->

    </el-table>
  </template>

  <script>
    export default {
      props:["tableData",'showFixed',"hideFixed"],
      data() {
        return {
          head:[{
            prop:"date",
            label:"日期",
            width:''
          },
          {
            prop:"name",
            label:"姓名",
            width:''
          },
          {
            prop:"address",
            label:"地址",
            width:''
          }
          ]

          // tableData: [{
          //   date: '2016-05-02',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // }, {
          //   date: '2016-05-04',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1517 弄'
          // }, {
          //   date: '2016-05-01',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1519 弄'
          // }, {
          //   date: '2016-05-03',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1516 弄'
          // }]
        }


      }
      ,methods:{
          setShow(prop){
               if(this.showFixed){
                 return prop==this.showFixed
               }else if(this.hideFixed){
                 return prop!=this.hideFixed
               }else{
                 return true
               }
        }
      }
     ,updated(){
            //  alert(3)
            //       console.log(3)
     
      }
    }
  </script>
  <style>
  table{

  }
  </style>

