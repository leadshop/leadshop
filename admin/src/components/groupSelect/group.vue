<script type="text/javascript">
import Enumerable from "linq";
import cascaderPanel from "./cascaderPanel";
export default {
    components: {
        cascaderPanel
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        title: {
            type: [String, Number, Boolean],
            default: '商品分类'
        }
    },
    data() {
        return {
            searchValue: "",
            dialogVisible: false,
            inputData: "",
            groupData: [],
            radio: [0, 0, 0]
        };
    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {

    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {

    },
    methods: {
        /**
         * 处理点击事件
         * @return {[type]} [description]
         */
        handleOpen() {
            this.$heshop.group("get", { include: 'goods' }).then(res => {
                this.dialogVisible = true;
                this.groupList = res;
                this.groupData = this.setTreeData(res);
            }).catch(error => {

            })
        },
        /**
         * 处理关闭事件
         * @return {[type]} [description]
         */
        handleClose() {
            this.dialogVisible = false;
        },
        /**
         * 处理确认事件
         * @return {[type]} [description]
         */
        handleConfirm() {
            if (this.inputData.length > 0) {
                let _g = {};
                let _l = [];
                let end = this.inputData[this.inputData.length - 1];
                //处理
                this.inputData.map(id => {
                    for (let index in this.groupList) {
                        let item = this.groupList[index];
                        if (id == item.id) {
                            _l.push(item.name)
                        }
                        if (end == item.id) {
                            end = item;
                        }
                    }
                })
                end.address = _l.join("/");
                this.$emit('input', end);
                this.handleClose();
            } else {
                this.$message({
                    message: '请选择要移动的分组',
                    type: 'warning'
                });
            }
        },
        /**
         * 关闭回调
         * @return {[type]} [description]
         */
        handleClosed() {
            this.inputData = "";
        },
        /**
         * 获取树状结构数据
         * @param {[type]} data [description]
         */
        setTreeData(data) {
            //添加到子集路由
            return this.$heshop.toTree({
                parentKey: 'parent_id',
                idKey: 'id',
                parentID: 0,
                childrenKey: 'children'
            }).on(data).get();
        },
        /**
         * 出发修改数据
         * @return {[type]} [description]
         */
        handleChange(e) {
            this.inputData = e;
        },
        /**
         * 执行搜索
         * @param  {[type]}   queryString [description]
         * @param  {Function} cb          [description]
         * @param  {[type]}   index       [description]
         * @return {[type]}               [description]
         */
        querySearch(queryString, cb) {
            let restaurants = this.groupList;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            let _array = [];
            for (let index in results) {
                let item = results[index];
                if (item.id) {
                    //组合路径
                    let _path = item.path + '-' + item.id;
                    let _arr = _path.split('-');
                    let _name = [];
                    //剔除第一个0
                    _arr.shift();
                    //循环组合数组
                    _arr.map(id => {
                        for (let i in this.groupList) {
                            let _t = this.groupList[i];
                            if (_t.id && _t.id == id) {
                                _name.push(_t.name);
                            }
                        }
                    })
                    //处理数据链路
                    item.address = _name.join("/");
                    _array.push(item)
                }
            }
            // 调用 callback 返回建议列表的数据
            cb(_array || []);
        },
        /**
         * 通过正则模糊查询
         * @param  {[type]} queryString [description]
         * @return {[type]}             [description]
         */
        createFilter(queryString) {
            return (restaurant) => {
                let str = ['', ...queryString, ''].join('.*'); //转化成正则格式的字符串
                let reg = new RegExp(str) //正则
                return reg.test(restaurant.name) //去匹配待查询的字符串
            };
        },
        /**
         * 选中参数
         * @return {[type]} [description]
         */
        handleSelect(item) {
            let _data = [];
            //组合路径
            let _path = item.path + '-' + item.id;
            let _arr = _path.split('-');
            let _name = [];
            this.inputData = [];
            //剔除第一个0
            _arr.shift();
            //执行数据处理
            _arr.map((id, i) => {
                if (parseInt(id) > 0) {
                    //处理编辑
                    this.inputData.push(parseInt(id))
                    for (let index in this.groupList) {
                        let item = this.groupList[index];
                        if (item.id && item.id == id) {
                            _data.push(item);
                        }
                    }
                }
            })

            this.groupData = this.setTreeData(_data);
            // this.groupData = _data;
            // this.inputData = _arr;
        }
    },
    render() {
        let { dialogVisible, handleOpen, handleClose, handleConfirm, title, querySearch } = this;
        //判断插槽是否存在DOM结构，如果存在则获取后放入upload目录
        const trigger = this.$slots.trigger || this.$slots.default;

        //设置上传样式
        const defaultData = {
            on: {
                click: handleOpen
            }
        };
        //设置上传样式
        const dialogData = {
            props: {
                "visible": dialogVisible,
                "top": "10%",
                "title": title,
                "width": "800px",
                "append-to-body": true,
                "destroy-on-close": true,
                "before-close": handleClose
            },
            on: {
                "closed": this.handleClosed
            }
        };

        const AutocompleteData = {
            props: {
                "placeholder": "输入分类名称搜索",
                "value-key": 'address',
                "trigger-on-focus": false,
                "fetch-suggestions": (queryString, cb) => {
                    return querySearch(queryString, cb)
                }
            },
            on: {
                select: this.handleSelect
            }
        }

        const CascaderData = {
            props: {
                "value": this.inputData,
                "options": this.groupData,
                "show-all-levels": true,
                "filterable": true,
                "key": 1,
                "props": {
                    "value": "id",
                    "label": "name"
                }
            },

        }

        //处理数据信息
        return <div class="group-select" {...defaultData}>
            {trigger}
            <el-dialog {...dialogData}>
                <div class="group-select">
                    <div class="group-select__search">
                        <el-autocomplete {...AutocompleteData} v-model={this.searchValue}>
                           <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-autocomplete>

                    </div>
                     <cascaderPanel {...CascaderData} on-change={this.handleChange}></cascaderPanel>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button on-click={handleClose}>取 消</el-button>
                    <el-button type="primary" on-click={handleConfirm} on-close={handleClose}>确 定</el-button>
                </span>
            </el-dialog>
        </div>;
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>