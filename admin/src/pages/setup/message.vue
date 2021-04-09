<template>
  <div class="le-matter">
      <div class="he-waring">
          对于同时经营公众号和小程序的商家（小程序和公众号（必须是认证服务号）)，支持通过公众号向用户发送模板消息
          <span class="he-tip">提示：您暂未认证</span>
      </div>
      <div class="le-line"></div>
      <el-form label-width="132px">
          <el-row class="el-row--flex is-justify-space-around">
              <el-col :span="7" class="he-card">
                  <el-card class="le-form-card ">
                      <div class="he-title">订单付款提醒</div>
                      <el-form-item label="短信">
                          <el-switch @change="setting"  v-model="form.order_pay.sms"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="公众号消息">
                          <el-switch @change="setting" v-model="form.order_pay.wechat_public"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                  </el-card>
              </el-col>
              <el-col :span="7" class="he-card">
                  <el-card class="le-form-card ">
                      <div class="he-title">付款成功提醒</div>
                      <el-form-item label="短信">
                          <el-switch @change="setting" v-model="form.pay_success.sms"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="公众号消息">
                          <el-switch @change="setting" v-model="form.pay_success.wechat_public"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                  </el-card>
              </el-col>
              <el-col :span="7" class="he-card">
                  <el-card class="le-form-card">
                      <div class="he-title">订单发货提醒</div>
                      <el-form-item label="短信">
                          <el-switch @change="setting" v-model="form.order_send.sms"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="公众号消息">
                          <el-switch @change="setting" v-model="form.order_send.wechat_public"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="订阅消息">
                          <el-switch @change="setting" v-model="form.order_send.wechat_subscribe"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                  </el-card>
              </el-col>
          </el-row>
          <div class="le-line"></div>
          <el-row class="el-row--flex is-justify-space-around">
              <el-col :span="7" class="he-card">
                  <el-card class="le-form-card ">
                      <div class="he-title">商家同意售后申请</div>
                      <el-form-item label="短信">
                          <el-switch @change="setting" v-model="form.agree_after.sms"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="公众号消息">
                          <el-switch @change="setting" v-model="form.agree_after.wechat_public"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="订阅消息">
                          <el-switch @change="setting" v-model="form.agree_after.wechat_subscribe"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                  </el-card>
              </el-col>
              <el-col :span="7" class="he-card">
                  <el-card class="le-form-card ">
                      <div class="he-title">商家拒绝售后申请</div>
                      <el-form-item label="短信">
                          <el-switch @change="setting" v-model="form.refuse_after.sms"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="公众号消息">
                          <el-switch @change="setting" v-model="form.refuse_after.wechat_public"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="订阅消息">
                          <el-switch @change="setting" v-model="form.refuse_after.wechat_subscribe"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                  </el-card>
              </el-col>
              <el-col :span="7" class="he-card">
                  <el-card class="le-form-card">
                      <div class="he-title">
                        买家申请售后提醒
                        <span class="he-remind-business">
                            提醒商家
                        </span>
                      </div>
                      <el-form-item label="短信">
                          <el-switch @change="setting" v-model="form.create_after.sms"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="公众号消息">
                          <el-switch @change="setting" v-model="form.create_after.wechat_public"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                  </el-card>
              </el-col>
          </el-row>
          <div class="le-line"></div>
          <el-row class="el-row--flex is-justify-space-around">
              <el-col :span="7" class="he-card">
                  <el-card class="le-form-card ">
                      <div class="he-title">退款成功提醒</div>
                      <el-form-item label="短信">
                          <el-switch @change="setting" v-model="form.return_success.sms"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                      <el-form-item label="公众号消息">
                          <el-switch @change="setting" v-model="form.return_success.wechat_public"></el-switch>
                          <el-button type="text" class="he-preview">预览</el-button>
                      </el-form-item>
                  </el-card>
              </el-col>
              <el-col :span="7" class="he-card">
              </el-col>
              <el-col :span="7" class="he-card">
              </el-col>
          </el-row>
      </el-form>
  </div>
</template>
<script type="text/javascript">
export default {
  components: {
  },
  data() {
    return {
        form: {
            order_pay: {
                sms: false,
                wechat_public: false,
                wechat_subscribe: false
            },
            pay_success: {
                sms: false,
                wechat_public: false,
                wechat_subscribe: false
            },
            order_send: {
                sms: false,
                wechat_public: false,
                wechat_subscribe: false
            },
            agree_after: {
                sms: false,
                wechat_public: false,
                wechat_subscribe: false
            },
            refuse_after: {
                sms: false,
                wechat_public: false,
                wechat_subscribe: false
            },
            create_after: {
                sms: false,
                wechat_public: false,
                wechat_subscribe: false
            },
            return_success: {
                sms: false,
                wechat_public: false,
                wechat_subscribe: false
            }
        }
    };
  },
  /**
   * 计算属性
   * @type {Object}
   */
  computed: {

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
      this.getSetting();
  },
  methods: {
      setting: function() {
          this.$heshop.setting('post', {
              keyword: 'message_setting',
              content: this.form
          }).then(res => {

          }).catch(err => {
              console.error(err);
          });
      },
      getSetting: function() {
          this.$heshop.search('post', {include: 'setting'}, {
              keyword: 'message_setting'
          }).then((res) => {
                this.form = res.content;
          }).catch(err => {
              console.error(err);
          })
      }
  }
};

</script>
<style lang="less" scoped="true">
.he-waring {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #FFF5D1;
    border-radius: 8px;
    padding-left: 16px;
}
.he-tip {
    font-size: 12px;
    font-weight: 500;
    color: #F5212D;
    margin-left: 22px;
}
.he-margin {
    margin-right:24px;
}
.he-title {
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    opacity: 0.65;
    margin-bottom: 28px;
}
.he-card /deep/.el-card__body{
    height:230px;
}
.he-card /deep/.el-card {
    border-radius: 16px;
}
.he-remind-business {
    width: 63px;
    height: 20px;
    background: #fff7e7;
    border-radius: 4px;
    display: inline-block;
    font-size: 12px;
    font-weight: 500;
    color: #FBAD15;
    text-align: center;
    margin-left: 7px;
}
.he-preview {
    font-size: 14px;
    font-weight: 500;
    color: #623ceb;
    padding:5px 12px;
}
</style>
