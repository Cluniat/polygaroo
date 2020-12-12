import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  login: ['email', 'password'],
  loginLoading: null,
  loginSuccess: ['data'],
  loginFailure: ['error'],

  register: ['email', 'password', 'name', 'birthday'],
  registerLoading: null,
  registerSuccess: null,
  registerFailure: ['error'],

  edit: ['token', 'userId', 'email', 'password', 'name', 'birthday'],
  editLoading: null,
  editSuccess: ['data'],
  editFailure: ['error'],

  logout: null,
})

export const AuthTypes = Types
export default Creators
