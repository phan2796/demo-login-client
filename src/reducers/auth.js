import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_UP_ERROR, AUTH_SIGN_IN_ERROR, AUTH_SIGN_IN } from '../actions/types';

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: '',
  SIerrorMessage: '',
  SUerrorMessage: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] got an AUTH_SIGN_UP action!')
      return { ...state, isAuthenticated: false, SIerrorMessage: '', SUerrorMessage: '', successMessage: action.payload }
    case AUTH_SIGN_IN:
      console.log('[AuthReducer] got an AUTH_SIGN_IN action!')
      return { ...state, token: action.payload, isAuthenticated: true, SIerrorMessage: '', SUerrorMessage: '', successMessage: '' }
    case AUTH_SIGN_OUT:
      return { ...state, token: action.payload, isAuthenticated: false, SIerrorMessage: '', SUerrorMessage: '', successMessage: '' }
    case AUTH_SIGN_UP_ERROR:
      console.log('[AUTH_SIGN_UP_ERROR] got an AUTH_ERROR action!')
      return { ...state, SUerrorMessage: action.payload, SIerrorMessage: '', successMessage: '' }
    case AUTH_SIGN_IN_ERROR:
      console.log('[AUTH_SIGN_IN_ERROR] got an AUTH_ERROR action!')
      return { ...state, SIerrorMessage: action.payload, SUerrorMessage: '', successMessage: '' }
    default:
      return state
  }
}