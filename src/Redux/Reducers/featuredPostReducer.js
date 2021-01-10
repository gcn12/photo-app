import * as actions from '../Actions/featuredPostActions'

export const initialState = {
    collectionsList: [],
    isVisible: false,
}

export default function featuredPostReducer(state=initialState, action) {
    switch(action.type) {
        case actions.IS_VISIBLE:
            return {...state, isVisible: action.payload}
        case actions.COLLECTIONS_LIST:
            return {...state, collectionsList: action.payload}
        default: 
            return state
    }
}