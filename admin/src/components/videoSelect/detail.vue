<template>
    <div class="picture-selet__detail">
        <el-card>
            <div slot="header" class="clearfix">
                <span>分组名称</span>
            </div>
            <div class="picture-selet__detail-group">
                <el-scrollbar :style="{height:'478px'}">
                    <ul>
                        <li v-for="item,index in classify">
                            <label class="picture-selet__detail-radio">
                                <input class="picture-selet__detail-input" type="radio" :value="item.id" v-model="uploader.selectClassify">
                                <img src="http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-icon-folder.png">
                                <span>{{item.name}}</span>
                            </label>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </el-card>
        <div class="picture-selet__layout">
            <div class="picture-selet__header">
                <span>{{classifyInfo.name || '未分组'}}</span>
                <div class="picture-selet__action">
                    <Upload :action="uploadFile" :onSuccess="handleSizeChange" autoUpload>
                        <el-button type="primary">上传视频</el-button>
                    </Upload>
                </div>
            </div>
            <div class="picture-selet__content">
                <ul>
                    <li v-for="item,index in pictures">
                        <div class="picture-selet__content-label" v-if="item.type === 0" @click.stop="handleChange(item)">
                            <div class="picture-selet__content-item">
                                <div class="picture-selet__content-item-photo">
                                    <div class="picture-selet__content-item-image">
                                        <div class="picture-selet__content-item-cover" :style="{
                                          'background-image': 'url(http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-icon-folder.png)'
                                    }">
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    {{item.title_name}}
                                </p>
                            </div>
                        </div>
                        <label class="picture-selet__content-label" v-if="item.type === 2">
                            <input class="picture-selet__content-input" type="radio" :value="item" v-model="uploader.selectPicture">
                            <div class="picture-selet__content-item">
                                <div class="picture-selet__content-close">
                                    <i class="le-icon le-icon-tick"></i>
                                </div>
                                <div class="picture-selet__content-item-photo">
                                    <div class="picture-selet__content-item-icon">
                                        <i class="le-icon le-icon-shipin"></i>
                                    </div>
                                    <div class="picture-selet__content-item-image">
                                        <div class="picture-selet__content-item-cover" :style="{
                                          'background-image': 'url('+item.cover+')'
                                    }">
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    视频{{item.title_name}}
                                </p>
                            </div>
                        </label>
                    </li>
                </ul>
                <div class="picture-selet__paging">
                    <el-pagination @current-change="handleSizeChange" layout="prev, pager, next,jumper" :page-size="pageInfo.size" :current-page="pageInfo.current" :total="pageInfo.total"></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Upload from './upload.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('video');
export default {
    components: {
        Upload,
    },
    inject: ['uploader'],
    data() {
        return {
            keyword: "",
            pageSize: 5,
            pageTotal: 0,
            pageCurrent: 1,

        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        ...mapState(['classify', 'pictures', 'pageInfo', 'classifyInfo'])
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        if (this.uploader.selectClassify == "") {
            this.uploader.selectClassify = this.classify[0].id;
        }
    },
    methods: {
        ...mapMutations(['setClassifyInfo']),
        ...mapActions(['handlePictures']),
        /**
         * 上传成功
         * @return {[type]} [description]
         */
        handleSuccess() {

        },
        /**
         * 分页
         * @return {[type]} [description]
         */
        handleSizeChange(e = 1) {
            if (this.uploader.selectClassify == "") {
                this.uploader.selectClassify = this.classify[0].id;
            }
            this.handlePictures({ id: this.uploader.selectClassify, current: e });
        },
        /**
         * 双击事件
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleChange(e) {
            this.handlePictures({ id: e.id, current: 1 }).then(data => {
                this.uploader.selectClassify = e.id;
                this.setClassifyInfo({
                    id: e.id,
                    name: e.title_name
                });
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
        uploadFile(e) {
            let that = this;
            //此处执行POST提交方法
            return new Promise((reslove, reject) => {
                let formData = new FormData();
                that.getVideoImage(e, function(a) {
                    formData.append('content', e);
                    formData.append('cover', a.url);
                    formData.append('type', 2);
                    formData.append('group_id', that.uploader.selectClassify);
                    that.$heshop.video(formData).then(data => {
                        reslove(data)
                    }).catch(error => {
                        reject(error);
                    })
                });
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>