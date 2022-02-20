import { DELETE_ROLE, GET_ROLE } from "./action"


/**
 * Initial State
 */
const initialState = {
  dataRole : []
};


export const getRole = (data) => {
  return {
    type : GET_ROLE,
    payload : data,
  };
};

export const deleteRole = (id) => {
  return {
    type : DELETE_ROLE,
    payload : id,
  }
};


/**
 * 
 * @param {initialState} state 
 * @param {./action} action 
 * @returns 
 */
const roleReducers = (state = initialState, action) => {
  switch(action.type) {
    case GET_ROLE:
      return {
        ...state,
        dataRole : action.payload
      }
    case DELETE_ROLE:
      let indexRole = state.dataRole.findIndex(role => role.id === parseInt(action.payload))
      return {
        dataRole : [...state.dataRole.slice(0, indexRole), ...state.dataRole.slice(indexRole + 1)]
      }
    default:
      return state;
  }
};

export default roleReducers;
