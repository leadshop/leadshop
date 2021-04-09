<template>
    <div class="picture-selet">
        <div class="picture-selet__detail">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>分组名称</span>
                </div>
                <div class="picture-selet__detail-group">
                    <el-scrollbar :style="{height:'632px'}">
                        <el-radio-group v-model="index">
                            <ul>
                                <li>
                                    <el-radio class="picture-selet__detail-radio" :label="-1">
                                        <img src="http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-icon-folder.png">
                                        <span>全部</span>
                                    </el-radio>
                                    <div class="picture-selet__detail-action"></div>
                                </li>
                                <li v-for="item,index in groupList">
                                    <el-radio class="picture-selet__detail-radio" :label="index">
                                        <img src="http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-icon-folder.png">
                                        <el-input placeholder="请输入内容" v-model="item.name" v-if="is_edit===item.id">
                                            <el-button slot="append" type="primary" @click="(e)=>{UpdateGroupItem(item);is_edit=-1}">确认</el-button>
                                        </el-input>
                                        <span v-else>{{item.name}}</span>
                                    </el-radio>
                                </li>
                            </ul>
                        </el-radio-group>
                    </el-scrollbar>
                </div>
            </el-card>
            <div class="picture-selet__layout">
                <div class="picture-selet__header">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="item,index in breadcrumb" :key="index">
                            <span @click="handleCrumbItem(item,index)">{{item.name || item.title_name}}</span>
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="picture-selet__action">
                        <Upload :action="uploadFile" :multiple="true" :onSuccess="handleSizeChange" autoUpload accept=".mp4,.avi,.rmvb">
                            <el-button type="primary">上传视频</el-button>
                        </Upload>
                    </div>
                </div>
                <div class="picture-selet__content">
                    <ul v-if="photoList.length>0" v-loading="loading">
                        <li v-for="(item,index) in photoList">
                            <label class="picture-selet__content-label" @dblclick.stop="handleDblClick(item)">
                                <input class="picture-selet__content-input" :type="inputType" :value="item" v-model="checkedData" v-if="item.type > 0">
                                <div class="picture-selet__content-item">
                                    <div class="picture-selet__content-close">
                                        <i class="le-icon le-icon-tick"></i>
                                    </div>
                                    <div class="picture-selet__content-item-photo">
                                        <div class="picture-selet__content-item-icon" v-if="item.type > 0">
                                            <i class="le-icon le-icon-shipin"></i>
                                        </div>
                                        <el-image fit="cover" style="width: 100%; height: 100%" :src="item.cover" v-if="item.type > 0">
                                            <div slot="error" class="image-slot">
                                                <i class="le-icon le-icon-bofang"></i>
                                            </div>
                                        </el-image>
                                        <el-image fit="cover" style="width: 100%; height: 100%" v-else src="http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-icon-folder.png"></el-image>
                                    </div>
                                    <el-button slot="reference" type="text">{{item.title_name}}</el-button>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div v-else class="picture-selet__content-empty">
                        <div>
                            <el-image src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/gallery_bg.png"></el-image>
                            <p>该分组下暂无内容</p>
                        </div>
                    </div>
                    <div class="picture-selet__paging">
                        <el-pagination background @current-change="handleSizeChange" layout="prev, pager, next,jumper" :page-size="pageInfo.size" :current-page="pageInfo.current" :total="pageInfo.total"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Picture from '@/components/image.vue'
