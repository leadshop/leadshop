<template>
    <div class="le-matter">
        <el-card class="le-form-card">
            <div class="le-theme-list">
                <div :class="{'he-theme__active': active ==='red_theme'}" @click="setActive('red_theme')" class="he-red">
                    <div class="he-red__theme he-theme__heart">
                    </div>
                    <div class="he-active__box" v-if="active === 'red_theme'">
                        <he-icon type="le-icon-shangse">
                        </he-icon>
                        <span class="he-active__text">
                            使用中
                        </span>
                    </div>
                </div>
                <div :class="{'he-theme__active': active ==='purple_theme'}" @click="setActive('purple_theme')" class="he-purple">
                    <div class="he-purple__theme he-theme__heart">
                    </div>
                    <div class="he-active__box" v-if="active === 'purple_theme'">
                        <he-icon type="le-icon-shangse">
                        </he-icon>
                        <span class="he-active__text">
                            使用中
                        </span>
                    </div>
                </div>
                <div :class="{'he-theme__active': active ==='blue_theme'}" @click="setActive('blue_theme')" class="he-blue">
                    <div class="he-blue__theme he-theme__heart">
                    </div>
                    <div class="he-active__box" v-if="active === 'blue_theme'">
                        <he-icon type="le-icon-shangse">
                        </he-icon>
                        <span class="he-active__text">
                            使用中
                        </span>
                    </div>
                </div>
                <div :class="{'he-theme__active': active ==='green_theme'}" @click="setActive('green_theme')" class="he-green">
                    <div class="he-green__theme he-theme__heart">
                    </div>
                    <div class="he-active__box" v-if="active === 'green_theme'">
                        <he-icon type="le-icon-shangse">
                        </he-icon>
                        <span class="he-active__text">
                            使用中
                        </span>
                    </div>
                </div>
                <div :class="{'he-theme__active': active ==='orange_theme'}" @click="setActive('orange_theme')" class="he-orange">
                    <div class="he-origin__theme he-theme__heart">
                    </div>
                    <div class="he-active__box" v-if="active === 'orange_theme'">
                        <he-icon type="le-icon-shangse">
                        </he-icon>
                        <span class="he-active__text">
                            使用中
                        </span>
                    </div>
                </div>
                <div :class="{'he-theme__active': active ==='golden_theme'}" @click="setActive('golden_theme')" class="he-golden">
                    <div class="he-golden__theme he-theme__heart">
                    </div>
                    <div class="he-active__box" v-if="active === 'golden_theme'">
                        <he-icon type="le-icon-shangse">
                        </he-icon>
                        <span class="he-active__text">
                            使用中
                        </span>
                    </div>
                </div>
            </div>
            <div class="he-theme__preview">
                <template v-if="active === 'red_theme'">
                    <img class="he-preview__image" src="./image/he-1-goods.png">
                    <img class="he-preview__image" src="./image/he-1-user.png">
                    <img class="he-preview__image" src="./image/he-1-order.png">
                    </img>
                    </img>
                    </img>
                </template>
                <template v-else-if="active === 'purple_theme'">
                    <img class="he-preview__image" src="./image/he-2-goods.png">
                    <img class="he-preview__image" src="./image/he-2-user.png">
                    <img class="he-preview__image" src="./image/he-2-order.png">
                    </img>
                    </img>
                    </img>
                </template>
                <template v-else-if="active === 'blue_theme'">
                    <img class="he-preview__image" src="./image/he-3-goods.png">
                    <img class="he-preview__image" src="./image/he-3-user.png">
                    <img class="he-preview__image" src="./image/he-3-order.png">
                    </img>
                    </img>
                    </img>
                </template>
                <template v-else-if="active === 'green_theme'">
                    <img class="he-preview__image" src="./image/he-4-goods.png">
                    <img class="he-preview__image" src="./image/he-4-user.png">
                    <img class="he-preview__image" src="./image/he-4-order.png">
                    </img>
                    </img>
                    </img>
                </template>
                <template v-else-if="active === 'orange_theme'">
                    <img class="he-preview__image" src="./image/he-5-goods.png">
                    <img class="he-preview__image" src="./image/he-5-user.png">
                    <img class="he-preview__image" src="./image/he-5-order.png">
                    </img>
                    </img>
                    </img>
                </template>
                <template v-else-if="active === 'golden_theme'">
                    <img class="he-preview__image" src="./image/he-6-goods.png">
                    <img class="he-preview__image" src="./image/he-6-user.png">
                    <img class="he-preview__image" src="./image/he-6-order.png">
                    </img>
                    </img>
                    </img>
                </template>
            </div>
        </el-card>
        <div class="le-cardpin">
            <el-button @click="setTheme" type="primary">
                保存
            </el-button>
        </div>
    </div>
</template>
<script>
import fileDownload from 'js-file-download'

export default {
    name: "themeColor",
    data() {
        return {
            active: 'red_theme'
        }
    },
    mounted() {
        this.getTheme();
    },
    methods: {
        setActive: function(active) {
            this.active = active;
        },
        setTheme: function() {
            this.$heshop.fitment('post', {
                keyword: 'themeColor',
                content: this.active
            }).then(() => {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            }).catch(err => {
                console.error(err);
            });
        },
        getTheme: function() {
            this.$heshop.search('post', { include: 'fitment' }, {
                keyword: 'themeColor'
            }).then((res) => {
                this.active = res.content;
            }).catch(err => {
                console.error(err);
            })
        }
    }
}
</script>
<style scoped="">
.le-form-card {
    box-shadow: none !important;
}

.le-form-card /deep/.el-card__body {
    padding: 48px;
}

.le-theme-list {
    display: flex;
}

.le-theme-list>div {
    width: 56px;
    height: 56px;
    background: #F3F5F7;
    border-radius: 28px;
    margin-right: 32px;
    cursor: pointer;
    display: flex;
}

.he-theme__heart {
    width: 32px;
    border-radius: 16px;
    height: 32px;
    margin: 12px;
}

.he-active__box {
    display: flex;
    align-items: center;
}

.he-active__text {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    opacity: 0.65;
    margin-left: 9px;
}

.le-theme-list .he-theme__active {
    width: 155px;
}

.he-red__theme {
    background: linear-gradient(-45deg, #E60B30 0%, rgba(230, 11, 48, 0.4) 100%);
}

.he-purple__theme {
    background: linear-gradient(-45deg, #8F2DF3 0%, rgba(143, 45, 243, 0.4) 100%);
}

.he-blue__theme {
    background: linear-gradient(-45deg, #33A7FF 0%, rgba(51, 167, 255, 0.4) 100%);
}

.he-green__theme {
    background: linear-gradient(-45deg, #1FC551 0%, rgba(31, 197, 81, 0.4) 100%);
}

.he-origin__theme {
    background: linear-gradient(-45deg, #FF7F00 0%, rgba(255, 127, 0, 0.4) 100%);
}

.he-golden__theme {
    background: linear-gradient(-45deg, #CAA45A 0%, rgba(202, 164, 90, 0.4) 100%);
}

.he-theme__preview {
    height: 498px;
    margin-top: 56px;
}

.he-preview__image {
    height: 498px;
    width: 280px;
    box-shadow: 0px 0px 16px 0px rgba(33, 34, 36, 0.12);
}

.he-preview__image:not(:last-child) {
    margin-right: 56px;
}
</style>