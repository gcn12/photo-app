import * as actions from '../Actions/appActions'

export const initialState = {
    item: 10534
}

export default function pageReducer(state=initialState, action) {
    switch(action.type) {
        case actions.DO_SOMETHING:
            return {...state, item: action.payload}
        default:
            return state
    }
}