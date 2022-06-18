import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  bearer: '',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  // name: (state) => state.name,
}

export const mutations: MutationTree<RootState> = {
  // CHANGE_NAME: (state, newName: string) => (state.name = newName),
  setBearer: (state, bearer) => (state.bearer = bearer),
}

export const actions: ActionTree<RootState, RootState> = {
  // fetchThings({ commit }) {
  //   const things = this.$axios.$get('/things')
  //   console.log(things)
  //   commit('CHANGE_NAME', 'New name')
  // },
}
