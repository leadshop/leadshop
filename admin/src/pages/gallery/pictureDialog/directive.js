/*
 * @Author: Qinuoyun
 * @Date:   2020-09-15 20:12:25
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-10 16:20:12
 */
import Vue from 'vue';

/**
 * <p  v-popup.role="description" data-value="description" action="">新建</p>
 *
 * v-popup.<绑定的模态框>="<需要传入的值>"
 * data-value="<回调改变的值>"
 * data-title="设置标题"
 *
 * 添加 affirm 方法
 * @param  {[type]} option [description]
 * @return {[type]}        [description]
 */
let directives = {
    /**
     * 数据池
     * @type {Array}
     */
    store: {},
    /**
     * 弹出层
     * @type {Object}
     */
    upload: {
        bind: function(el, binding, vnode) {

        },
        inserted: function(el, binding, vnode) {
           

        },
        update: function(el, binding, vnode) {
          
        }
    }

};

export default directives;