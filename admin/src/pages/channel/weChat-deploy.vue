<template>
    <div class="le-matter">
        <div class="le-header">
            <span class="le-header__left" @click="router">信息配置</span>
            <i class="el-icon-arrow-right"></i>
            <span class="le-header__right">服务器配置</span>
        </div>
        <div class="le-card">
            <div class="le-card__header flex align-center">
                <span class="le-tip"></span>
                <span class="le-text">服务器配置</span>
            </div>
            <div class="le-item le-guide">
                <span>请将以下信息填入微信公众号，并启用服务器配置。完成操作后，再保存此页面。</span>
                <span class="le-btn" module="channel" title="服务器配置指引" type="text" width="720" :hide_close="true" v-popup.deployGuide sure_btn="已完成配置">查看引导</span>
            </div>
            <div class="le-item">
                <span class="le-line-label">服务器地址(URL)</span>
                <span class="le-line-value" id="url">{{form.url}}</span>
                <span class="le-btn" @click="copy('url')">复制</span>
            </div>
            <div class="le-item">
                <span class="le-line-label">令牌(Token)</span>
                <span class="le-line-value" id="token">{{form.token}}</span>
                <span class="le-btn" @click="copy('token')">复制</span>
            </div>
            <div class="le-item flex justify-start">
                <span class="le-line-label">消息加解密密钥<br/>(EncodingAESKey)</span>
                <span class="le-line-value" id="key">{{form.encodingAesKey}}</span>
                <span class="le-btn" @click="copy('key')">复制</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "weChat-deploy",
    data() {
        return {
            form: {}
        }
    },
    mounted() {
        this.getConfig();
    },
    methods: {
        getConfig: function() {
            this.$heshop.appconfig('get').then(res => {
                this.form = res.apply.wechat;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        copy: function(id, attr = 'innerText') {
            let target = null;

            if (attr) {
                target = document.createElement('div');
                target.id = 'tempTarget';
                target.style.opacity = '0';
                if (id) {
                    let curNode = document.querySelector('#' + id);
                    target.innerText = curNode[attr];
                } else {
                    target.innerText = attr;
                }
                document.body.appendChild(target);
            } else {
                target = document.querySelector('#' + id);
            }

            try {
                let range = document.createRange();
                range.selectNode(target);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                this.$message.success('复制成功');
            } catch (e) {
                console.error('复制失败')
            }

            if (attr) {
                target.parentElement.removeChild(target);
            }
        },
        router: function() {
            this.$router.back();
        }
    }
}
</script>

<style scoped lang="scss">
.le-header {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-bottom: 24px;
    .el-icon-arrow-right {
        margin: 0 10px;
    }
    .le-header__left {
        color: #262626;
        cursor: pointer;
    }
    .le-header__right {
        color: #8C8C8C;
    }
}
.le-card {
    height: 290px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    .le-card__header {
        margin-bottom: 38px;
        .le-tip {
            width: 4px;
            height: 16px;
            background: #623CEB;
            margin-right: 12px;
        }
        .le-text {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #262626;
        }
    }
    .le-item {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin-bottom: 25px;
        .le-btn {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #623CEB;
            margin-left: 15px;
            cursor: pointer;
        }
        .le-line-label {
            display: inline-block;
            width: 177px;
            text-align: right;
            margin-right: 15px;
            color: #333333;
        }
        .le-line-value {
            color: #000000;
        }
    }
    .le-guide {
        margin-left: 53px;
        color: #8C8C8C;
    }
}
</style>
