<template>
  <div>
    <div class="header">
      <p>
        订单编号： <span class="orderno">{{ orderno }}</span>
        <el-button type="success" size="small" style="float: right;">本票文档</el-button>
      </p>
    </div>

    <div class="content">

      <div class="detail">
        <p class="detailTitle">订单信息</p>
        <formCompt :input-view-data="orderInputViewData"></formCompt>
      </div>

      <div class="detail">
        <p class="detailTitle">应收运费信息</p>
        <div class="currency">
          <p>{{ fareInputViewData.currency.title }}</p>
          <el-radio 
            v-model="fareInputViewData.currency.model" 
            v-for="(item, index) in fareInputViewData.currency.options" 
            :label="item" 
            :key="index">
            {{ item }}
          </el-radio>
        </div>
        <div class="price" v-for="(item, key ,index) in fareInputViewData" :key="index" v-if="key !== 'currency'">
          <div>
            <p>{{ item.title }}</p>
            <el-input v-model="item.inputdata"></el-input>
            <el-radio 
              v-model="fareInputViewData[key].model" 
              v-for="(item, index) in item.options" 
              :label="item" 
              :key="index">
              {{ item }}
            </el-radio>
          </div>
          <div>
            <p>分泡比例：</p>
            <p>
              <span>WFF：</span>
              <el-input v-model="item.fpbl.WFF"></el-input>
              <span>客户：</span>
              <el-input v-model="item.fpbl.client"></el-input>
            </p>
          </div>
        </div>
      </div>

      <div class="detail">
        <p class="detailTitle">请您选择始发港需要的总单服务!</p>
        <div style="display: inline-block;vertical-align: top;">
          <div class="service" v-for="(item, index) in serviceInputViewData" :key="index" v-if="index < 2">
            <div class="operating" v-if="index == 0">单证操作</div>
            <service :servicedata="item"></service>
          </div>
        </div>
        <div style="display: inline-block">
          <div class="service" v-for="(item, index) in serviceInputViewData" :key="index" v-if="index >= 2">
            <div class="operating" v-if="index == 2">外场操作</div>
            <service :servicedata="item"></service>
          </div>
        </div>
      </div>

      <div class="detail" v-show="serviceInputViewData[0].model">
        <p style="cursor: pointer;" class="detailTitle" @click="showsendinformation = !showsendinformation">总单收发货人信息!</p>
        <el-collapse-transition>
          <div v-show="showsendinformation">
            <div class="send">
              <div>
                <p class="label">发货人：</p>
                <el-input class="input" v-model="addressInputViewData.send.sender"></el-input>
                <el-button>保存</el-button>
              </div>
              <div class="address">
                <p>抬头</p>
                <el-input type="textarea" v-model="addressInputViewData.send.invoice_title"></el-input>
                <p>地址</p>
                <el-input type="textarea" v-model="addressInputViewData.send.address"></el-input>
              </div>
              <div class="information">
                <div 
                  :class="['info_item', {'nopadding': key == 'postal_code' || key == 'email'}]" 
                  v-for="(item, key, index) in addressInputViewData.send" 
                  :key="index" v-if="index >= 3">
                  <p>{{ translation_text[key] }}</p>
                  <el-input v-model="addressInputViewData.send[key]"></el-input>
                </div>
              </div>
            </div>

            <div class="receive">
              <div>
                <p class="label">收货人：</p>
                <el-input class="input" v-model="addressInputViewData.receive.receiver"></el-input>
                <el-button>保存</el-button>
              </div>
              <div class="address">
                <p>抬头</p>
                <el-input type="textarea" v-model="addressInputViewData.receive.invoice_title"></el-input>
                <p>地址</p>
                <el-input type="textarea" v-model="addressInputViewData.receive.address"></el-input>
              </div>
              <div class="information">
                <div 
                  :class="['info_item', {'nopadding': key == 'postal_code' || key == 'email'}]" 
                  :key="index" 
                  v-for="(item, key, index) in addressInputViewData.receive" 
                  v-if="index >= 3">
                  <p>{{ translation_text[key] }}</p>
                  <el-input v-model="addressInputViewData.receive[key]"></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>

      <div class="fdinformation" >
        <div class="detail">
          <p class="detailTitle" @click="showfdinformation = !showfdinformation">分单信息</p>

          <el-collapse-transition>
            <div style="margin: 0;" v-show="showfdinformation">
              <el-tabs v-model="fydhCurrentTabs" type="card" closable>
                <el-tab-pane v-for="item in fbTabs" :key="item.name" :label="item.fydh" :name="item.name">
                </el-tab-pane>
              </el-tabs>
              <div class="addfd">
                <el-button @click.native="addfd">添加分单</el-button>
              </div>
              <div>
                asd
              </div>
            </div>
          </el-collapse-transition>
          
        </div>

        <el-collapse-transition>
          <div class="detail" v-show="showfdinformation">
            <p class="detailTitle">请选择您需要的分单服务！</p>
          </div>
        </el-collapse-transition>
      </div>

    </div>

    <div class="footer">
      <div class="right-btn" style="float: right">
        <el-button>订单系统操作</el-button>
        <el-button>分配至外站</el-button>
        <el-button>保存待分配</el-button>
        <el-button>本站操作</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import formCompt from "./templates/formCompt"

