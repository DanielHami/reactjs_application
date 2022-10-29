import services from './services'
import selectedService from './selectedService'
import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'

const serviceApp = combineReducers({services, selectedService, auth})

export default serviceApp