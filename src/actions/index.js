import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_SIGN_UP_ERROR, AUTH_SIGN_IN_ERROR,  } from './types';
const domain = "https://mysterious-brook-63941.herokuapp.com"
// const domain = "http://localhost:5000"
/*
  ActionCreators -> create/return Actions ({ }) -> dispatched -> middlewares -> reducers
*/

export const oauthGoogle = data => {
  return async dispatch => {
    // console.log("dispatch google with token: ", data)
    const res = await axios.post(`${domain}/users/oauth/google`, {
      access_token: data
    });
    // console.log('res: ', res)
    dispatch({
      type: AUTH_SIGN_IN,
      payload: res.data.token
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
  };
}

export const oauthFacebook = data => {
  return async dispatch => {
    const res = await axios.post(`${domain}/users/oauth/facebook`, {
      access_token: data
    });
    dispatch({
      type: AUTH_SIGN_IN,
      payload: res.data.token
    });
    localStorage.setItem('JWT_TOKEN', res.data.token);
  };
}

export const signUp = data => {
  /*
      Step 1) Use the data and to make HTTP request to our BE and send it along [X]
      Step 2) Take the BE's response (jwtToken is here now!) [X]
      Step 3) Dispatch 'user just signed up' (with jwtToken) [X]
      Step 4) Save the jwtToken into our localStorage [X]
  */
  return async dispatch => {
    try {
      console.log('[ActionCreator] signUp called!')
      const res = await axios.post(`${domain}/users/signup`, data);

      console.log('[ActionCreator] signUp dispatched an action!')
      dispatch({
        type: AUTH_SIGN_UP,
        payload: "Sign up success!!!"
      });

      // localStorage.setItem('JWT_TOKEN', res.data.token);
    } catch (err) {
      dispatch({
        type: AUTH_SIGN_UP_ERROR,
        payload: 'Something wrong!!!'
      })
    }
  };
}
export const signIn = data => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] signUp called!')
      const res = await axios.post(`${domain}/users/signin`, data);

      console.log('[ActionCreator] Sign In dispatched an action!')
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
    } catch (err) {
      dispatch({
        type: AUTH_SIGN_IN_ERROR,
        payload: 'Email or password is incorrect !!!'
      })
    }
  };
}
export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    })
  };
}