import { combineReducers } from 'redux'
import appReducer from './appReducer'
import headerReducer from './headerReducer'
import featuredPostReducer from './featuredPostReducer'

const rootReducer = combineReducers ({
    app: appReducer,
    header: headerReducer,
    featuredPost: featuredPostReducer,
})

export default rootReducer