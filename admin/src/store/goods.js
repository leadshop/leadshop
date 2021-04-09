/*
 * @Author: imac
 * @Date:   2020-05-30 15:02:36
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-22 17:55:16
 */
export default {
    namespaced: true,
    state: {
        goodsData: [],
        pageInfo: {
            "size": 7,
            "total": 0,
            "current": 1
        }
    },
    mutations: {
        /**
         * 设置图片
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setGoodsData(state, data) {
            state.goodsData = data
        },
        /**
         * 设置分页
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPageInfo(state, data) {
            state.pageInfo = data
        }
    },
    actions: {
        /**
         * 登录
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleGoods({ commit }, { current, keyword }) {
            keyword.tab_key = 'onsale';
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.search("POST", { include: 'goods' }, { keyword }).page(current, 7).then(data => {
                    let size = parseInt(data.headers['x-pagination-per-page']);
                    let total = parseInt(data.headers['x-pagination-total-count']);
                    let current = parseInt(data.headers['x-pagination-current-page']);
                    commit('setPageInfo', { size, total, current });
                    commit('setGoodsData', data.data);
                    resolve(data.data);
                }).catch(error => {
                    console.error("错误提示", error)
                })
            })
        },
        /**
         * [handleGoods description]
         * @param  {[type]} options.commit [description]
         * @return {[type]}                [description]
         */
        handleSearch({ commit }) {
            return new Promise((resolve, reject) => {

            })
        },

    }
};