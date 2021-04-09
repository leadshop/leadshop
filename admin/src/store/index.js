import Vue from 'vue'
import Vuex from 'vuex'
import finish from './finish.js';
import photo from './photo.js';
import picture from './picture.js';
import video from './video.js';
import goods from './goods.js';
import setting from "./setting";
import menus from "./menus";

import getters from './getters.js';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: { finish, picture, photo, video, goods, setting, menus },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters: getters
});