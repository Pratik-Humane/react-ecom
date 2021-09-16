import { auth, GoogleProvider, handleUserProfile } from "../../firebase/util";
import { APP_URL } from "../../urlConfig";
import { userTypes } from "./users.types";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CUREENT_USER,
  payload: user,
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: userTypes.SIGN_IN_ERROR,
      payload: ["Invalid Credentials"],
    });
  }
};

export const signUpUser = ({ displayName, email, password }) => async (
  dispatch
) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: ["Something went wrong. Please try again."],
    });
  }
};

export const resetUserPassword = ({ email }) => async (dispatch) => {
  try {
    const config = {
      url: APP_URL,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch(() => {
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: ["Something went wrong. Please try again."],
        });
      });
  } catch (error) {
    dispatch({
      type: userTypes.RESET_PASSWORD_ERROR,
      payload: ["Something went wrong. Please try again."],
    });
  }
};

export const siginWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    });
  } catch (error) {
    //console.log(error);
    dispatch({
      type: userTypes.SIGN_IN_ERROR,
      payload: ["Something went wrong. Please try again."],
    });
  }
};
