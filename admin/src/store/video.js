/*
 * @Author: imac
 * @Date:   2020-05-30 15:02:36
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-15 16:14:07
 */
export default {
    namespaced: true,
    state: {
        groupInfo: {
            id: -1,
            name: "全部"
        },
        groupList: [],
        photoList: [],
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
        setGroupInfo(state, data) {
            state.groupInfo = data
        },
        /**
         * 设置分类
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setGroupList(state, data) {
            state.groupList = data
        },
        /**
         * 设置分页
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPageInfo(state, data) {
            state.pageInfo = data
        },
        /**
         * 设置分页
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPhotoList(state, data) {
            state.photoList = data;
        }

    },
    actions: {
        upadteGroupInfo({ state, commit, dispatch }, value) {
            commit('setGroupInfo', value);
        },
        /**
         * 获取分类数据
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        LoadGroupList({ state, commit, dispatch }, id = 0) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("get", { include: 'gallery', parent_id: id, 'type': 2 }).then(data => {
                    commit('setGroupList', data);
                    resolve(data);
                }).catch(error => {
                    VM.$message({
                        type: 'error',
                        message: '网络请求错误，请刷新'
                    });
                    reject(error)
                })
            })
        },
        /**
         * 创建分类数据
         * @param  {[type]} options.commit   [description]
         * @param  {[type]} options.userName [description]
         * @param  {[type]} options.password [description]
         * @return {[type]}                  [description]
         */
        InterGroupItem({ state, commit, dispatch }, { name, id }) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("post", { include: "gallery" }, {
                    "name": name,
                    "type": 2,
                    "parent_id": id || 0,
                    "sort": 5
                }).then(data => {
                    VM.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    resolve(data);
                }).catch(error => {
                    if (error.data.message) {
                        VM.$message({
                            type: 'error',
                            message: error.data.message
                        });
                    } else {
                        VM.$message({
                            type: 'error',
                            message: '创建失败'
                        });
                    }
                    reject(error)
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
        DeleteGroupItem({ state, commit, dispatch }, { id, type }) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("delete", id, { include: 'gallery' }).then(data => {
                    VM.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    resolve(data);
                }).catch(error => {
                    VM.$message({
                        type: 'error',
                        message: '此分组下有文件夹，不支持删除'
                    });
                    reject(error)
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
        UpdateGroupItem({ state, commit, dispatch }, value) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.group("put", { include: 'gallery', id: parseInt(value.id) }, { name: value.name }).then(data => {
                    VM.$message({
                        type: 'success',
                        message: '命名成功'
                    });
                    resolve(data);
                }).catch(error => {
                    VM.$message({
                        type: 'error',
                        message: '修改失败'
                    });
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
        LoadPhotoList({ state, commit }, { id, current, pageSize }) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            let $pageSize = pageSize || 24;
            let $id = id || 0;
            return new Promise((resolve, reject) => {
                $heshop.gallery("get", { group_id: parseInt($id), type: 2 }).page(current, $pageSize).then(data => {
                    let size = parseInt(data.headers['x-pagination-per-page']);
                    let total = parseInt(data.headers['x-pagination-total-count']);
                    let current = parseInt(data.headers['x-pagination-current-page']);
                    setTimeout(() => {
                        commit('setPageInfo', { size, total, current });
                        commit('setPhotoList', data.data);
                    }, 100);
                    resolve(data.data);
                }).catch(error => {
                    VM.$message({
                        type: 'error',
                        message: '网络请求错误，请刷新'
                    });
                    reject(error)
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
        DeletePhotoList({ state, commit }, value) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.gallery("delete", value).then(data => {
                    VM.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                    resolve(data);
                }).catch(error => {
                    VM.$message({
                        type: 'error',
                        message: '删除失败'
                    });
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
        MovePhotoList({ state, commit, dispatch }, { list, group_id }) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.gallery("put", { behavior: 'setgroup', id: list }, { group_id: group_id }).then(data => {
                    VM.$message({
                        type: 'success',
                        message: '移动成功'
                    });
                    resolve(data);
                }).catch(error => {
                    VM.$message({
                        type: 'error',
                        message: '移动失败'
                    });
                    reject(error)
                })
            })
        },
        /**
         * 编辑照片信息
         * @param  {[type]} options.state  [description]
         * @param  {[type]} options.commit [description]
         * @return {[type]}                [description]
         */
        UpdatePhotoItem({ state, commit }, value) {
            let VM = this._vm;
            let $heshop = this._vm.$heshop;
            return new Promise((resolve, reject) => {
                $heshop.gallery("put", parseInt(value.id), { title: value.name }).then(data => {
                    VM.$message({
                        type: 'success',
                        message: '命名成功'
                    });
                    resolve(data);
                }).catch(error => {
                    VM.$message({
                        type: 'error',
                        message: '命名失败，文件夹以存在'
                    });
                    reject(error)
                })
            })
        },
    }
};