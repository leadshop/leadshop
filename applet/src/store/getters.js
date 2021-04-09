const getters = {
    /**
     * 获取当前属性栏目
     * @param  {[type]} state [description]
     * @return {[type]}       [description]
     */
    attribute: (state => {
        let index = state.pages.status;
        return state.pages.page[index].name;
    }),
};

export default getters;