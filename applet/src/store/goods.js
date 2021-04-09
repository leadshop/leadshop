const goods = {
    namespaced: true,
    state: {
        shareGoods: []
    },
    mutations: {
        shareGoods: function(state, data) {
            state.shareGoods = data;
        }
    },
    getters: {
        shareGoods: function(state) {
            console.log(state.shareGoods);
            return state.shareGoods;
        }
    },
    actions: {
        shareGoods: function({getters, commit}) {
            let $heshop = this._vm.$heshop;
            if (getters.shareGoods.length === 0) {
                $heshop.goods('get', {
                    behavior: 'recommend'
                }).then(function (res) {
                    commit('shareGoods', res);
                }).catch(function(err) {
                    console.error(err);
                });
            }
        },
        emptyShareGoods: function({commit, dispatch }) {
            commit('shareGoods', []);
            dispatch('shareGoods');
        }
    }
};

export default goods;