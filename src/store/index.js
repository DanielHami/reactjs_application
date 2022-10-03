import { configureStore, combineReducers } from '@reduxjs/toolkit'
import servicesReducer from 'reducers'

const logger = store => dispatch => action => {
    console.group(action.type)
    console.log('%c prevstate', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = dispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
}

const promise = store => dispatch => action => {
    if (typeof action.then === 'function') {
        return action.then(dispatch)
    }
    return dispatch(action)
}

const applyMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch)
    })
}



const initStore = () => {
    const middlewares = [promise]
    const serviceApp = combineReducers({
        service: servicesReducer
    })
    const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const store = configureStore({
        reducer: serviceApp, reduxDevTools
    })
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger)
    }

    applyMiddlewares(store, middlewares)
    return store
}


export default initStore
