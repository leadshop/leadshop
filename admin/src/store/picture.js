/*
 * @Author: imac
 * @Date:   2020-05-30 15:02:36
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-23 15:26:12
 */
export default {
    namespaced: true,
    state: {
        index: -1,
        classify: [],
        groups: [],
        pictures: [],
        classifyInfo: {},
        pageInfo: {
            size: 15,
            total: 0,
            current: 1,
        }
    },
    mutations: {
        /**
         * 设置分类
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setIndex(state, data) {
            state.index = data
        },
        /**
         * 设置分类
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setClassify(state, data) {
            state.classify = data
        },
        /**
         * 设置分类
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setGroups(state, data) {
            state.groups = data
        },
        /**
         * 设置分类信息
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setClassifyInfo(state, data) {
            state.classifyInfo = data
        },
        /**
         * 设置图片
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPictures(state, data) {
            state.pictures = data
        },
        /**
         * 设置分页
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPageInfo(state, data) {
            state.pageInfo = data
        },
    },
    actions: {

        /**
         * 创建分类数据
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleMakeClassify({ state, commit, dispatch }, { name, id, type }) {
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("post", { include: "gallery" }, {
                    "name": name,
                    "parent_id": id || 0,
                    "sort": 5
                }).then(data => {
                    resolve(data);
                }).catch(error => {
                    if (type == 1) {
                        dispatch('handleClassify', 0)
                    }
                    if (type == 2) {
                        dispatch('handlePictures', { id: id, current: 1 })
                    }
                })
            })
        },
        /**
         * 编辑分类数据
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleEditClassify({ state, commit, dispatch }, value) {
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("put", { include: 'gallery', id: parseInt(value.id) }, { name: value.name }).then(data => {
                    resolve(data);
                }).catch(error => {
                    console.error("修改分类报错", error)
                    VM.$message({
                        type: 'error',
                        message: '修改失败!'
                    });
                })
            })
        },
        /**
         * 删除分组
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleDeleteClassify({ state, commit, dispatch }, { id, type }) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("delete", id, { include: 'gallery' }).then(data => {
                    VM.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    if (type == 1) {
                        dispatch('handleClassify', 0)
                    }
                    if (type == 2) {
                        dispatch('handlePictures', { id: id, current: 1 })
                    }
                    resolve(data);
                }).catch(error => {
                    VM.$alert('此分组下有文件夹，不支持删除', '', {
                        confirmButtonText: '我知道了'
                    });
                })
            })

        },
        /**
         * 获取分类数据
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleClassify({ state, commit, dispatch }, id = 0) {
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("get", { include: 'gallery', parent_id: id }).then(data => {
                    commit('setClassify', data);
                    commit('setClassifyInfo', data[0]);
                    dispatch('handlePictures', { id: data[0].id, current: 1, pageSize: 15 })
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取所欲分类
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleGroups({ state, commit, dispatch }, id = 0) {
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("get", { include: 'gallery' }).then(data => {
                    commit('setGroups', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取所欲分类
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        handleMoveGroup({ state, commit, dispatch }, { list, group_id }) {
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.gallery("put", { behavior: 'setgroup', id: list }, { group_id: group_id }).then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        /**
         * 获取照片信息
         * @param  {[type]} options.state  [description]
         * @param  {[type]} options.commit [description]
         * @return {[type]}                [description]
         */
        handlePictures({ state, commit }, { id, current, pageSize }) {
            let $heshop = this._vm.$heshop;
            let $pageSize = pageSize || 24;
            let $id = id || 0;
            return new Promise((resolve, reject) => {
                $heshop.gallery("get", { group_id: parseInt($id) }).page(current, $pageSize).then(data => {
                    let size = parseInt(data.headers['x-pagination-per-page']);
                    let total = parseInt(data.headers['x-pagination-total-count']);
                    let current = parseInt(data.headers['x-pagination-current-page']);
                    commit('setPageInfo', { size, total, current });
                    commit('setPictures', data.data);
                    resolve(data.data);
                }).catch(error => {
                    this.loading = false;
                })
            })
        },
        /**
         * 编辑照片信息
         * @param  {[type]} options.state  [description]
         * @param  {[type]} options.commit [description]
         * @return {[type]}                [description]
         */
        handleEditPicture({ state, commit }, value) {
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.gallery("put", parseInt(value.id), { title: value.name }).then(data => {
                    resolve(data);
                }).catch(error => {
                    this.loading = false;
                })
            })
        },
        /**
         * 删除图片
         * @param  {[type]} options.state  [description]
         * @param  {[type]} options.commit [description]
         * @param  {[type]} data           [description]
         * @return {[type]}                [description]
         */
        handleDeleteGallery({ state, commit }, value) {
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.gallery("delete", value).then(data => {
                    resolve(data);
                }).catch(error => {
                    this.loading = false;
                })
            })
        }
    }
};