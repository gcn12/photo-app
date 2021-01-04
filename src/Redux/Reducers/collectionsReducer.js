import * as actions from '../Actions/collectionsActions'

export const initialState = {
    collectionsData: [],
}

export default function collectionsReducer(state=initialState, action) {
    switch(action.type) {
        case actions.COLLECTIONS_DATA:
            return {...state, collectionsData: action.payload}
        default: 
            return state
    }
}