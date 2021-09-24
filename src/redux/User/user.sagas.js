import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  auth,
  getCurrentUser,
  GoogleProvider,
  handleUserProfile,
} from "../../firebase/util";
import {
  resetPasswordError,
  resetPasswordSuccess,
  signInSuccess,
  signOutUserSuccess,
  signUpUserError,
} from "./user.actions";
import { resetPasswordAPI } from "./user.helper";
import { userTypes } from "./users.types";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const useRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield useRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data,
      })
    );
  } catch (error) {
    //console.log(error);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    const signInErr = ["Invalid Login Credentials"];
    yield put(signUpUserError(signInErr));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGNIN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    console.log(error);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  yield auth.signOut();
  yield put(signOutUserSuccess());
}
export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (error) {
    const signUpErr = ["Something went wrong. Please try again."];
    yield put(signUpUserError(signUpErr));
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield call(resetPasswordAPI, email);
    yield put(resetPasswordSuccess());
  } catch (error) {
    const resetPassErr = ["Email does not exist"];
    yield put(resetPasswordError(resetPassErr));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.log(error);
  }
}

export function* onSiginWithGoogle() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onSiginWithGoogle),
  ]);
}
