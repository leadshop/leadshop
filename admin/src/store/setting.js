
export default {
    namespaced: true,
    state: {
        store_setting: {}
    },
    mutations: {
        setStore: function (state, data) {
            state.store_setting = data
        }
    },
    getters: {
        getStore: function(state) {
            return state.store_setting;
        }
    },
    actions: {
        getSettingInfo({commit}) {
            let $heshop = this._vm.$heshop;
            return new Promise(function(resolve, reject) {
                $heshop.search('post', {
                    include: 'setting'
                },{
                    keyword: 'setting_collection'
                }).then(function (res) {
                   let { basic_setting, goods_setting, store_setting, trade_setting, user_setting } = res.content;
                    if (!store_setting.logo) {
                        store_setting.logo = 'https://qmxq.oss-cn-hangzhou.aliyuncs.com/home.png';
                    }
                    commit('setStore', store_setting);
                });
            });
        }
    }
};
