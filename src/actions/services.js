import { FETCH_SERVICES, FETCH_SERVICE_BY_ID, FETCH_SERVICES_SUCCESS, RESET_AUTH_STATE } from 'types';


import * as api from 'api'
import { getDoc, getDocs } from 'firebase/firestore';



export const fetchServices = () => dispatch => {
     api.fetchServices()
    .then(services => dispatch({type: FETCH_SERVICES, services}))
}

export const fetchUserServices = (userId) => dispatch => {
  api.fetchUserServices(userId)
  .then(services => dispatch({type: FETCH_SERVICES_SUCCESS,services}))
}

export const fetchById = (serviceId) => (dispatch, getState) => {  
  const lastService = getState().selectedService.item
  if(lastService.id && lastService.id === serviceId ) {return Promise.resolve()}

  return api
    .fetchById(serviceId)
    .then(async services => {
       const user = await services.user.get()
       debugger
       services.user = user.data()
       services.user.id = user.id
       dispatch({ type: FETCH_SERVICE_BY_ID, services})
    }); 
}

export const createService = (newService, userId) => {
    newService.price = parseInt(newService.price, 10)
    newService.user = api.createUserRef('profile', userId)
    return api.createService(newService)
  }

  export const resetAuthState = () => {
    return {
        type: RESET_AUTH_STATE
      }
    
  }