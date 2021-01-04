export const PROFILE_PAGE = 'PROFILE_PAGE'

export function profilePage(string) {
    return(dispatch) => {
        dispatch({type: PROFILE_PAGE, payload: string})
    }
}