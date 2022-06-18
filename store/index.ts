import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  bearer: '',
  isMissionReturn: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  // name: (state) => state.name,
}

export const mutations: MutationTree<RootState> = {
  setInitialize: (state) => {
    state.isMissionReturn = false
  },
  setBearer: (state, bearer) => (state.bearer = bearer),
  SetIsMissionReturn: (state, isMissionReturn) =>
    (state.isMissionReturn = isMissionReturn),
}

export const actions: ActionTree<RootState, RootState> = {
  // fetchThings({ commit }) {
  //   const things = this.$axios.$get('/things')
  //   console.log(things)
  //   commit('CHANGE_NAME', 'New name')
  // },
}
