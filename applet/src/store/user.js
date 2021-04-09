const user = {
    namespaced: true,
    state: {
        userInfo: null,
        orderTotal: {
            noevaluate: 0,
            orderafter: 0,
            unpaid: 0,
            unreceived: 0,
            unsent: 0
        },
        shippingAddress: []
    },
    mutations: {
        userInfo(state, data) {
            uni.setStorageSync('userInfo', data);
            state.userInfo = data;
        },
        orderTotal(state, data) {
            state.orderTotal = data;
        },
        shippingAddress(state, data) {
            state.shippingAddress = data;
        }
    },
    getters: {
        userInfo: function (state) {
            return state.userInfo;
        },
        orderTotal: function (state) {
            return state.orderTotal;
        },
        getAddress: function (state) {
            return state.shippingAddress;
        }
    },
    actions: {
        decryptUserInfo: function ({dispatch, commit}) {
            let $heshop = this._vm.$heshop;
            // #ifndef H5
            uni.login({
                provider: 'weixin',
                success: function (loginRes) {
                    uni.getUserInfo({
                        success: function (res) {
                            $heshop.login("post", "weapp", {
                                code: loginRes.code,
                                iv: res.iv,
                                encryptedData: res.encryptedData
                            }).then(function (res) {
                                dispatch('visit');
                                commit('apply/login', res, {root: true});
                                uni.navigateBack({
                                    delta: 1
                                });
                            }).catch(function (error) {
                                console.error(error);
                            });
                        }
                    });
                }
            });
            // #endif
            // #ifdef H5
            let origin = window.location.origin;
            $heshop.login("post", {
                type: 'wechat',
                include: 'login_url',
                url: origin + '/h5/pages/user/index',
                scope: 'snsapi_userinfo'
            }).then(function (res) {
                document.location.replace(res.url);
            }).catch(function (error) {
                console.error(error);
            });
            // #endif
        },
        getUserProfile: function ({dispatch, commit}) {
            let $heshop = this._vm.$heshop;
            uni.getUserProfile({
                lang: "zh_CN",
                desc: '用于完善会员资料',
                success: function (res) {
                    uni.login({
                        provider: 'weixin',
                        success: function (loginRes ) {
                            $heshop.login("post", "weapp", {
                                code: loginRes.code,
                                iv: res.iv,
                                encryptedData: res.encryptedData
                            }).then(function (res) {
                                dispatch('visit');
                                commit('apply/login', res, {root: true});
                                uni.navigateBack({
                                    delta: 1
                                });
                            }).catch(function (error) {
                                console.error(error);
                            });
                        }
                    });
                },
                fail: function (res) {
                    console.log(res);
                }
            });
        },
        visit: function () {
            if (uni.getStorageSync('token')) {
                let $heshop = this._vm.$heshop;
                $heshop.users('get', {
                    behavior: 'visit'
                }).then(function () {
                }).catch(function (err) {
                    console.error(err);
                });
            }
        },
        getOrderTotal: function ({commit}) {
            let $heshop = this._vm.$heshop;
            $heshop.order('get', {
                behavior: 'tabcount'
            }).then(function (res) {
                commit('orderTotal', res);
            }).catch(function (err) {
                console.error(err);
            });
        },
        // #ifdef H5
        weChatLogin: function ({commit, dispatch}, options) {
            if (!options.code) return;
            let $heshop = this._vm.$heshop;
            $heshop.login('post', {
                type: "wechat",
                include: "login"
            }, {
                code: options.code
            }).then(function (res) {
                commit('apply/login', res, {root: true});
                dispatch('visit');
            }).catch(function (err) {
                console.error(err);
            });
        },
        // #endif
        getAddress: function ({commit, state}) {
            let $heshop = this._vm.$heshop;
            let $h = this._vm.$h;
            if ($h.test.isEmpty(state.shippingAddress)) {
                $heshop.address('get').then(function (res) {
                    let data = res;
                    data.forEach(function (item) {
                        item.is_select = false;
                    });
                    commit('shippingAddress', data);
                }).catch(function (err) {
                    console.error(err);
                });
            }
        },
        // #ifndef H5
        authLogin: function () {
            uni.checkSession({
                success: function (res) {
                    console.log(res);
                },
                fail: function () {
                    uni.login({
                        provider: 'weixin',
                        scopes: 'auth_base',
                        success: function (res) {
                            console.log(res);
                        },
                        fail: function(err) {
                            console.log(err);
                        }
                    });
                },
                complete: function () {
                }
            });
        }
        // #endif
    }
};

export default user;