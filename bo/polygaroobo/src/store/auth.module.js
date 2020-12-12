import { UserService, AuthenticationError } from "../services/user.service"
import TokenService from '../services/storage.service'
import router from '../router'

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    authenticationSuccess: false,
    //refreshTokenPromise: null
}

const getters = {
    loggedIn: (state) => {
        return state.accessToken != null
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticationSuccess: (state) => {
        return state.authenticationSuccess
    },

    authenticating: (state) => {
        return state.authenticating
    }
}

const actions = {
    async login({commit}, {email, password}) {
        commit('loginRequest');
        try {
            const response = await UserService.login(email, password)
            commit('loginSuccess', response.data.data.token)
            TokenService.saveToken(response.data.data.token)
            return await router.push('/home')
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }
            return false
        }
    },

    logout({commit}) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/')
    },

}

const mutations = {
    loginRequest(state) {
        state.authenticating = true
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.currentUser =
        state.authenticating = false
        state.authenticationSuccess = true
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
        state.authenticationSuccess = false
    },

    logoutSuccess(state) {
        state.accessToken = ''
    },

   /*refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    }*/
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}