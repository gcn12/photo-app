import * as actions from '../Actions/profileActions'

export const initialState = {
    profilePage: '',
}

export default function profileReducer(state=initialState, action) {
    switch(action.type) {
        case actions.PROFILE_PAGE:
            return {...state, profilePage: action.payload}
        default:
            return state
    }
}