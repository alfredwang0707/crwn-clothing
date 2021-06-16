import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'
//action// middleware// rootreducer //store //dom change//

const middlewares = [logger]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
