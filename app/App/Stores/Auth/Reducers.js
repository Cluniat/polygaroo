import { INITIAL_STATE } from './InitialState'
import { AuthTypes } from './Actions'
import { createReducer } from 'reduxsauce'

export const loginLoading = (state) => ({
  ...state,
  loginLoading: true,
  loginError: null,
})

export const loginFailure = (state, { error }) => ({
  ...state,
  token: null,
  loginLoading: false,
  loginError: error,
})

export const loginSuccess = (state, { data }) => ({
  ...state,
  token: data.token,
  currentUser: data.user,
  loginLoading: false,
  LoginError: null,
})

export const registerLoading = (state) => ({
  ...state,
  registerLoading: true,
  registerError: null,
})

export const registerFailure = (state, { error }) => ({
  ...state,
  registerLoading: false,
  registerError: error,
})

export const registerSuccess = (state) => ({
  ...state,
  registerLoading: false,
  registerError: null,
})

export const editLoading = (state) => ({
  ...state,
  editLoading: true,
  editError: null,
})

export const editFailure = (state, { error }) => ({
  ...state,
  editLoading: false,
  editError: error,
})

export const editSuccess = (state, { data }) => ({
  ...state,
  editLoading: false,
  editError: null,
  currentUser: data,
})

export const logout = (state) => ({
  ...state,
  token: null,
})

export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.LOGIN_LOADING]: loginLoading,
  [AuthTypes.LOGIN_SUCCESS]: loginSuccess,
  [AuthTypes.LOGIN_FAILURE]: loginFailure,
  [AuthTypes.REGISTER_LOADING]: registerLoading,
  [AuthTypes.REGISTER_SUCCESS]: registerSuccess,
  [AuthTypes.REGISTER_FAILURE]: registerFailure,
  [AuthTypes.EDIT_LOADING]: editLoading,
  [AuthTypes.EDIT_SUCCESS]: editSuccess,
  [AuthTypes.EDIT_FAILURE]: editFailure,
  [AuthTypes.LOGOUT]: logout,
})
