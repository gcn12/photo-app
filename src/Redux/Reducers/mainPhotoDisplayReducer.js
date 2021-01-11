import * as actions from '../Actions/mainPhotoDisplayActions'

export const initialState = {
    isMainPhotoDisplayVisible: [],
}

export default function mainPhotoDisplayReducer(state=initialState, action) {
    switch(action.type) {
        case actions.IS_MAIN_PHOTO_DISAPLY_VISIBLE:
            return {...state, isMainPhotoDisplayVisible: action.payload}
        default: 
            return state
    }
}