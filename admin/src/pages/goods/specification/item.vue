<template>
    <div class="specification-item">
        <div class="specification-item__header">
            <label class="specification-item__label">
                规格名
            </label>
            <div class="specification-item__input">
                <el-input type="text" maxlength="10" show-word-limit v-model="title" @blur="handleTitleBlur">
                </el-input>
            </div>
            <div class="specification-item__input __checked" v-if="is_cover">
                <el-checkbox v-model="checked" @change="handleChecked">规格图片</el-checkbox>
            </div>
            <i class="le-icon le-icon-cha2 specification-item__header__close" slot="suffix" @click="handleDelHeader"
               v-if="is_delete">
            </i>
        </div>
        <div class="specification-item__content">
            <label class="specification-item__label">
                规格值
            </label>
            <div class="specification-item__list">
                <div class="specification-item__input" v-for="item,index in tableData" :key="index">
                    <el-input type="text" maxlength="20" show-word-limit v-model="item.value" @blur="handleInputBlur"
                              :data-index="index">
                        <i class="le-icon le-icon-cha2 specification-item__close" slot="suffix"
                           @click="handleDelClick(index)" v-if="is_delete_item(index)">
                        </i>
                    </el-input>
                    <div class="specification-item__cover" v-if="checked">
                        <pictureDialog v-model="item.image" @blur="handleImageSync">
                            <div slot="upload" class="specification-item__cover-add">
                                <i class="le-icon le-icon-add specification-item__cover-icon"></i>
                                <span class="specification-item__cover-text">添加图片</span>
                            </div>
                            <div slot="preview" slot-scope="scope" class="specification-item__cover-edit">
                                <el-image :src="scope.url" fit="cover"></el-image>
                                <i class="le-icon le-icon-cha2 specification-item__cover-close"
                                   @click.stop="(e)=>{item.image='';handleImageSync()}"></i>
                            </div>
                        </pictureDialog>
                    </div>
                </div>
                <div class="specification-item__input">
                    <span class="specification-item__add" @click="handleAddClick"
                          v-if="tableData.length<20">添加规格值</span>
                </div>
                <div class="specification-item__tips" v-if="checked">
                    仅支持为第一组规格设置规格图片，建议尺寸：800 x 800像素
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        value: {
            type: [Object, Array]
        },
        size: {
            type: Number,
            default: 1
        },
        is_cover: {
            type: Boolean,
            default: false
        },
        is_delete: {
            type: Boolean,
            default: false
        },
        onError: {
            type: Function
        }
    },
    data() {
        return {
            checked: false,
            title: "",
            tableData: [{"value": "", "image": ""}],
            errorList: []
        };
    },
    computed: {
        selectData: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        },
    },
    async mounted() {
        if (this.value.value) {
            this.tableData = JSON.parse(JSON.stringify(this.value.value));
        }
        this.checked = this.value.image_status;
        this.title = this.value.name;
        this.errorList = [];
    },
    methods: {
        /**
         * 用于判断是否可以删除
         * @param  {[type]}  index [description]
         * @return {Boolean}       [description]
         */
        is_delete_item(index) {
            if (this.tableData.length == this.size) {
                return false;
            } else {
                return true;
            }
        },
        /**
         * 执行删除方法
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        handleDelClick(index) {
            this.tableData.splice(index, 1);
            this.handleDataSync();
        },
        /**
         * 执行添加方法
         * @return {[type]} [description]
         */
        handleAddClick() {
            if (this.tableData.length < 20) {
                this.tableData.push({
                    value: "",
                    image: ""
                });
                this.handleDataSync();
            }
        },
        /**
         * 规格名称设置
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        handleTitleBlur(value) {
            if (value.target.value) {
                this.selectData.name = this.title;
                this.handleDataSync();
            }
        },
        /**
         * 处理解决规格值重名问题
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        handleInputBlur(value) {
            for (let index in this.selectData.value) {
                let item = this.selectData.value[index];
                if (value.target.dataset.index !== index) {
                    if (item.value && item.value == value.target.value) {
                        this.$message({
                            message: '已存在相同规格值',
                            type: 'warning'
                        });
                        return;
                    }
                }
            }
            this.handleDataSync();
        },
        /**
         * 处理数据同步问题
         * @return {[type]} [description]
         */
        handleDataSync() {
            this.selectData.value = JSON.parse(JSON.stringify(this.tableData));
            this.$emit('input', this.selectData);
        },
        /**
         * 数据检查
         */
        handleDataCheck() {
            for (let index in this.selectData.value) {
                let item = this.selectData.value[index];
                if (item.value && item.value == "") {
                    this.errorList.push("规格值不能为空");
                }
            }
        },
        /**
         * 数据检查
         */
        handleImageCheck() {
            for (let index in this.selectData.value) {
                let item = this.selectData.value[index];
                if (item.image && item.image == "") {
                    this.errorList.push("规格图片不能为空");
                }
            }
        },
        /**
         * 执行删除方法
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleDelHeader(e) {
            this.$emit('delete', e);
        },
        /**
         * 更改状态
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        handleChecked(value) {
            this.selectData.image_status = value;
        },
        /**
         * 图片同步事件
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        handleImageSync(value) {
            this.handleDataSync();
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';

.specification-item__header__close {
    top: 50%;
    transform: translateY(-50%);
}
</style>
