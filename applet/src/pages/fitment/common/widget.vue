<template>
    <div class="widget-mobile-item" @click="onActive">
        <!--  <div class="zoom-view"> -->
        <div class="zoom-view" :class="{active:onIndex==index}">
            <!-- active 表示激活 -->
            <div class="widget-item-mask" :class="{active:onIndex==index}">
                <!-- 用于拖拽接收 -->
                <div class="widget-item-drag" data-type="widget" :data-index="index"></div>
                <div class="handle-box">
                    <div class="handle-btn">
                        <div class="handle-btn-item" @click.stop="onDelete">
                            <le-icon type="icontrash" size="38rpx" color="#FFFFFF"></le-icon>
                        </div>
                        <div class="handle-btn-item" @click.stop="onCopy">
                            <le-icon type="iconcopy" size="38rpx" color="#FFFFFF"></le-icon>
                        </div>
                        <div class="handle-btn-item" @click.stop="moveUp">
                            <le-icon type="iconarrow-top" size="38rpx" color="#FFFFFF"></le-icon>
                        </div>
                        <div class="handle-btn-item" @click.stop="moveDown">
                            <le-icon type="iconarrow-down" size="38rpx" color="#FFFFFF"></le-icon>
                        </div>
                    </div>
                </div>
                <div class="widget-item-slot">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
var parent = window.parent.window.app;
export default {
    data() {
        return {
            index: 0
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        page() {
            return this.$store.state.pages.page;
        },
        onIndex() {
            return this.$store.state.pages.status;
        }
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
        onIndex(val) {
            let index = this.getIndex();
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.getIndex();
    },
    methods: {
        /**
         * 删除
         * @return {[type]} [description]
         */
        onDelete() {
            let index = this.getIndex();
            let page = this.page;
            page.splice(index, 1);
            let pages = JSON.parse(JSON.stringify(page));
            this.$store.commit('pages/setPageData', pages);
        },
        /**
         * 拷贝
         * @return {[type]} [description]
         */
        onCopy() {
            let index = this.getIndex();
            let page = this.page;
            let data = this.page[index];
            if (data.name !== 'wechat') {
                let pages = JSON.parse(JSON.stringify(page));
                pages.splice(index, 0, data);
                this.$store.commit('pages/setPageData', pages);
            }
        },
        /**
         * 上移
         * @return {[type]} [description]
         */
        moveUp() {
            let index = this.getIndex();
            /*数组两个元素位置互换*/
            this.page[index] = this.page.splice(index - 1, 1, this.page[index])[0];
            this.$store.commit('pages/setStatusIndex', index - 1);
        },
        /**
         * 下移
         * @return {[type]} [description]
         */
        moveDown() {
            let index = this.getIndex();
            /*数组两个元素位置互换*/
            this.page[index] = this.page.splice(index + 1, 1, this.page[index])[0];
            this.$store.commit('pages/setStatusIndex', index + 1);
        },
        /**
         * 属性信息
         * @return {[type]} [description]
         */
        informAttribute() {
            let name = this.$store.getters.attribute;
            parent.$store.commit('pages/setAttribute', name);
            parent.$store.commit('pages/setActiveIndex', this.getIndex());
        },
        /**
         * 激活
         * @return {[type]} [description]
         */
        onActive() {
            this.$store.commit('pages/setStatusIndex', this.getIndex());
            this.informAttribute();
        },
        // 获取当前Index数值
        getIndex() {
            if (this.$el.dataset && this.$el.dataset.index) {
                let index = parseInt(this.$el.dataset.index);
                this.index = index;
                return index;
            }
        }
    }
};
</script>
<style type="text/css">
.widget-mobile-item {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.widget-mobile-item .zoom-view {
    position: relative;
    zoom: .5;
    width: 750px;
}

.widget-mobile-item .zoom-vi * {
    max-width: 100%;
}

.widget-mobile-item .zoom-view .widget-item-drag {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 101;
    top: 0;
    left: 0;
}

.widget-mobile-item .zoom-view .widget-item-mask {
    position: relative;
    width: 750px;
    height: 100%;
    z-index: 100;
    /*下面三行用于解决拖拽点击抖动问题*/
    border: 4px solid rgba(50, 59, 77, 0);
    margin: -4px;

}

.widget-mobile-item .zoom-view .widget-item-slot {
    width: 750px;
    overflow: hidden;
}

.widget-mobile-item .zoom-view.active .widget-item-mask {
    border: 4px solid #2589ff;
    z-index: 200;
}


.widget-mobile-item .zoom-view:hover .widget-item-mask {
    border: 4px solid #2589ff;
    z-index: 200;
    /*    -webkit-box-shadow: 0 2px 50px 5px rgba(50, 59, 77, .5);
    box-shadow: 0 2px 50px 5px rgba(50, 59, 77, .5);*/
}

.widget-mobile-item .zoom-view .widget-item-mask .handle-box {
    position: absolute;
    display: block;
    top: -4px;
    left: 770px;
    height: 250px;
    z-index: 3;
    text-align: left;
}

.widget-mobile-item .zoom-view .active .handle-btn {
    display: inline-block;
    left: 780px;
}

.widget-mobile-item .zoom-view .handle-btn {
    text-align: left;
    padding: 0 15px;
    height: 250px;
    background: #623CEB;
    border-radius: 8px;
    -webkit-box-shadow: 0 0 20px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, .1);
    font-size: 24px;
    display: none;
}

.widget-mobile-item .zoom-view .handle-btn .handle-btn-item {
    margin-top: 18px;
}

.widget-mobile-item .zoom-view .handle-btn .le-icon {
    color: #FFF;
}

.widget-mobile-item .zoom-view:hover .handle-btn i {
    color: #b0b0ba;
    margin-left: 10px;
    font-size: 28px;
}

.widget-mobile-item .zoom-view .active .handle-btn i {
    color: #b0b0ba;
    margin-left: 10px;
    font-size: 28px;
}
</style>