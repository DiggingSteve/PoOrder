<template>
  <table style="width:100%;text-align:center;">
    <tr>
      <th v-for="item in head">
        {{item.title}}
      </th>
    </tr>
    <tr v-for="(row,index) in tableData5">
      
          <td v-for="item in head">
            {{row[item.field]}}
          </td>
       
    </tr>
  </table>
<!--   <el-table
    :data="tableData5"
   >

    <template  v-for="item in head">
        <el-table-column :prop="item.field" :label="item.title" :width="item.width" >
        </el-table-column>
   </template>

  
  </el-table> -->
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
        props:["head",'showFixed',"hideFixed","tableData5"],
    data() {
      return {
        // tableData5: [{
        //   id: '12987122',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
        // }, {
        //   id: '12987123',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
        // }, {
        //   id: '12987125',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
        // }, {
        //   id: '12987126',
        //   name: '好滋好味鸡蛋仔',
        //   category: '江浙小吃、小吃零食',
        //   desc: '荷兰优质淡奶，奶香浓而不腻',
        //   address: '上海市普陀区真北路',
        //   shop: '王小虎夫妻店',
        //   shopId: '10333'
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
      },
      created(){
        //this.head=this.$store.state.childrenTablePageTmp[name]
         // console.log(222222)

      }
      ,updated(){
        console.log(this.head)
            // alert(3)
                //  console.log(3)
     
      } 
  }
</script>
