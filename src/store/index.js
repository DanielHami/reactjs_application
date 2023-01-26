import { configureStore, compose } from '@reduxjs/toolkit'
import serviceApp from 'reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'


/*const promise = store => next => action => {
    if (typeof action.then === 'function') {
        console.log(action)
        return action.then(next)
    }
    return next(action)
}*/

/*const thunk = store => next => action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState)
    }
    return next(action)
}*/
/*const applyMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch)
    })
}*/



const initStore = () => {
    const middlewares = [thunk]
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    

    const store = configureStore({
        reducer: serviceApp,
        middleware: middlewares.concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    })

    return store
}


export default initStore
