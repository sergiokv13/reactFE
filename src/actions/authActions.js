export const login = (userData) => dispatch => {
    dispatch ({
      type: "LOGIN",
      payload: {
        userId: userData.userId,
        locationId: userData.locationId
      }
  })
}

export const logout = () => dispatch => {
  dispatch ({
    type: "LOGOUT",
    payload: ''
  })
}

export const currentUser = () => dispatch => {
  dispatch ({
    type: "CURRENT_USER",
    payload: ''
  })
}