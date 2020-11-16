import { combineReducers } from "redux";

// this combined reducer contains four redux store items

const rootReducer = combineReducers({
  users: usersReducer,
  reports: reportsReducer
});

export default rootReducer;

function usersReducer(state = { user: '', userId: 0}, action) {

}

function reportsReducer(state = [], action) {

}