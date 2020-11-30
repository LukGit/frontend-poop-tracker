import { combineReducers } from "redux";

// this combined reducer contains four redux store items

const rootReducer = combineReducers({
  users: usersReducer,
  reports: reportsReducer
});

export default rootReducer;

function usersReducer(state = { user: '', userId: 0, zipcode: 0}, action) {
  switch (action.type) {
    // when login and current_user return the username and id
    case "LOGIN":
    case "CURRENT_USER":
      return {
        user: action.userData.username,
        userId: action.userData.id,
        zipcode: action.userData.zipcode
      }
    default:
      return state
    }
}

function reportsReducer(state = [], action) {

}