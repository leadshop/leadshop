/*
 * @Author: imac
 * @Date:   2020-05-30 15:02:36
 * @Last Modified by:   imac
 * @Last Modified time: 2021-03-17 00:06:49
 */
export default {
    namespaced: true,
    state: {
        menuList: {}
    },
    mutations: {
        /**
         * 设置分类
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setmenuList(state, { key, data }) {
            state.menuList[key] = data
        }

    }
};