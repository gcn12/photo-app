export const TITLE_PHOTO_STYLES = 'TITLE_PHOTO_STYLES'
export const CATEGORY_LOCATION_STYLES = 'CATEGORY_LOCATION_STYLES'
export const BODY_STYLES = 'BODY_STYLES'
export const PREVIEW_STYLES = 'PREVIEW_STYLES'
export const UPLOAD_STATUS_STYLES = 'UPLOAD_STATUS_STYLES'
export const  SELECT_FONT_STYLES = 'SELECT_FONT_STYLES'
export const CREATE_DESCRIPTION_STYLES = 'CREATE_DESCRIPTION_STYLES'
export const SWITCH_VALUE = 'SWITCH_VALUE'
export const IMAGE_SIZE_RATIO = 'IMAGE_SIZE_RATIO'
export const PARAGRAPH = 'PARAGRAPH'
export const FONT = 'FONT'
export const TITLE_PHOTO_PROCEED = 'TITLE_PHOTO_PROCEED'
export const CATEGORY_LOCATION_PROCEED = 'CATEGORY_LOCATION_PROCEED'
export const BODY_PROCEED = 'BODY_PROCEED'
export const FONT_PROCEED = 'FONT_PROCEED'
export const IS_DUPLICATE = 'IS_DUPLICATE'
export const NUMBER_CHARACTERS = 'NUMBER_CHARACTERS'
export const MAIN_IMAGE_SMALLEST = 'MAIN_IMAGE_SMALLEST'
export const MAIN_IMAGE_SMALL = 'MAIN_IMAGE_SMALL'
export const MAIN_IMAGE_LARGE = 'MAIN_IMAGE_LARGE'
export const FILES_SMALL = 'FILES_SMALL'
export const FILES_LARGE = 'FILES_LARGE'
export const FILE_NAMES = 'FILES_NAMES'
export const ITEMS_TO_UPLOAD_DATA = 'ITEMS_TO_UPLOAD_DATA'
export const FILES_INDEX = 'FILES_INDEX'
export const PREVIEW_IMAGES = 'PREVIEW_IMAGES'
export const PREVIEW_IMAGE_SIZE_RATIO = 'PREVIEW_IMAGE_SIZE_RATIO'
export const RESET_STATE = 'RESET_STATE'
export const IS_CONTENT_EMPTY = 'IS_CONTENT_EMPTY'
export const IS_ADDITIONAL_ELEMENTS = 'IS_ADDITIONAL_ELEMENTS'
export const IS_TITLE_TOO_LONG = 'IS_TITLE_TOO_LONG'

export function isTitleTooLong(data) {
    return(dispatch) => {
        dispatch({type: IS_TITLE_TOO_LONG, payload: data})
    }
}

export function isAdditionalElements(data) {
    return(dispatch) => {
        dispatch({type: IS_ADDITIONAL_ELEMENTS, payload: data})
    }
}

export function isContentEmpty(data) {
    return(dispatch) => {
        dispatch({type: IS_CONTENT_EMPTY, payload: data})
    }
}

export function resetState() {
    return(dispatch) => {
        dispatch({type: RESET_STATE})
    }
}

export function previewImageSizeRatio(data) {
    return(dispatch) => {
        dispatch({type: PREVIEW_IMAGE_SIZE_RATIO, payload: data})
    }
}

export function previewImages(data) {
    return(dispatch) => {
        dispatch({type: PREVIEW_IMAGES, payload: data})
    }
}

export function filesIndex(data) {
    return(dispatch) => {
        dispatch({type: FILES_INDEX, payload: data})
    }
}

export function itemsToUploadData(data) {
    return(dispatch) => {
        dispatch({type: ITEMS_TO_UPLOAD_DATA, payload: data})
    }
}

export function fileNames(data) {
    return(dispatch) => {
        dispatch({type: FILE_NAMES, payload: data})
    }
}

export function filesLarge(data) {
    return(dispatch) => {
        dispatch({type: FILES_LARGE, payload: data})
    }
}

export function filesSmall(data) {
    return(dispatch) => {
        dispatch({type: FILES_SMALL, payload: data})
    }
}

export function mainImageSmall(data) {
    return(dispatch) => {
        dispatch({type: MAIN_IMAGE_SMALL, payload: data})
    }
}

export function mainImageSmallest(data) {
    return(dispatch) => {
        dispatch({type: MAIN_IMAGE_SMALLEST, payload: data})
    }
}

export function mainImageLarge(data) {
    return(dispatch) => {
        dispatch({type: MAIN_IMAGE_LARGE, payload: data})
    }
}

export function numberCharacters(data) {
    return(dispatch) => {
        dispatch({type: NUMBER_CHARACTERS, payload: data})
    }
}

export function isDuplicate(data) {
    return(dispatch) => {
        dispatch({type: IS_DUPLICATE, payload: data})
    }
}

export function fontProceed(data) {
    return(dispatch) => {
        dispatch({type: FONT_PROCEED, payload: data})
    }
}

export function bodyProceed(data) {
    return(dispatch) => {
        dispatch({type: BODY_PROCEED, payload: data})
    }
}

export function categoryLocationProceed(data) {
    return(dispatch) => {
        dispatch({type: CATEGORY_LOCATION_PROCEED, payload: data})
    }
}

export function titlePhotoProceed(data) {
    return(dispatch) => {
        dispatch({type: TITLE_PHOTO_PROCEED, payload: data})
    }
}

export function font(data) {
    return(dispatch) => {
        dispatch({type: FONT, payload: data})
    }
}

export function paragraph(data) {
    return(dispatch) => {
        dispatch({type: PARAGRAPH, payload: data})
    }
}

export function imageSizeRatio(data) {
    return(dispatch) => {
        dispatch({type: IMAGE_SIZE_RATIO, payload: data})
    }
}

export function switchValue(data) {
    return(dispatch) => {
        dispatch({type: SWITCH_VALUE, payload: data})
    }
}

export function createDescriptionStyles(data) {
    return(dispatch) => {
        dispatch({type: CREATE_DESCRIPTION_STYLES, payload: data})
    }
}

export function selectFontStyles(data) {
    return(dispatch) => {
        dispatch({type: SELECT_FONT_STYLES, payload: data})
    }
}

export function uploadStatusStyles(data) {
    return(dispatch) => {
        dispatch({type: UPLOAD_STATUS_STYLES, payload: data})
    }
}

export function previewStyles(data) {
    return(dispatch) => {
        dispatch({type: PREVIEW_STYLES, payload: data})
    }
}

export function bodyStyles(data) {
    return(dispatch) => {
        dispatch({type: BODY_STYLES, payload: data})
    }
}

export function categoryLocationStyles(data) {
    return(dispatch) => {
        dispatch({type: CATEGORY_LOCATION_STYLES, payload: data})
    }
}

export function titlePhotoStyles(data) {
    return(dispatch) => {
        dispatch({type: TITLE_PHOTO_STYLES, payload: data})
    }
}