let service = {
  template: `
    <div>
      <p class="serviceTitle">{{ servicedata.title }}</p>
      <el-checkbox class="checkbox" v-model="servicedata.model"></el-checkbox>
      <div class="oprequest">
        <p>操作要求：</p>
        <i class="el-icon-edit" @click="showtextarea = !showtextarea"></i>
        <el-input
          @click.native.stop="showtextarea = true"
          type="textarea"
          class="oprequest-text"
          :rows="2"
          v-show="showtextarea"
          v-model="servicedata.oprequest">
        </el-input>
      </div>
    </div>
  `,
  props: ['servicedata'],
  data () {
    return {
      showtextarea: false
    }
  },
  methods: {
    closetextarea () {
      this.showtextarea = false
    }
  },
  watch: {
    showtextarea (val) {
      if (val) {
        document.body.addEventListener('click', this.closetextarea)
      } else {
        document.body.removeEventListener('click', this.closetextarea)
      }
    }
  }
}


export default {
  components: {
    formCompt,
    service
  },
  props: {
    orderno: {
      type: String,
      default: 'BO1803090002AE/PVG'
    }
  },
  data () {
    return {
      showsendinformation: true,
      showfdinformation: true,
      fydhCurrentTabs: '0',
      orderInputViewData: [
        {"title":"运输方式：",id:"transport",type:3,"class": "width100",width: 100,"model":"","defaultModel":"",minW: 80,required: true,options: [
          '空运',
          '海运',
          '陆运',
          '铁运'
        ]},
        {"title":"配舱操作：",id:"pccz",type:3,"class": "width100",width: 100,"model":"","defaultModel":"",minW: 80,required: true,options: [
          '唯凯配舱',
          '唯凯代操作'
        ]},
        {"title":"委托客户：",id:"wtkhname",type:1,class: "width100",width: 50,"model":"","defaultModel":"",required: true},
        {"title":"委托项目：",id:"wtproject",type:1,class: "width100",width: 50,"model":"","defaultModel":"",required: true},
        {"title":"始发港：",id:"sfg",type:1,width: 50,"model":"","defaultModel":"",required: true},
        {"title":"目的港：",id:"mdg",type:1,width: 50,"model":"","defaultModel":"",required: true},
        {"title":"要求航班号：",id:"yqhbh",type:1,class: "width25","model":"","defaultModel":""},
        {"title":"要求航班日期：",id:"yqhbrq",type:6,class: "width25","model":"","defaultModel":""},
        {"title":"起飞时间：",id:"qftime",type:1,class: "width25","model":"","defaultModel":""},
        {"title":"要求全程天数：",id:"yqqcts",type:1,class: "width25","model":"","defaultModel":""},
        {"title":"航班种类：",id:"hbzl",type:3,"class": "width100",width: 100,"model":"","defaultModel":"",minW: 80,options: [
          '均可',
          '直达',
          '中转'
        ]},
        {"title":"货物性质：",id:"wzxz",type:3,"class": "width100",width: 100,"model":"","defaultModel":"",minW: 80,required: true,options: [
          '普货',
          '危险品',
          '冷冻品',
          '鲜活品',
          '贵重品'
        ]},
        {"title":"预报件数：",id:"ybjs",type:1,class: "width25","model":"","defaultModel":"",required: true},
        {"title":"预报重量：",id:"ybzl",type:1,class: "width25","model":"","defaultModel":"",required: true},
        {"title":"预报体积：",id:"ybtj",type:1,class: "width25","model":"","defaultModel":"",required: true},
        {"title":"分单数量：",id:"fdsl",type:1,class: "width25",width: 100,"model":"","defaultModel":"",required: true},
      ],
      fareInputViewData: {
        currency: {
          model: '',
          title: '运费币种：',
          options: [
            'CNY',
            'HKD',
            'USD',
            'JPY'
          ]
        },
        price: {
          inputdata: '',
          model: '',
          title: '运费价格：',
          options: [
            '单价ALLIN',
            '单价++',
            '总价'
          ],
          fpbl: {
            WFF: '',
            client: ''
          }
        },
        transfer: {
          inputdata: '',
          model: '',
          title: '中转费：',
          options: [
            '单价',
            '总价'
          ],
          fpbl: {
            WFF: '',
            client: ''
          }
        }
      },
      serviceInputViewData: [
        {"title":"总运单制作服务：",id:"orderzzfw","model":"","oprequest":"",required: true,showtextarea: false},
        {"title":"Manifest制作服务：",id:"manifest","model":"","oprequest":"",required: true,showtextarea: false},
        {"title":"安检服务：",id:"ajfw","model":"","oprequest":"",required: true,showtextarea: false},
        {"title":"打板服务：",id:"dbfw","model":"","oprequest":"",required: true,showtextarea: false},
        {"title":"交接服务：",id:"jjfw","model":"","oprequest":"",required: true,showtextarea: false}
      ],
      addressInputViewData: {
        send: {
          sender: '',
          invoice_title: '',
          address: '',
          two_word_code: '',
          state: '',
          city: '',
          postal_code: '',
          contacts: '',
          phone: '',
          fax: '',
          email: ''
        },
        receive: {
          receiver: '',
          invoice_title: '',
          address: '',
          two_word_code: '',
          state: '',
          city: '',
          postal_code: '',
          contacts: '',
          phone: '',
          fax: '',
          email: ''
        }
      },
      translation_text: {
        invoice_title: '抬头',
        address: '地址',
        two_word_code: '国家二字码',
        state: '州名',
        city: '城市',
        postal_code: '邮编',
        contacts: '联系人',
        phone: '电话',
        fax: '传真',
        email: 'Email'
      },
      fdInformation: [{
        fydh: 'YSSHA18030016',
        mdg: 'LAX',
        POddbh: '',
        xjs: '',
        hwlx: {
          model: '',
          ldcmodel: '',
          options: [
            '一般',
            '化工品',
            '锂电池',
            '超大件(需安检24小时以上)'
          ],
          ldcoptions: [
            'PI 965',
            'PI 966',
            'PI 967',
            'PI 968',
            'PI 969',
            'PI 970II'
          ]
        },
        myfs: {
          fcmodel: '',
          fpmodel: '',
          fcoptions: [
            'FOB',
            'FCA',
            'EXW'
          ],
          fpoptions: [
            'CIF',
            'C&F',
            'DAT',
            'DDP',
            'DAP'
          ]
        },
        enpm: '',
        cnpm: ''
      },{
        fydh: 'YSSHA18030011',
        mdg: 'LAX',
        POddbh: '',
        xjs: '',
        hwlx: {
          model: '',
          ldcmodel: '',
          options: [
            '一般',
            '化工品',
            '锂电池',
            '超大件(需安检24小时以上)'
          ],
          ldcoptions: [
            'PI 965',
            'PI 966',
            'PI 967',
            'PI 968',
            'PI 969',
            'PI 970II'
          ]
        },
        myfs: {
          fcmodel: '',
          fpmodel: '',
          fcoptions: [
            'FOB',
            'FCA',
            'EXW'
          ],
          fpoptions: [
            'CIF',
            'C&F',
            'DAT',
            'DDP',
            'DAP'
          ]
        },
        enpm: '',
        cnpm: ''
      }]
    }
  },
  computed: {
    fbTabs () {
      return this.fdInformation.map((i, index) => {
        return {
          fydh: i.fydh,
          name: String(index)
        }
      })
    }
  },
  methods: {
    addfd () {
      this.fdInformation.push({
        fydh: 'new',
        mdg: 'LAX',
        POddbh: '',
        xjs: '',
        hwlx: {
          model: '',
          ldcmodel: '',
          options: [
            '一般',
            '化工品',
            '锂电池',
            '超大件(需安检24小时以上)'
          ],
          ldcoptions: [
            'PI 965',
            'PI 966',
            'PI 967',
            'PI 968',
            'PI 969',
            'PI 970II'
          ]
        },
        myfs: {
          fcmodel: '',
          fpmodel: '',
          fcoptions: [
            'FOB',
            'FCA',
            'EXW'
          ],
          fpoptions: [
            'CIF',
            'C&F',
            'DAT',
            'DDP',
            'DAP'
          ]
        },
        enpm: '',
        cnpm: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header, .content {
  margin-bottom: 20px;
}
.header .orderno {
  color: red;
  font-weight: bold;
  font-size: 16px;
}


.content /deep/ .el-input__inner{
   height: 22px !important;
}
.content .detail {
  position: relative;
  margin-bottom:18px;
  border:1px solid #304156;
  .currency {
    margin-left: 35px;
    margin-bottom: 10px;
    p {
      display: inline-block;
      width: 70px;
      margin-right: 20px;
    }
  }
  .price {
    display: inline-block;
    width: 50%;
    vertical-align: top;
    padding: 0 35px;
    margin-bottom: 10px;
    .el-input {
      display: inline-block;
      margin-right: 20px;
    }
    > div > p:first-child {
      display: inline-block;
      margin-right: 20px;
      width: 70px;
    }
    > div {
      margin-bottom: 5px;
      > .el-input {
        width: 240px;
      }
      > p {
        display: inline;
        > .el-input {
          width: 60px;
        }
      }
    }
  }
}
.content .detail .detailTitle {
  background:#304156;
  color:#fff;
  padding:5px 5px 5px 10px;
  font-size: 14px;
  ~ div {
    margin-top: 10px;
  }
}
.content .detail .service {
  margin: 10px 100px;
}
.content .detail /deep/ .service .serviceTitle {
  display: inline-block;
  width: 145px;
  margin-right: 20px;
  text-align: right;
}
.content .detail /deep/ .service .serviceTitle ~ .checkbox {
  vertical-align: text-top;
  width: 14px;
  height: 14px;
  margin-right: 60px;
}
.content .detail /deep/ .service .oprequest,
.content .detail /deep/ .service .oprequest p {
  position: relative;
  display: inline-block;
}
.content .detail /deep/ .service .oprequest .oprequest-text {
  position: absolute;
  top: 0;
  left: 100px;
  width: 200px;
  height: 70px;
}
.content .detail .service .operating {
  width: 145px;
  height: 28px;
  color: #95b8e7;
  border-bottom: 3px solid #95b8e7;
  margin-bottom: 10px;
}
.content .detail .send,
.content .detail .receive {
  display: inline-block;
  width: 50%;
  padding: 5px 20px 20px;
  > div:first-child {
    margin-bottom: 10px;
    p, .input, .el-button {
      display: inline;
      margin-right: 20px;
    }
    .input, /deep/ .el-input__inner {
      width: 260px;
    }
    .el-button {
      height: 22px;
      vertical-align: top;
      padding: 3px 20px;
      background: #f6f6f6;
    }
  }
  .address, .information {
    p {
      margin-top: 10px;
    }
  }
  .information {
    .info_item {
      display: inline-block;
      width: 25%;
      padding-right: 20px;
    }
    .nopadding {
      padding-right: 0
    }
  }
}
.content .detail .receive {
  float: right;
}
.content {
  .fdinformation {
    .detailTitle {
      background: #ffcc66;
      cursor: pointer;
    }
    .addfd {
      position: absolute;
      top: 32px;
      right: 3px;
    }
  }
}


.footer {
  overflow: hidden;
}
</style>