import Upload from '../videoSelect/upload.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('video');
export default {
    components: {
        Upload
    },
    props: {
        fileType: {
            type: [String, Number, Boolean, Object, Array],
            default: 2
        },
        /**
         * 上传限制
         * @type {Number}
         */
        limit: {
            type: Number,
            default: 1
        }
    },
    provide() {
        return {
            uploader: this
        };
    },
    data() {
        return {

            /**
             * 分类选中
             * @type {Number}
             */
            index: -1,
            /**
             * 编辑ID
             * @type {Number}
             */
            is_edit: 0,
            /**
             * 选中值
             * @type {Array}
             */
            checkedData: [],
            /**
             * 是否全选
             * @type {Boolean}
             */
            checkAll: false,
            /**
             * 半选中状态
             * @type {Boolean}
             */
            isIndeterminate: false,
            /**
             * 数据加载
             * @type {Boolean}
             */
            loading: false,
            /**
             * 处理分级
             */
            breadcrumb: [{
                id: -1,
                name: "全部"
            }]
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        index(value) {
            //this.checkedData = [];
            let groupInfo = null;
            if (value == -1) {
                groupInfo = {
                    id: -1,
                    name: "全部"
                }
            } else {
                groupInfo = this.groupList[value];
            }
            this.breadcrumb = [groupInfo];
            //设置当前分组信息
            this.setGroupInfo(groupInfo)
            //加载当前分组数组
            this.LoadPhotoList({
                'id': groupInfo.id,
                'current': 1,
                'pageSize': 15
            })
        },
        checkedData(value) {
            if (value.length > 0) {
                this.isIndeterminate = true;
            } else {
                this.checkAll = false;
                this.isIndeterminate = false;
            }
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        ...mapState(['groupList', 'groupInfo', 'photoList', 'pageInfo']),
        inputType() {
            if (this.limit > 1) {
                return 'checkbox';
            } else {
                return 'radio';
            }
        },
        /**
         * 是否创建
         * @return {Boolean} [description]
         */
        is_make() {
            if (this.groupInfo.name == "全部") {
                return false
            }
            if (this.groupInfo.name == "未分组") {
                return false
            }
            let path = this.groupInfo.path || this.groupInfo.url || '0';
            if (path.split("-").length >= 3) {
                return false
            }
            return true;

        },
        /**
         * 移动
         * @return {Boolean} [description]
         */
        is_move() {
            if (this.checkedData.length < 1) {
                return true;
            }
            let s = JSON.stringify(this.checkedData);
            if ((s.indexOf('"type":0') > -1)) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 是否删除
         * @return {Boolean} [description]
         */
        is_delete() {
            if (this.checkedData.length < 1) {
                return true;
            }
            let s = JSON.stringify(this.checkedData);
            if (s.indexOf('"type":0') > -1) {
                if (this.checkedData.length > 1) {
                    return true;
                }
            }
            return (s.indexOf('"type":1') > -1) && (s.indexOf('"type":0') > -1);
        },
        /**
         * 是否重命名
         * @return {Boolean} [description]
         */
        is_rename() {
            if (this.checkedData.length == 0) {
                return true;
            }
            if (this.checkedData.length > 1) {
                return true;
            }
            let s = JSON.stringify(this.checkedData);
            return (s.indexOf('"type":1') > -1) && (s.indexOf('"type":0') > -1);
        },
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.LoadGroupList().then(res => {
            this.LoadPhotoList({
                'id': -1,
                'current': 1,
                'pageSize': 15
            })
        });
    },
    methods: {
        ...mapMutations(['setGroupInfo']),
        ...mapActions([
            'LoadGroupList',
            'LoadPhotoList',
            'InterGroupItem',
            'UpdateGroupItem',
            'DeleteGroupItem',
            'DeletePhotoList',
            'MovePhotoList',
            'UpdatePhotoItem',
            'upadteGroupInfo'
        ]),
        /**
         * 执行创建分组
         * @return {[type]} [description]
         */
        handleMakeGroup(option, type = 1) {
            this.loading = true;
            this.InterGroupItem(option).then(value => {
                if (type == 1) {
                    this.index = -1;
                    this.upadteGroupInfo({
                        id: -1,
                        name: '全部'
                    });
                    //重载分组列表
                    this.LoadGroupList().then(res => {});
                }
                if (type == 2) {
                    setTimeout(() => {
                        let id = value.parent_id || this.groupInfo.id;
                        //重载当前分组列表
                        this.LoadPhotoList({ id: id, current: 1, pageSize: 15 }).then(res => {
                            this.loading = false;
                        });
                        //this.checkedData = [];
                    }, 500);
                }
            }).catch(error => {
                this.loading = false;
            })
        },
        /**
         * 执行删除数据
         * @return {[type]} [description]
         */
        handleGroupDelete(id, type = 1) {
            this.loading = true;
            this.$confirm('此分组及子级分组的图片都将移至未分组中， 是否确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.DeleteGroupItem({ id, type }).then(() => {
                    if (type == 1) {
                        setTimeout(() => {
                            //重载当前分组列表
                            this.LoadPhotoList({ id: this.groupInfo.id, current: 1, pageSize: 15 }).then(res => {
                                this.loading = false;
                            });
                            //this.checkedData = [];
                        }, 500);
                    }
                    if (type == 2) {
                        this.index = -1;
                        this.LoadGroupList().then(() => {
                            this.loading = false;
                            this.LoadPhotoList({
                                'id': -1,
                                'current': 1,
                                'pageSize': 15
                            })
                            //this.checkedData = [];
                        });
                    }
                }).catch(() => {
                    this.loading = false;
                });
            }).catch(() => {
                this.loading = false;
            });
        },
        getVideoImage(file, call) {
            if (file && file.type.indexOf('video/') == 0) {
                var video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.addEventListener('loadeddata', function() {
                    this.currentTime = 1
                })
                video.addEventListener('seeked', function() {
                    this.width = this.videoWidth;
                    this.height = this.videoHeight;
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                    var image = {
                        url: canvas.toDataURL('image/jpeg', 1),
                        width: this.width,
                        height: this.height,
                        currentTime: this.currentTime,
                        duration: this.duration
                    };
                    canvas.toBlob(function(blob) {
                        image.blob = blob;
                        typeof call == 'function' ? call.call(file, image) : null;
                    }, 'image/jpeg');
                });
            }
        },
        /**
         * 处理上传
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        uploadFile(e) {
            let that = this;
            //此处执行POST提交方法
            return new Promise((reslove, reject) => {
                let formData = new FormData();
                that.getVideoImage(e, function(a) {
                    formData.append('content', e);
                    formData.append('cover', a.url);
                    formData.append('type', 2);
                    formData.append('group_id', that.groupInfo.id);
                    that.$heshop.video(formData).then(data => {
                        reslove(data)
                    }).catch(error => {
                        reject(error);
                    })
                });
            })
        },
        /**
         * 数据全选
         * @return {[type]} [description]
         */
        handleAllChange(value) {
            this.isIndeterminate = false;
            if (value) {
                this.checkedData = this.photoList
            } else {
                this.checkedData = []
            }
        },
        /**
         * 分页
         * @return {[ty3pe]} [description]
         */
        handleSizeChange(mumber = 1) {
            //重载当前分组列表
            this.LoadPhotoList({ id: this.groupInfo.id, current: mumber, pageSize: 15 });
            //this.checkedData = [];
        },
        /**
         * 执行删除数据
         * @return {[type]} [description]
         */
        handleDeletes() {
            this.loading = true;
            let arr = [];
            let type = 0;
            for (let index in this.checkedData) {
                let item = this.checkedData[index];
                if (item.id) {
                    type = item.type;
                    arr.push(item.id)
                }
            }
            if (type === 0) {
                if (arr[0]) {
                    let id = arr[0]
                    this.handleGroupDelete(id);
                }
            } else {
                this.$confirm('是否确认删除选中内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    //处理素材删除
                    this.DeletePhotoList(arr).then(data => {
                        //重载当前分组列表
                        this.LoadPhotoList({ id: this.groupInfo.id, current: 1, pageSize: 15 }).then(() => {
                            this.loading = false;
                        });
                        //this.checkedData = [];
                    });
                }).catch(() => {

                });
            }
        },
        /**
         * 照片移动至
         * @return {[type]} [description]
         */
        handleMoveList(group_id) {
            let _array = [];
            this.checkedData.map(item => {
                _array.push(item.id);
            })
            this.MovePhotoList({ list: _array, group_id }).then(res => {
                //重载当前分组列表
                this.LoadPhotoList({ id: this.groupInfo.id, current: 1, pageSize: 15 });
                //this.checkedData = [];
            });
        },
        /**
         * 内容重命名
         * @return {[type]} [description]
         */
        handleRenameItem(data) {
            if (data.type == 0) {
                this.handleEditClassify(data).then(res => {
                    //重载当前分组列表
                    this.UpdateGroupItem({ id: this.groupInfo.id, current: this.pageInfo.current, pageSize: 15 });
                    //this.checkedData = [];
                })
            } else {
                if (data.id) {
                    this.UpdatePhotoItem(data).then(res => {
                        //重载当前分组列表
                        this.LoadPhotoList({ id: this.groupInfo.id, current: this.pageInfo.current, pageSize: 15 });
                        //this.checkedData = [];
                    })
                }
            }
        },
        /**
         * 双击点击事件
         * @return {[type]} [description]
         */
        handleDblClick(value) {
            //执行数据加载
            if (value.type === 0) {
                //设置当前分组信息
                this.setGroupInfo(value)
                //面包屑
                this.breadcrumb.push(value)
                //重载当前分组列表
                this.LoadPhotoList({ id: value.id, current: 1, pageSize: 15 });
                //this.checkedData = [];
            }
        },
        /**
         * 处理样式数据
         * @return {[type]} [description]
         */
        handleCrumbItem(value, index) {
            if (index === 0) {
                this.upadteGroupInfo(value);
                this.breadcrumb = [value]
                //重置图片数据信息
                this.LoadPhotoList({ id: value.id, current: 1, pageSize: 15 });
                //this.checkedData = [];
            }
            if (index === 1) {
                if (this.breadcrumb.length > 2) {
                    this.breadcrumb.pop()
                }
                let value = this.breadcrumb[1];
                this.upadteGroupInfo(value);
                //重置图片数据信息
                this.LoadPhotoList({ id: value.id, current: 1, pageSize: 15 });
                //this.checkedData = [];
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
//.picture-selet__paging /deep/ .el-pagination .el-pager .number{
//    font-size: 25px;
//}
</style>