export const IS_MAIN_PHOTO_DISAPLY_VISIBLE = 'IS_MAIN_PHOTO_DISAPLY_VISIBLE'

export function isMainPhotoDisplayVisible(data) {
    return(dispatch) => {
        dispatch({type: IS_MAIN_PHOTO_DISAPLY_VISIBLE, payload: data})
    }
}