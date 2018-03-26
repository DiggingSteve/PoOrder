<!--  -->
<template>
    <div>
        <div class="node-wrap">
            <template v-for="(node,index) in nodeDataHandled">
                <el-popover :key="node.nodeName" placement="top-start" :title="node.nodename" width="200" trigger="hover" :disabled="isEditMode">
                    <!--reference 触发 popover 的元素-->
                    <div class="child-item" slot="reference">
                        <div :class="node.iconClass" :popover="node.nodename">
                            <i class="el-icon-circle-check"></i>
                        </div>
                        <div class="node-summary">
                            <p>{{node.nodename}}</p>
                            <p class="datetime" v-show="!isEditMode">{{node.nodeDateStr}}</p>
                            <transition name="fade">
                                <div v-show="isEditMode">
                                    <div>
                                        <input class="txt-edit-nodeman" type="text" placeholder="操作人" v-model="node.nodeman" />
                                    </div>
                                    <div>
                                        <el-date-picker size="mini" v-model="node.nodedate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                                    </div>
                                </div>
                            </transition>

                        </div>
                    </div>
                    <!--内容分发代替content属性-->
                    <div>
                        <p>{{node.nodeman}}</p>
                        <p>{{node.nodeDateStr}}</p>
                    </div>
                </el-popover>
            </template>

        </div>
        <div class="button-wrap">
            <el-button @click="startEdit();">编辑</el-button>
            <el-button @click="saveEdit();">保存</el-button>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEditMode: false,
            nodeData: [
                {
                    sid: 1057,
                    nodename: "订单确认",
                    nodeman: "郑凡",
                    source: "PO",
                    nodedate: "2018-03-21T16:57:15.88",
                    remark: "",
                    addman: "郑凡",
                    adddate: "2018-03-21T16:57:15.88",
                    codetype: 0,
                    overseas: 0,
                    ismodify: 1,
                    groups: 200
                },
                {
                    sid: 1057,
                    nodename: "预计航班起飞",
                    nodeman: null,
                    source: "PO",
                    nodedate: "2018-03-21T16:57:15.88",
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 55
                },
                {
                    sid: 1057,
                    nodename: "预计航班到达",
                    nodeman: null,
                    source: "PO",
                    nodedate: "2018-03-21T16:57:15.88",
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 70
                },
                {
                    sid: 1057,
                    nodename: "提单发送",
                    nodeman: null,
                    source: "PO",
                    nodedate: "2018-03-21T16:57:15.88",
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 80
                },
                {
                    sid: 1057,
                    nodename: "实际航班起飞",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 90
                },
                {
                    sid: 1057,
                    nodename: "目的港收到资料",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 100
                },
                {
                    sid: 1057,
                    nodename: "实际航班到达",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 110
                },
                {
                    sid: 1057,
                    nodename: "目的港清关",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 120
                },
                {
                    sid: 1057,
                    nodename: "目的港海外查验",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 130
                },
                {
                    sid: 1057,
                    nodename: "目的港海外延误",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 140
                },
                {
                    sid: 1057,
                    nodename: "目的港海外放行",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 150
                },
                {
                    sid: 1057,
                    nodename: "预计送货到收货人",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 160
                },
                {
                    sid: 1057,
                    nodename: "已送达",
                    nodeman: null,
                    source: "PO",
                    nodedate: null,
                    remark: null,
                    addman: null,
                    adddate: null,
                    codetype: 0,
                    overseas: 1,
                    ismodify: 1,
                    groups: 240
                }
            ]
        };
    },

    components: {},

    computed: {
        nodeDataHandled: function() {
            this.nodeData.forEach((v, i, arr) => {
                this.setIconClass(arr[i]);
                if (
                    v.nodedate == null ||
                    v.nodedate === "" ||
                    v.nodedate == undefined
                ) {
                    arr[i].nodeDateStr = "----,---,--";
                } else {
                    var date = new Date(v.nodedate).format(
                        "yyyy-MM-dd hh:mm:ss"
                    );
                    arr[i].nodeDateStr = date;
                    arr[i].nodedate = new Date(v.nodedate);
                }
            });
            return this.nodeData;
        }
    },

    mounted() {},

    methods: {
        startEdit: function() {
            this.isEditMode = true;
        },
        saveEdit: function() {
            this.isEditMode = false;
        },
        //节点数组单个obj
        checkNodeActiveStatus: function(node) {
            var nodeDate = node.nodedate;
            //判断是否undefined null ''
            if (!!!nodeDate || !!!node.nodeman) return false;
            else return true;
        },
        setIconClass: function(node) {
            let flag = this.checkNodeActiveStatus(node);
            if (flag) node.iconClass = "icon active";
            if (!flag) node.iconClass = "icon";
        }
    }
};
</script>
<style  scoped>
.node-wrap {
    display: flex;
    margin-top: 50px;
    flex-wrap: wrap;
}
.child-item {
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: #bcbcbc;
    padding: 5 10px;
    cursor: pointer;
}
.icon {
    font-size: 25px;
    line-height: 50px;
    padding-right: 5px;
}
.child-item .active {
    color: #36f;
}
.node-summary {
    line-height: 25px;
    white-space: nowrap;
}

.txt-edit-nodeman {
    width: 90%;
    border-bottom: 1px solid #000;
}
.fade-enter-active {
    transition: opacity 0.5s;
}
.fade-enter {
    opacity: 0;
}
</style>
