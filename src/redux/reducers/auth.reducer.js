import Firebase from "../../firebase";

import {
  GET_AUTH_FROM_LOCAL_STORAGE,
  REMOVE_AUTH_FROM_LOCAL_STORAGE,
} from "../actions/auth.action";

const initialState = {
  firebase: new Firebase(),
  authUser: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_FROM_LOCAL_STORAGE:
      return {
        ...state,
        authUser: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
