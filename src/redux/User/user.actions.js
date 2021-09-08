import { userTypes } from "./users.types";

export const setCurrentUser = user => ({
  type: userTypes.SET_CUREENT_USER,
  payload: user
});