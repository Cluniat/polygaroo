import axios from 'axios'
import { Config } from 'App/Config'
import NavigationService from './NavigationService'
import moment from 'moment'

const userApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

/* userApiClient.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

userApiClient.interceptors.request.use(
  function(config) {
    console.log(config)
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
) */

function parseErrors(errors) {
  return errors.reduce((acc, error) => {
    return {
      ...acc,
      [error.param]: [...(acc[error.param] || []), error.msg],
    }
  }, {})
}

function login(email, password) {
  return userApiClient
    .post('/signin', { email: email, password: password })
    .then((response) => {
      NavigationService.navigate('Home')
      return response.data.data
    })
    .catch((error) => console.log(error))
}

function register(email, password, name, birthday) {
  return userApiClient
    .post('/users', {
      email: email,
      password: password,
      name: name,
      birth_date: birthday !== '' ? moment(birthday, 'DD-MM-YYYY').format() : moment(),
    })
    .then((response) => ({ ok: true, data: response.data }))
    .catch((error) => ({ ok: false, errors: error.response.data.errors }))
}

function edit(token, userId, email, password, name, birthday) {
  return userApiClient
    .put(
      `/users/${encodeURIComponent(userId)}`,
      {
        email: email,
        password: password,
        name: name,
        birth_date: moment(birthday, 'DD-MM-YYYY').format(),
      },
      { headers: { Authorization: token } }
    )
    .then((response) => {
      return response.data.data
    })
    .catch((error) => console.log(error))
}

export const AuthService = {
  login,
  register,
  edit,
  parseErrors,
}
