<template>
  <div style="padding-top:8px;padding-bottom:8px;">
      
        <template v-for="(item,itemIndex) in listContent" v-if="mawbC==1">
        
        		<div class="mawb" :style="{width:item.width}">
        			<span style="min-width:120px;margin-right:5px;text-align:right;display:inline-block">{{item.name}}：</span>
        			<span :style="{color:item.color}">{{content[item.id]}}</span>
        		</div>
        
        </template>

        <template  v-if="hawbC==1" v-for="(item,itemIndex) in listContent">
            <div class="mawb" :style="{width:item.width}">
              <span style="min-width:120px;margin-right:5px;text-align:right;display:inline-block">{{item.name}}：</span>
              <span :style="{color:item.color}">{{hawbContent[item.id]}}</span>
            </div>
        	<!-- <ul>
        		<li>
        			<span>{{item.name}}:</span>
        			<span>{{content2[item.id]}}</span>
        		</li>
        	</ul> -->
          
          
        </template>
        

  </div>


</template>
<script>


    export default {
          props:['listContent','content','mawbC','hawbC','hawbContent'],
        data () {
            return {
              
              
             
            }

        },
        methods: {
          
        }
       
        ,watch:{
         
        }
       
    }


</script>
<style>
/*
.input-item{
  width:320px;
  min-width: 320px;
  margin-bottom:12px;
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

}*/
.mawb{display:inline-block;font-size:14px;padding:10px;}



</style>
