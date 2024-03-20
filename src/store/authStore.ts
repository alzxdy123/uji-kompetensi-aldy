import { Commit } from "vuex";

export const authStore = {
  namespaced: true,
  state: {
    user: undefined as any,
  },
  mutations: {
    setUser(state: { user: any }, user: any) {
      state.user = user;
    },
  },
  actions: {
    logout({ commit }: { commit: Commit }) {
      commit("setUser", undefined);
    },

    login({ commit }: { commit: Commit }, user: any) {
      commit("setUser", user);
    },
  },
  getters: {
    loggedUser: (state: { user: any }) => {
      return state.user;
    },
    isAuth: (state: { user: any }) => {
      return state.user ? true : false;
    },
  },
};

// export const authStore = {
//   namespaced: true,
//   state: {
//     user: undefined as any,
//   },
//   mutations: {
//     setUser (state, user) {
//       state.user = user
//     }
//   },
//   actions: {
//     logout({commit}) {
//       commit('setUser', undefined)
//     },

//     login({commit}, user) {
//       commit('setUser', user)
//     }
//   },
//   getters: {
//     loggedUser: state => {
//       return state.user
//     },
//     isAuth: state => {
//       return state.user ? true : false
//     }
//   }
// }
