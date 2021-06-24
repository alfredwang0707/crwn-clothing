import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'

import rootReducer from './root-reducer'
//action// middleware// rootreducer //store //dom change//

const middlewares = [logger]

if (process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}
 
export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)

