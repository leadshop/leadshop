/*
 * @Author: imac
 * @Date:   2020-05-30 15:02:36
 * @Last Modified by:   Qinuoyun
 * @Last Modified time: 2021-02-22 00:44:10
 */
export default {
    namespaced: true,
    state: {
        /**
         * 页面信息
         * @type {Object}
         */
        pageInfo: {},
        /**
         * 事件锁
         * @type {Boolean}
         */
        is_lock: false,
        /**
         * 拖拽标记
         * @type {Number}
         */
        dragIndex: -1,
        /**
         * 放置位置
         * @type {String}
         */
        position: "top",
        /**
         * 标记
         * @type {Number}
         */
        index: 0,
        /**
         * 元件
         * @type {[type]}
         */
        coms: null,
        /**
         * 页面信息
         * @type {Array}
         */
        pages: []
    },
    mutations: {
        /**
         * 设置页面信息
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPageInfo(state, data) {
            state.pageInfo = data
            state.index = 0;
            state.dragIndex = -1;

        },
        /**
         * 事件锁
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setLock(state, data) {
            state.is_lock = data
        },
        /**
         * 设置当前原件
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setComs(state, data) {
            state.coms = data
        },
        /**
         * 当前激活
         * @param {[type]} state [description]
         * @param {[type]} value [description]
         */
        setIndex(state, value) {
            state.index = value;
        },
        /**
         * 设置拖拽目的地
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setDragIndex(state, data) {
            state.dragIndex = data
        },
        /**
         * 设置拖拽位置
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setDragPosition(state, data) {
            state.position = data
        },
        /**
         * 设置属性信息
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setAttribute(state, data) {
            let { index } = state;
            //防止Index=-1时的误操作
            if (index >= 0 && data) {
                let { key, value } = data;
                state.pages[index][key] = JSON.parse(JSON.stringify(value));
            }
        },
        /**
         * 设置页面
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPagesData(state, data) {
            state.pages = data
        },
    },
    actions: {
        /**
         * 添加元件
         * @param  {[type]} state [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        pushPagesComs(context) {
            let { dragIndex, coms, pages, position } = context.state;
            let element = JSON.parse(JSON.stringify(coms));
            //数据阻隔，否则在激活状态下，在顶部的增加数据会错乱
            let data = JSON.parse(JSON.stringify(pages));
            if (dragIndex == -2) {
                data.push(element);
            }
            //在其他位置点
            if (dragIndex > 0) {
                if (position == 'top') {
                    dragIndex;
                } else {
                    dragIndex++;
                }
                data.splice(dragIndex, 0, element);
            }
            //在顶部添加
            if (dragIndex === 0) {
                if (position == 'top') {
                    data.unshift(element)
                } else {
                    dragIndex++;
                    data.splice(dragIndex, 0, element);
                }
            }
            if (dragIndex == -1) {
                data.push(element);
                dragIndex = data.length - 1;
            }
            //重新修改数据元素
            context.commit('setPagesData', data)
            context.commit('setIndex', dragIndex);
            //清空数据
            context.commit('setComs', "")
        }
    }
};