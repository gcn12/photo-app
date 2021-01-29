import * as actions from '../Actions/addContentActions'

const startValues = {opacity: 0, display: 'none', left: '90%', visibility: 'hidden'}

export const initialState = {
    titlePhotoStyles: {opacity: 1, display: 'initial', left: '50%', visibility: 'visible'},
    categoryLocationStyles: startValues,
    bodyStyles: startValues,
    previewStyles: startValues,
    uploadStatusStyles: startValues,
    selectFontStyles: startValues,
    createDescriptionStyles: startValues,
    switchValue: 1,
    imageSizeRatio: {},
    paragraph: '',
    font: "'Montserrat', sans-serif;",
    titlePhotoProceed: false,
    categoryLocationProceed: false,
    fontProceed: true,
    bodyProceed: false,
    isDuplicate: false,
    numberCharacters: 100,
    mainImageSmallest: [],
    mainImageSmall: [],
    mainImageLarge: [],
    filesSmall: [],
    filesLarge: [],
    fileNames: [],
    itemsToUploadData: {},
    filesIndex: [],
    previewImages: {},
    previewImageSizeRatio: {},
    isContentEmpty: false,
    isAdditionalElements: false,
    isTitleTooLong: false,
}

export default function addContentReducer(state=initialState, action) {
    switch(action.type) {
        case actions.IS_TITLE_TOO_LONG:
            return {...state, isTitleTooLong: action.payload}
        case actions.IS_ADDITIONAL_ELEMENTS:
            return {...state, isAdditionalElements: action.payload}
        case actions.RESET_STATE:
            return initialState
        case actions.IS_CONTENT_EMPTY:
            return {...state, isContentEmpty: action.payload}
        case actions.PREVIEW_IMAGE_SIZE_RATIO:
            return {...state, previewImageSizeRatio: action.payload}
        case actions.PREVIEW_IMAGES:
            return {...state, previewImages: action.payload}
        case actions.FILES_INDEX:
            return {...state, filesIndex: action.payload}
        case actions.ITEMS_TO_UPLOAD_DATA:
            return {...state, itemsToUploadData: action.payload}
        case actions.FILE_NAMES:
            return {...state, fileNames: action.payload}
        case actions.FILES_LARGE:
            return {...state, filesLarge: action.payload}
        case actions.FILES_SMALL:
            return {...state, filesSmall: action.payload}
        case actions.MAIN_IMAGE_SMALLEST:
            return {...state, mainImageSmallest: action.payload}
        case actions.MAIN_IMAGE_SMALL:
            return {...state, mainImageSmall: action.payload}
        case actions.MAIN_IMAGE_LARGE:
            return {...state, mainImageLarge: action.payload}
        case actions.NUMBER_CHARACTERS:
            return {...state, numberCharacters: action.payload}
        case actions.IS_DUPLICATE:
            return {...state, isDuplicate: action.payload}
        case actions.BODY_PROCEED:
            return {...state, bodyProceed: action.payload}
        case actions.FONT_PROCEED:
            return {...state, fontProceed: action.payload}
        case actions.CATEGORY_LOCATION_PROCEED:
            return {...state, categoryLocationProceed: action.payload}
        case actions.TITLE_PHOTO_PROCEED:
            return {...state, titlePhotoProceed: action.payload}
        case actions.FONT:
            return {...state, font: action.payload}
        case actions.PARAGRAPH:
            return {...state, paragraph: action.payload}
        case actions.IMAGE_SIZE_RATIO:
            return {...state, imageSizeRatio: action.payload}
        case actions.SWITCH_VALUE:
            return {...state, switchValue: action.payload}
        case actions.CREATE_DESCRIPTION_STYLES:
            return {...state, createDescriptionStyles: action.payload}
        case actions.SELECT_FONT_STYLES:
            return {...state, selectFontStyles: action.payload}
        case actions.UPLOAD_STATUS_STYLES:
            return {...state, uploadStatusStyles: action.payload}
        case actions.PREVIEW_STYLES:
            return {...state, previewStyles: action.payload}
        case actions.BODY_STYLES:
            return {...state, bodyStyles: action.payload}
        case actions.CATEGORY_LOCATION_STYLES:
            return {...state, categoryLocationStyles: action.payload}
        case actions.TITLE_PHOTO_STYLES:
            return {...state, titlePhotoStyles: action.payload}
        default:
            return state
    }
}