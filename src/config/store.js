import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {logger} from 'redux-logger'
import ListReducer from "../reducers/listReducer";
import promise from 'redux-promise-middleware'

const rootReducer = combineReducers({
    form: formReducer,
    list: ListReducer
})

const store = createStore(rootReducer, applyMiddleware(logger, promise))
export default store