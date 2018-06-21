import { LOGIN, LOGOUT,CURRENT_USER } from '../actions/types'

const initialState = {
  user: null
}

export default function(state = initialState , action) {
  
  switch (action.type){
    case LOGIN:
      return{
        ...state,
        user: {
          id: action.payload.userId,
          locationId: action.payload.locationId
        } 
      }
    
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    case CURRENT_USER:
      return {
        ...state
      }

    default:
     return state
  }
}
