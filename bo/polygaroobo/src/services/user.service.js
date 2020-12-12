import ApiService from './api.service'
import TokenService from './storage.service'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super()
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    login: async function(email, password) {
        try {
            return await ApiService.post('/adminsignin', {email, password})
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    getAllUsers: async function() {
        try {
            return await ApiService.get('/users')
        } catch (error) {
            throw error.response.data.message
        }
    },

    deleteUser: async function(id) {
        try {
            return await ApiService.delete(`/users/${encodeURIComponent(id.toString())}`)
        } catch (error) {
            throw error.response.data.message
        }
    },

    createUser: async function(email, password, name) {
        try {
            return await ApiService.post('/users', {email, password, name})
        } catch (error) {
            throw error.response.data.message
        }
    },

    editUser: async function(user) {
        const id = user._id
        try {
            return await ApiService.put(`/users/admin/${encodeURIComponent(id.toString())}`, user)
        } catch (error) {
            throw error.response.data.message
        }
    },

    setAdmin: async function(user) {
        const id = user._id
        const isAdmin = !user.is_admin
        try {
            return await ApiService.put(`/setadmin/${encodeURIComponent(id.toString())}`, {is_admin: isAdmin})
        } catch (error) {
            throw error.response.data.message
        }
    },

    logout() {
        TokenService.removeToken()
        //TokenService.removeRefreshToken()
        //ApiService.removeHeader()
    }
}

export default UserService
export { UserService, AuthenticationError }