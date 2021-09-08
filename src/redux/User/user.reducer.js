import { userTypes } from "./users.types";

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CUREENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
} 

export default userReducer;