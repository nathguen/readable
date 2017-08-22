export const SET_USER_NAME = "SET_USER_NAME"

export const setUserName = (userName) => {
  return {
    type: SET_USER_NAME,
    userName
  }
}