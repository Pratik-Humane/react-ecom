import { userTypes } from "./users.types";

const INITIAL_STATE = {
  currentUser: null,
  signInSuccess: false,
  signInError: [],
  signUpSuccess: false,
  signUpError: [],
  resetPassError: [],
  resetPassSuccess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CUREENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGN_IN_ERROR:
      return {
        ...state,
        signInError: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPassError: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassSuccess: action.payload,
      };
    case userTypes.RESET_AUTH_FORMS:
      return {
        ...state,
        signInSuccess: false,
        signUpSuccess: false,
        signUpError: [],
        resetPassSuccess: false,
        resetPassError: [],
      };
    default:
      return state;
  }
};

export default userReducer;
