import { combineReducers } from 'redux'
import appReducer from './appReducer'
import headerReducer from './headerReducer'
import featuredPostReducer from './featuredPostReducer'
import profileReducer from './profileReducer'
import collectionsReducer from './collectionsReducer'

const rootReducer = combineReducers ({
    app: appReducer,
    header: headerReducer,
    featuredPost: featuredPostReducer,
    profile: profileReducer,
    collections: collectionsReducer,
})

export default rootReducer