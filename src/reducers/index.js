import services from './services'
import selectedService from './selectedService'
import { combineReducers } from '@reduxjs/toolkit'

const serviceApp = combineReducers({services, selectedService})

export default serviceApp