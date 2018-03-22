
import Vue from 'vue'
var subEvent=new Vue()


export default {
	dataval:["1","2","3"],
	subEvent:subEvent,
   setStorage(name,val){
      localStorage.setItem(name,val)
   },
   getStorage(name){
	  return localStorage.getItem(name)
   },
   clearStorage(name){
	localStorage.removeItem(name)
   }


}

// function Mystore(){

// }
// A.prototype.setStorage=function(){
// 	console.log(1)
// }
//  A.prototype.getStorage=function(){
// 	console.log(2)
//  }
//  A.prototype.clearStorage=function(){
// 	 console.log(3)
//  }

//  const B = new Mystore()
//  B.setStorage();
//  B.getStorage();
//  B.clearStorage();









