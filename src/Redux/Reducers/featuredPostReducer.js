import * as actions from '../Actions/featuredPostActions'

export const initialState = {
    collectionsList: [],
}

export default function featuredPostReducer(state=initialState, action) {
    switch(action.type) {
        case actions.COLLECTIONS_LIST:
            return {...state, collectionsList: action.payload}
        default: 
            return state
    }
}