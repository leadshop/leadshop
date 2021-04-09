const cart = {
    namespaced: true,
    state: {
        cart_add: false
    },
    mutations: {
        setCartAdd(state, data) {
            state.cart_add = data;
        }
    },
    getters: {
        getCartAdd: function(state) {
            return state.cart_add;
        }
    },
    actions: {

    }
};

export default cart;
