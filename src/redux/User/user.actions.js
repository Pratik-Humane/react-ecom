import { userTypes } from "./users.types";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGNIN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const signUpUserStart = (userCredentials) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const signUpUserError = (error) => ({
  type: userTypes.USER_ERROR,
  payload: error,
});

export const signInUserError = (error) => ({
  type: userTypes.USER_ERROR,
  payload: error,
});

export const resetPasswordError = (error) => ({
  type: userTypes.USER_ERROR,
  payload: error,
});

export const resetPasswordStart = (userCredentials) => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CUREENT_USER,
  payload: user,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});
