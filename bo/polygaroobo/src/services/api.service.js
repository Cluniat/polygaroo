import axios from 'axios'
import TokenService from "./storage.service";

const instance = axios.create({
    baseURL: 'https://polygaroo.cleverapps.io/api',
    // baseURL: 'http://localhost:3000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: TokenService.getToken()
    },
})

instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)

instance.interceptors.request.use(function (config) {
        console.log(config)
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

export default instance