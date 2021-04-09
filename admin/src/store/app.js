/*
 * @Author: imac
 * @Date:   2020-05-30 15:02:36
 * @Last Modified by:   Qinuoyun
 * @Last Modified time: 2021-02-17 21:59:17
 */
export default {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    actions: {
        /**
         * 登录
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleLogin({ commit }, { userName, password }) {
            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {

                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 退出登录
         * @param  {[type]} options.state  [description]
         * @param  {[type]} options.commit [description]
         * @return {[type]}                [description]
         */
        handleLogOut({ state, commit }) {
            return new Promise((resolve, reject) => {

            })
        },
        /**
         * 获取用户相关信息
         * @param  {[type]} options.state  [description]
         * @param  {[type]} options.commit [description]
         * @return {[type]}                [description]
         */
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {

            })
        }
    }
};
