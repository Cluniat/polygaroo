import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import { auth } from './auth.module'
import { users } from './users.module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    users
  },
  plugins: [createPersistedState()]
})

export default store