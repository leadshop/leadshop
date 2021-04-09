const getters = {
    /**
     * 获取当前属性栏目
     * @param  {[type]} state [description]
     * @return {[type]}       [description]
     */
    attribute: (state => {
        let index = state.finish.index;
        if (state.finish.pages[index]) {
            return state.finish.pages[index].name;
        } else {
            return "";
        }

    }),
    content: (state => {
        let index = state.finish.index;
        if (state.finish.pages[index]) {
            return state.finish.pages[index].content;
        }
    }),
    facade: (state => {
        let index = state.finish.index;
        if (state.finish.pages[index]) {
            return state.finish.pages[index].facade;
        }
    })
};

export default getters;