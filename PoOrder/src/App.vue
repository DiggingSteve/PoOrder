<template>
  <div id="app">
	<router-view></router-view>
	</div>
</template>





<script>




export default {
  name: 'app',

  data () {
		return {


    }
  },
   components: {

  },
  methods:{

  },
  mounted:function(){
       //this.getTmpdata()
      if(sessionStorage.getItem("nav")){
        this.$router.push({path:'/index'})
      }

  },
  computed:{

  },

  watch:{

  }

}


</script>

<style lang="less">


@w:width;
@h:height;
@lh:line-height;
@m:margin;
@p:padding;
@b:border;
@d:display;
@p:position;
@c:color;
@ta:text-align;
@bk:background;
@ft:font-size;
@f:float;
@mw:min-width;
@ti:text-index;
@mr:margin-right;
@bc:background-color;


@base: red;

.tableFieldConfig .el-input__inner{
   height:28px;
}
// button{
//      @{c}:@base
// }
*{
  box-sizing: border-box;
}
.input-content input{
   min-width: 210px;
}
.page-container-box input{
   height: 28px;

}
.page-container-box .el-input__inner{
   height:28px!important;
   width:100%
}

.sel-title{
  display: inline-block;
}

.el-textarea__inner{
   min-height:80px!important;
}
.el-select__tags{
  overflow: hidden;
  max-height:28px;
}
.el-select__tags span{
    display:flex;
  }
.el-tag .el-icon-close{
    top:5px
  }
 .el-dialog--small{
  /*width:100%;*/
  /*height:100%;*/
  /*top:0px!important;*/
  /*margin:0px;*/
}

.width100{
  width:100%!important;
  min-width: 640px!important;
  max-width: 640px!important;
}
.allwidth{
   width:100%!important;
}
.width579{
  width:579px!important;
  min-width: 579px!important;
  max-width: 579px!important;
}
.width289{
  width:289px!important;
  min-width: 289px!important;
  max-width: 289px!important;
}
.width400{
  width:400px!important;
  min-width: 400px!important;
  max-width: 400px!important;
}
.width600{
  width:600px!important;
  min-width: 600px!important;
  max-width: 600px!important;
}
.width300{
    width:300px!important;
  min-width: 300px!important;
  max-width: 300px!important;
}
.width50{
   //width:50%!important;
  // width:calc(100%/2)!important;
  //flex-grow: 0!important;
}

.width25{
   width:25%!important;
   max-width: 320px;
  //width:calc(100%/4)!important;
  //flex-shrink: 0!important;
}



.page-container-box{
  border:1px solid #ccc;
  padding-bottom:12px;
  margin-bottom: 15px;

}
.page-container-box h2{
  height:32px;
  line-height:32px;
  text-indent:5px;
  border-bottom:1px solid #ccc;
  margin-bottom:15px;
  font-size:18px;
  color:#333;
}
.page-container-box h3{
  color:#0F5A8C;
  margin-bottom: 5px;
}
.page-container-main{
  display: flex;
  justify-content:flex-start;
  flex-wrap: wrap;
  margin-right:100px;
}
.page-tab-checkbox .el-checkbox{
        min-width:110px;
}
.el-tab-pane{
  padding:0px 20px;
}
.el-date-editor--daterange.el-input {
  width:100%;
}
.el-dialog--small{
  width:auto;
  min-width: 400px;
  padding:0 30px
}
.el-table{
  border:0px solid #ccc;
  width:auto;
  table-layout:fixed;word-break:break-all;
}
table{
 border-collapse:collapse;
  border-spacing: 0px;
  padding:0px;
  margin: 0px;
 // table-layout:fixed;word-break:break-all;
 white-space:nowrap
}
.el-table .cell{white-space:nowrap}
.el-table__body, .el-table__footer, .el-table__header {
    table-layout: auto;
}
.el-radio__inner{width:15px;height:15px;}
.el-input__inner{height:auto}
.el-select .el-input .el-select__caret{line-height:0}
.el-date-editor .el-range__icon{line-height:8px;}
.el-date-editor .el-range-separator{line-height:20px;}

</style>
