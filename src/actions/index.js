// get user when login
export const addUser = userData => {
  return {
    type: 'LOGIN',
    userData
  };
};
export const currentUser = (userData) => {
  return {
    type: "CURRENT_USER",
    userData
  }
}