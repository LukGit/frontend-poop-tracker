// get user when login
export const addUser = userData => {
  return {
    type: 'LOGIN',
    userData
  };
};