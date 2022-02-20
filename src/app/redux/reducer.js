import {
  combineReducers
} from "@reduxjs/toolkit";
import {
  CHANGE_PICTURE,
  LOGIN,
  LOGOUT,
  PERMISSION_UPDATE
} from './action';
import roleReducers from "./rolePermissionReducer";


/**
 * LOGIN PROCESS
 * @param {*} data 
 * @returns 
 */
export const loginProcess = (data, role, permissions) => {
  return {
    type: LOGIN,
    payload: data,
    role: role,
    permissions: permissions,
  };
};


/**
 * LOGOUT PROCESS
 * @returns 
 */
export const logoutProcess = () => {
  return {
    type: LOGOUT
  };
};

/**
 * ON PERMISSION UPDATE
 */
export const permissionUpdate = (data) => {
  return {
    type: PERMISSION_UPDATE,
    permissions: data,
  }
}

/**
 * On Change Picture
 */
export const pictureUpdate = (picture) => {
  return {
    type: CHANGE_PICTURE,
    picture : picture,
  }
}
/**
 * Initial State
 */
const initialState = {
  dataUser: {},
  role: '',
  permissions : [],
};

/**
 * 
 * @param {initialState} state 
 * @param {./action} action 
 * @returns 
 */
const reducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        dataUser: action.payload,
        role: action.role,
        permissions: action.permissions
      }
    case PERMISSION_UPDATE: 
      return {
        ...state,
        permissions: action.permissions
      }
    case CHANGE_PICTURE:
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          avatar: action.picture
        }
      }
    case LOGOUT:
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: reducers,
  role: roleReducers
});

export default rootReducer;