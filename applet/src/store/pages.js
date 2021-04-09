/*
 * @Author: imac
 * @Date:   2020-05-30 15:02:36
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-02-04 09:15:45
 */
const pages = {
    namespaced: true,
    state: {
        dragIndex: -1,
        position: "top",
        status: -1,
        page: [],
        coms: null,
        iframeHeight:0
    },
    mutations: {
        /**
         * 设置属性信息
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setAttribute(state, data) {
            let { index, key, value } = data;
            let { status } = state;
            state.page[index][key] = JSON.parse(JSON.stringify(value));
        },
        /**
         * 设置信息
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setStatusIndex(state, data) {
            state.status = data
        },
        /**
         * 设置信息
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setIframeHeight(state, data) {
            state.iframeHeight = data
        },
        /**
         * 设置页面
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setPageData(state, data) {
            state.page = data
        },
        /**
         * 获取页面内容
         * @param  {[type]} state [description]
         * @return {[type]}       [description]
         */
        getPageData(state) {
            return JSON.stringify(state.page);
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
         * 设置当前原件
         * @param {[type]} state [description]
         * @param {[type]} data  [description]
         */
        setComs(state, data) {
            state.coms = data
        }
    },
    actions: {
        /**
         * 添加元件
         * @param  {[type]} state [description]
         * @param  {[type]} data  [description]
         * @return {[type]}       [description]
         */
        pushPagesComs(context, data) {
            let { dragIndex, coms, page, status, position } = context.state;
            let element = JSON.parse(JSON.stringify(coms));
            //数据阻隔，否则在激活状态下，在顶部的增加数据会错乱
            let pages = JSON.parse(JSON.stringify(page));
            if (dragIndex == -2) {
                pages.push(element);
            }
            //在其他位置点
            if (dragIndex > 0) {
                if (position == 'top') {
                    dragIndex;
                } else {
                    dragIndex++;
                }
                pages.splice(dragIndex, 0, element);
            }
            //在顶部添加
            if (dragIndex === 0) {
                pages.unshift(element)
            }
            //重新修改数据元素
            context.commit('setPageData', pages)
            //判断是否在激活组件之前添加元件
            if (dragIndex <= status && dragIndex !== -2) {
                //用户判断在有多个组件的时候，且在激活的组件之前，添加组件，需要修改激活位置
                let index = status + 1;
                context.commit('setStatusIndex', index);
                //获取父级信息
                let parent = window.parent.window.app;
                let name = context.rootGetters.attribute;
                //通知父级修改激活选项的位置
                parent.$store.commit('pages/setAttribute', name);
                parent.$store.commit('pages/setActiveIndex', index);
            }
            //清空数据
            context.commit('setComs', "")
        }
    }
};

export default pages;