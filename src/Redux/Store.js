import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {thunk} from 'redux-thunk'
import  {logger} from 'redux-logger'
import { QuizReducer } from './QuizReducer'
const rootReducer=combineReducers({
    quiz:QuizReducer
})
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk,logger))