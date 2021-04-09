const after = {
    namespaced: true,
    state: {
        cancel_after: {
            boole: false,
            order_id: null
        }
    },
    mutations: {
        cancelAfter: function(state, data) {
            state.cancel_after = data;
        }
    },
    getters: {

    },
    actions: {

    }
};

export default after;