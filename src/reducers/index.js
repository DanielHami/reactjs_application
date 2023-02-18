import services from './services'
import selectedService from './selectedService'
import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import offers from './offers'

const serviceApp = combineReducers({services, selectedService, auth, offers})

//export const getMessages = (state) => state.auth.user.messages

export default serviceApp