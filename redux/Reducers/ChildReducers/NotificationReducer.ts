import { GET_NOTIFICATIONS, SHOW_NOTIFICATIONS } from '../../Actions/NotificationActions';

/**
 * Intial state of the authentication reducer model
 */
interface NotificationInterface {
    notifications: any
    showNotification: boolean;
}

/**
 * Initial value of the state
 */
export const notificationInitialState: NotificationInterface = {
    notifications: [],
    showNotification: false
}

/**
 * Reducer logic.
 */
export default (state = notificationInitialState, action: any ) => {
    switch (action.type) {
     case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      }
    case SHOW_NOTIFICATIONS: 
      return {
        ...state,
        showNotification: action.payload
      }  
     default:
      return state
    }
}