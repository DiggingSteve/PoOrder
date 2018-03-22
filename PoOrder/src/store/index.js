import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
       publicWebApi:'http://192.168.0.167/PublicWebApi/',
      webApi:'http://192.168.0.167/PoManagementWebApi/',
    tableTmpAll:[],
    tablePageTmp:{},
    childrenTableTmpAll:[],
    childrenTablePageTmp:{},
  },
  mutations: {
    setTableTmpAll(state,val){
          state.tableTmpAll=val;
    },
    setTableData(state,val){

      Vue.set(state.tablePageTmp, val[0], val[1] )
    },

setChildTableTmpAll(state,val){
   state.childrenTableTmpAll=val;
 },
 setChildTableData(state,val){

      Vue.set(state.childrenTablePageTmp, val[0], val[1] )
    },

  }
})
export default store
