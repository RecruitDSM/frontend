import axios from 'axios';

import { baseURL } from '../data/api';

export const signInHelper = async ({ email, password }) => {
  const isSignInSuccess = await axios.post(`${baseURL}/signin`, {
    email,
    password
  })
    .then(response => {
      if (response.status === 200) {

        window.sessionStorage.setItem('token', response.data.result.token);
        window.sessionStorage.setItem('refresh', response.data.result.refresh);
        return true;
      }
    })
    .catch(error => { console.log(error); });

  return isSignInSuccess;
}


export const signUpHelper = async (form) => {
  const isSignUpSuccess = await axios.post(`${baseURL}/signup`, { ...form })
    .then(response => {
      if (response.status === 201) {
        return true;
      }
    })
    .catch(error => { console.log(error); });
  return isSignUpSuccess;
};

export const signOutHelper = () => {

  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("refresh");

};

export const isSignInChecker = () => {
  if (window.sessionStorage.getItem("token")) return true;
  else return false;
}