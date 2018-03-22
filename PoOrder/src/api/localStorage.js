  //用户名usrname  票据ticket   地区area    基础数据groupType
  const setStorage=function setStorage(name,val){
      localStorage.setItem(name,val)
   }
   const getStorage=function getStorage(name){
	  return localStorage.getItem(name)
   }
   const clearStorage=function clearStorage(name){
	localStorage.removeItem(name)
   }
   const searCondition=function searCondition(condition){
   	let scondition={};
    let val=""
    for(let i in condition){
    	if(condition[i].model){
    		if(condition[i].sear==1){//是否搜索页面查询
    		   if(condition[i].whereC){//是否存在“in”，“like”
                  if(condition[i].whereC=="like"){
                  	 scondition[condition[i].id]={"like":condition[i].model}
                  }else if(condition[i].whereC=="in"){
                    if(condition[i].model.length>0){
                    	let selS=""
             		let sel=condition[i].model
              		for(let i in sel){
              		selS+=sel[i]+","
            		}
            		 scondition[condition[i].id]={"in":selS.substring(0,selS.length-1)}
                    }
                  }
    		   }else{
                  if(condition[i].type==7){//查询中日期赋值
                  	 let time=condition[i].model
                  	 console.log(time)
                     scondition[condition[i].id]={"begin":time[0].getFullYear()+"-"+(time[0].getMonth()+1)+"-"+time[0].getDate(),"end":time[1].getFullYear()+"-"+(time[1].getMonth()+1)+"-"+time[1].getDate()}
                  }else if(condition[i].type==5){//查询中下拉赋值
                  	 if(condition[i].model.length>0){
                       	let selS=""
             		let sel=condition[i].model
              		for(let i in sel){
              		selS+=sel[i]+","
            		}
            		scondition[condition[i].id]={"in":selS.substring(0,selS.length-1)}  
                  	 }
                 
                  }
    		   }	
    		}else{
                if(condition[i].type==5){
                	if(condition[i].model.length>0){
                       	let selS=""
             		let sel=condition[i].model
              		for(let i in sel){
              		selS+=sel[i]+","
            		}
            		scondition[condition[i].id]={"in":selS.substring(0,selS.length-1)}  
                  	 }
                  	}else if(condition[i].type==6){
                  		scondition[condition[i].id]=time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
                  	}
                  	else{
                  	scondition[condition[i].id]=condition[i].model	
                  	}
				
    		}
    	}
    }
    return scondition
   }

   export {
	setStorage,
	getStorage,
	clearStorage,
	searCondition
}

