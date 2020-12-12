import {UserService} from "../services/user.service"
import router from '../router'

const state = {
    all: {}
};

const getters = {
    getAllUsers: (state) => {
        return state.all
    }
};

const actions = {
    async getAllUsers({ commit }) {
        commit('getAllUsersRequest')
        try {
            const users = await UserService.getAllUsers()
            commit('getAllUsersSuccess', users)
        } catch (e) {
            commit('getAllUsersFailure', {error: e})
            return false
        }
    },

    async deleteUser({ commit }, id) {
        commit('deleteUserRequest', id)

        try {
            await UserService.deleteUser(id)
            commit('deleteUserSuccess', id)
            return await router.go(0)
        } catch (e) {
            commit('deleteUserFailure', {id, error: e})
            return false
        }
    },

    async createUser({ commit }, {email, password, name}) {
        commit('createUserRequest')
        try {
            await UserService.createUser(email, password, name)
            commit('createUserSuccess')
            return await router.go(0)
        } catch(e) {
            commit('createUserFailure', {error: e})
            return false
        }
    },

    async editUser({ commit }, user) {
        const id = user._id
        commit('editUserRequest', id)

        try {
            await UserService.editUser(user)
            commit('editUserSuccess', user)
        } catch (e) {
            commit('editUserFailure', {error: e})
            return false
        }
    },

    async setAdmin({ commit }, user) {
        const id = user._id
        commit('adminUserRequest', id)

        try {
            const response = await UserService.setAdmin(user)
            commit('adminUserSuccess', response)
        } catch (e) {
            commit('adminUserFailure', {error: e})
            return false
        }
    }
};

const mutations = {
    getAllUsersRequest(state) {
        state.all = { loading: true }
    },
    getAllUsersSuccess(state, users) {
        state.all = { items: users }
    },
    getAllUsersFailure(state, error) {
        state.all = { error }
    },


    deleteUserRequest(state, id) {
        state.all.items = state.all.items.data.data.map(user =>
            user._id === id? { ...user, deleting: true } : user
        )
    },
    deleteUserSuccess(state, id) {
        state.all.items = state.all.items.filter(user => user._id !== id)
    },
    deleteUserFailure(state, { id, error }) {
        state.all.items = state.all.items.map(user => {
            if(user._id === id) {
                // make copy of user without 'deleting:true' property
                /* eslint-disable no-unused-vars */
                const { deleting, ...userCopy } = user
                /* eslint-enable no-unused-vars */
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error }
            }
            return user
        })
    },


    createUserRequest(state) {
        state.all = { creating: true }
    },
    createUserSuccess(state) {
        state.all = { items: users }
    },
    createUserFailure(state, { error }) {
        state.all = { error }
    },

    editUserRequest(state, id) {
        state.all.items = state.all.items.data.data.map(user =>
            user._id === id? { ...user, editing: true } : user
        )
    },
    editUserSuccess(state, user) {
        state.all.items.forEach(u => {
            if(u.id === user._id) {
                u = user
            }
        });
    },
    editUserFailure(state, {error}) {
        state.all = { error }
    },

    adminUserRequest(state, id) {
        state.all.items = state.all.items.map(user =>
            user._id === id? { ...user} : user
        )
    },
    adminUserSuccess(state, user) {
        state.all.forEach(u => {
            if(u.id === user._id) {
                user.is_admin = true
            }
        });
    },
    adminUserFailure(state, {error}) {
        state.all = { error }
    }
};

export const users = {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
};