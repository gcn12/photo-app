import TitlePhoto from './TitlePhoto'
import CategoryLocation from './CategoryLocation'
import Preview from './Preview'
import Body from './Body'
import { Link } from 'react-router-dom'
import PostDescription from './PostDescription'
import SelectFont from './SelectFont'
import { db } from '../Firebase'
import firebase from 'firebase'
import {
    isVisible,
    isPostVisible,
} from '../Redux/Actions/featuredPostActions'
import UploadProgress from './UploadProgress'
import { connect } from 'react-redux'
import { addEllipsisToText } from '../Functions'
import React, { 
    useState 
} from 'react'
import {
    NextButton,
    ButtonContainer,
    UploadProgressContainer,
    TopButtonContainer,
    CancelButton,
} from './AddContent.styles'
import { 
    titlePhotoStyles,
    categoryLocationStyles,
    bodyStyles,
    previewStyles,
    uploadStatusStyles,
    selectFontStyles,
    createDescriptionStyles,
    switchValue,
    paragraph, 
    titlePhotoProceed,
    isDuplicate,
    itemsToUploadData,
    filesIndex,
    previewImages,
    previewImageSizeRatio,
    resetState,
    isContentEmpty,
    isTitleTooLong,
} from '../Redux/Actions/addContentActions'
import { photoInformation } from '../Redux/Actions/appActions'

const AddContent = (props) => {
    const [uploadCount, setUploadCount] = useState(3)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadFinished, setUploadFinished] = useState(false)

    const submit = (imagesSmall, imagesLarge, dataObj, postID, mainImageSmallest, mainImageSmall, mainImageLarge) => {

        let title = document.getElementById('add-content-title').value.trim()
        const location = document.getElementById('autocomplete').value
        const locationArray = location.split(',')
        const country = locationArray[locationArray.length-1].trim()
        const category = document.getElementById('category').value
        const timestamp = Date.now()
        const descriptionArray = []
        const content = document.getElementsByClassName('content-paragraph')

    
        for (let i=0; i<content.length; i++) {
            descriptionArray.push(String(content[i].value))
        }

        let previewDescription
        if (document.getElementById('post-description-input').value.length > 0) {
            previewDescription = document.getElementById('post-description-input').value
        }else{
            let descriptionNoEllipsis = addEllipsisToText(descriptionArray[0], 100)
            previewDescription = descriptionNoEllipsis
        }

        let profileImage
        if(props.userInformation.profileImage) {
            profileImage = props.userInformation.profileImage
        } else{
            profileImage = null
        }

        let bio
        if(props.userInformation.bio) {
            bio = props.userInformation.bio
        } else{
            profileImage = null
        }

        const imageSizeArrayValues = Object.values(props.imageSizeRatio)
        const imageSizeArrayWithIndex = {}
        for (let i=0; i<Object.values(imagesLarge).length; i++) {
            imageSizeArrayWithIndex[props.filesIndex[i]] = imageSizeArrayValues[i]
        }

        db.collection('users').doc(props.user)
        .get()
        .then(data=> {
            const name = data.data().name
            db.collection('users')
            .doc(props.user)
            .get()
            .then(data=> {
                const username = data.data()['username']
                setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                db.collection('posts').add({
                    bio,
                    font: props.font,
                    profileImage,
                    photoBodyMap: imageSizeArrayWithIndex,
                    imagesLarge,
                    imagesSmall,
                    title,
                    timestamp,
                    previewDescription,
                    smallImage: mainImageSmall,
                    image: mainImageLarge,
                    smallestImage: mainImageSmallest,
                    category,
                    country,
                    name,
                    location,
                    dataObj,
                    postID,
                    username,
                    userID: props.userInformation.id,
                }).then(docRef => {
                    db.collection('posts').doc(docRef.id).set({
                        id: docRef.id,
                    }, {merge: true}) 
                    .then(()=> {
                        const views = Math.round(Math.random()*500)+500
                        const hearts = Math.round(Math.random()*300)+100
                        const ratio = hearts / views
                        setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                        db.collection('preview-posts').add({
                            username,
                            timestamp,
                            country,
                            id: docRef.id,
                            name,
                            previewDescription,
                            smallImage: mainImageSmall,
                            title,
                            image: mainImageLarge,
                            category,
                            postID,
                            location,
                            views,
                            hearts,
                            ratio,
                            userID: props.userInformation.id,
                        })
                        .then(()=>{
                            db.collection('users')
                            .doc(props.user)
                            .collection('post-names')
                            .doc('post-names')
                            .set({
                                'post-names': firebase.firestore.FieldValue.arrayUnion(title)
                            }, {merge: true})
                            props.dispatch(isPostVisible(false))
                            props.dispatch(isVisible(false))
                            setTimeout(()=>setUploadFinished(true), 0)
                            setTimeout(()=>props.getFeaturedPhotoInfo(postID), 2000)
                            setTimeout(()=>props.history.push(`/photo-app/post/${postID}`), 2000)
                            setTimeout(()=>props.dispatch(resetState()), 2500)
                        })
                    })              
                })
            })
        })
    }


    const fileUpload1 = () => {

        const createID = () => {
            let postID = ''
            let alpha1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let alpha2 = 'abcdefghijklmnopqrstuvwxyz'
            let numbers = '123456789'
            let idLength = Math.round(Math.random() * 4) + 6
            while (idLength > 0) {
                let index = Math.floor(Math.random() * 3)
                let character 
                if(index === 0) {
                    character = alpha1[Math.floor(Math.random() * 26)]
                }
                if(index === 1) {
                    character = alpha2[Math.floor(Math.random() * 26)]
                }
                if(index === 2) {
                    character = numbers[Math.floor(Math.random() * 9)]
                }
                postID+=character
                idLength--
            }
            db.collection('preview-posts')
            .where('postID', '==', postID)
            .get()
            .then(data=> {
                const dataArray =  []
                data.forEach(item=> {
                    dataArray.push(item.data())
                })
                if(dataArray.length===0) {
                    let imagesSmall = {}
                    let imagesLarge = {}
                    let mainImageSmallest
                    let mainImageSmall
                    let mainImageLarge
                    let smallFiles = Object.values(props.filesSmall)
                    let largeFiles = Object.values(props.filesLarge)
                    const allFiles = [smallFiles, largeFiles, [props.mainImageSmallest], [props.mainImageSmall], [props.mainImageLarge]]
                    let imageSizeArrayIndex = 0 
                    let imageArrayIndex = 0
                    let imageIndex = 0

                    //get allFiles length
                    let numberOfFiles = 0
                    for (let files of smallFiles) {
                        numberOfFiles += files.length
                    }
                    numberOfFiles *= 2
                    numberOfFiles += 3
                    
                    
                    setUploadCount(uploadCount => uploadCount + numberOfFiles)
                    setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                    const upload = () => {
                            if(imageSizeArrayIndex<allFiles.length) {
                                const random = Math.round(Math.random()*1000000)
                                const file = allFiles[imageSizeArrayIndex][imageArrayIndex][imageIndex]
                                firebase.storage().ref()
                                .child(`${props.userInformation.id}/${postID}/${random}`)
                                .putString(file, 'data_url')
                                .then(snapshot => {
                                    setUploadProgress(previousUploadProgress => previousUploadProgress + 1)
                                    snapshot.ref.getDownloadURL()
                                    .then(downloadURL => {
                                        if(imageSizeArrayIndex===0) {
                                            if(imagesSmall[props.filesIndex[imageArrayIndex]]) {
                                                imagesSmall[props.filesIndex[imageArrayIndex]].push(downloadURL)
                                            }else{
                                                imagesSmall[props.filesIndex[imageArrayIndex]] = [downloadURL]
                                            }
                                        }
                                        if(imageSizeArrayIndex===1) {
                                            if(imagesLarge[props.filesIndex[imageArrayIndex]]) {
                                                imagesLarge[props.filesIndex[imageArrayIndex]].push(downloadURL)
                                            }else{
                                                imagesLarge[props.filesIndex[imageArrayIndex]] = [downloadURL]
                                            }
                                        }
                                        if(imageSizeArrayIndex===2) {
                                            mainImageSmallest = downloadURL
                                        }
                                        if(imageSizeArrayIndex===3) {
                                            mainImageSmall = downloadURL
                                        }
                                        if(imageSizeArrayIndex===4) {
                                            mainImageLarge = downloadURL
                                        } 
                                        if(imageIndex + 1 === allFiles[imageSizeArrayIndex][imageArrayIndex].length) {
                                            imageIndex = 0
                                            if(imageArrayIndex + 1 === allFiles[imageSizeArrayIndex].length){
                                                imageArrayIndex = 0
                                                imageSizeArrayIndex++
                                            }else{
                                                imageArrayIndex++
                                            }
                                        }else{
                                            imageIndex++
                                        }
                                        if(imageSizeArrayIndex === 5) {
                                            submit(imagesSmall, imagesLarge, props.itemsToUploadData, postID, mainImageSmallest, mainImageSmall, mainImageLarge)
                                        }
                                        upload()
                                    })
                                    .catch(error => console.log(error))
                                });
                            }else{
                                return
                            }
                        }
                        if(allFiles[0].length>0) {
                            upload()
                        }else{
                            imageSizeArrayIndex = 2
                            upload() 
                        }
                }else{
                    createID()
                }
            })
        }
        createID()
    }

    const getItemsToUploadData = () => {
        const data = document.getElementsByClassName('item-to-upload')
        let dataObj = {}
        let filesIndexArr = []
        let index = 0
        let previewImageIndex = 0
        let previewImageSizeRatioIndex = 0
        //for preview page
        let previewImagesObj = {}
        let previewImageSizeRatioObj = {}
        for (let i = 0; i<data.length; i++){
            if(data[i].className.includes('add-content-description-input') || data[i].className.includes('content-paragraph')){
                dataObj[index] = ['paragraph', data[i].value]
                index++
            }else if(data[i].className.includes('new-header-input')){
                dataObj[index] = ['header', data[i].value]
                index++
            }else if(data[i].className.includes('image-caption-input')){
                dataObj[index] = ['caption', data[i].value]
                index++
            } else if(data[i].className.includes('body-photos')){
                previewImageSizeRatioObj[index] = props.imageSizeRatio[previewImageSizeRatioIndex]
                previewImagesObj[index] = props.filesSmall[previewImageIndex]
                previewImageIndex++
                previewImageSizeRatioIndex++
                dataObj[index] = ['images', i]
                filesIndexArr.push(index)
                index++
            }
        }
        props.dispatch(previewImageSizeRatio(previewImageSizeRatioObj))
        props.dispatch(previewImages(previewImagesObj))
        props.dispatch(itemsToUploadData(dataObj))
        props.dispatch(filesIndex(filesIndexArr))
    }

    const getParagraphSample = () => {
        let paragraphArr = []
        let finalParagraph
        if(document.getElementsByClassName('add-content-description-input')) {
            if(document.getElementsByClassName('add-content-description-input')[0]) {
                const paragraphSample = document.getElementsByClassName('add-content-description-input')[0].value
                if(paragraphSample.length > 0) {
                    const splitParagraph = paragraphSample.split('\n')
                    finalParagraph = splitParagraph[0].slice(0, 400)
                    finalParagraph = finalParagraph.trim()
                    if(finalParagraph[finalParagraph.length-1]!=='.'){
                        finalParagraph += '...'
                    }
                }
            }
            else{
                finalParagraph = document.getElementById('add-content-title').value
            }
        }else{
            finalParagraph = document.getElementById('add-content-title').value
        }
        paragraphArr.push(finalParagraph)
        props.dispatch(paragraph(paragraphArr))
    }

    const checkTitleDuplicates = () => {
        const title = document.getElementById('add-content-title').value
        db.collection('users').doc(props.user)
        .collection('post-names')
        .where('post-names', 'array-contains', title)
        .get()
        .then(data=> {
            let dataArray = []
            data.forEach(item=> {
                dataArray.push(item.data())
            })
            if(dataArray.length > 0){
                props.dispatch(isDuplicate(true))
                props.dispatch(titlePhotoProceed(false))
            }else if (title.length > 75) {
                props.dispatch(isTitleTooLong(true))
            }else{
                props.dispatch(isTitleTooLong(false))
                props.dispatch(isDuplicate(false))
                props.dispatch(titlePhotoStyles({left: '20%', opacity: 0, display: 'none', visibility: 'hidden'}))
                props.dispatch(categoryLocationStyles({opacity: 1, left: '50%', visibility: 'visible', display: 'initial'}))
                props.dispatch(switchValue(2))
            }
        })
    }

    const checkForEmptyContent = () => {
        let isEmpty = false
        const photos = document.getElementsByClassName('body-photos')
        const paragraphs = document.getElementsByClassName('content-paragraph')
        for (let i = 0; i<photos.length; i++) {
            if(photos[i].files.length===0) {
                isEmpty = true
            }
        }
        for (let i = 0; i<paragraphs.length; i++) {
            if(paragraphs[i].value.length===0) {
                isEmpty = true
            }
        }
        props.dispatch(isContentEmpty(isEmpty))
        if(!isEmpty) {
            getItemsToUploadData()
            props.dispatch(bodyStyles({opacity: 0, visibility: 'hidden', left: '20%', display: 'none',}))
            props.dispatch(selectFontStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
            getParagraphSample()
            props.dispatch(switchValue(5))
        }
    }

    const transitionSwitchNext = () => {
        switch(props.switchValue) {
            case 1:
                if(props.titlePhotoProceed) {
                    checkTitleDuplicates()
                }
                break
            case 2:
                if(props.categoryLocationProceed) {
                    props.dispatch(categoryLocationStyles({opacity: 0, left: '20%', visibility: 'hidden', display: 'none',}))
                    props.dispatch(createDescriptionStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                    props.dispatch(switchValue(3))
                }
                break
            case 3: 
            if (props.numberCharacters >= 0) {
                props.dispatch(createDescriptionStyles({opacity: 0, visibility: 'hidden', left: '20%', display: 'none',}))
                props.dispatch(bodyStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                props.dispatch(switchValue(4))
            }
                break
            case 4:
                if(props.bodyProceed) {
                    checkForEmptyContent()
                }
                break
            case 5:
                props.dispatch(selectFontStyles({opacity: 0, visibility: 'hidden', left: '20%', display: 'none',}))
                props.dispatch(previewStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                props.dispatch(switchValue(6))
                props.dispatch(photoInformation([]))
            break
                case 6: 
                props.dispatch(previewStyles({opacity: 0, visibility: 'hidden', left: '20%', display: 'none',}))
                fileUpload1(props.imageSizeRatio)
                props.dispatch(uploadStatusStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                props.dispatch(switchValue(7))
                break
            default: 
                return null
        }
    }

    const transitionSwitchBack = () => {
        switch(props.switchValue) {
            case 2:
                props.dispatch(titlePhotoStyles({display: 'initial', left: '50%', opacity: 1, visibility: 'visible'}))
                props.dispatch(categoryLocationStyles({opacity: 0, visibility: 'hidden', left: '80%', display: 'none',}))
                props.dispatch(switchValue(1))
                break
            case 3:
                props.dispatch(categoryLocationStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                props.dispatch(createDescriptionStyles({opacity: 0, visibility: 'hidden', left: '80%', display: 'none',}))
                props.dispatch(switchValue(2))
                break
            case 4: 
                props.dispatch(createDescriptionStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                props.dispatch(bodyStyles({opacity: 0, visibility: 'hidden', left: '50%', display: 'none',}))
                props.dispatch(switchValue(3))
                break
            case 5:
                props.dispatch(bodyStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                props.dispatch(selectFontStyles({opacity: 0, visibility: 'hidden', left: '50%', display: 'none',}))
                props.dispatch(switchValue(4))
                break
            case 6: 
                props.dispatch(selectFontStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                props.dispatch(previewStyles({opacity: 0, visibility: 'hidden', left: '50%', display: 'none',}))
                props.dispatch(switchValue(5))
                break
            default: 
                return null
        }
    }


    return(
        <div>
            <UploadProgressContainer styles={props.uploadStatusStyles}>
                <UploadProgress display='initial' uploadFinished={uploadFinished} uploadCount={uploadCount} uploadProgress={uploadProgress}/>
            </UploadProgressContainer>
            {props.switchValue === 7 ? 
            null
            :
                <Preview />
            }
            <TitlePhoto />
            <CategoryLocation styles={props.categoryLocationStyles}/>
            <Body />
            <SelectFont />
            <PostDescription />

            {props.switchValue === 7 ? 
            null
            :
            <div>
                <TopButtonContainer>
                    <Link to='/photo-app/posts/popular/all' onClick={()=>props.dispatch(resetState())}>
                        <CancelButton backgroundColor='#fa4670' proceed={true} width='130px'>Cancel</CancelButton>
                    </Link>
                </TopButtonContainer>
                <ButtonContainer>
                    {props.switchValue === 1 ? 
                    null
                    :
                    <NextButton proceed={1} width='150px' onClick={transitionSwitchBack}>Back</NextButton>
                    }
                    <div onClick={transitionSwitchNext}>
                        {(()=> {
                            switch (props.switchValue) {
                                case 1: 
                                    return <NextButton proceed={props.titlePhotoProceed} width={props.switchValue === 1 ? '40vw' :'150px'}>Next</NextButton>
                                case 2: 
                                    return <NextButton proceed={props.categoryLocationProceed} width={props.switchValue === 1 ? '40vw' :'150px'}>Next</NextButton>
                                case 3:
                                    return <NextButton proceed={props.numberCharacters >= 0 ? true : false} width={props.switchValue === 1 ? '40vw' :'150px'}>Next</NextButton>
                                case 4: 
                                    return <NextButton proceed={props.isAdditionalElements} width={props.switchValue === 1 ? '40vw' :'150px'}>Next</NextButton>
                                case 5: 
                                    return <NextButton proceed={props.fontProceed} width={props.switchValue === 1 ? '40vw' :'150px'}>Preview</NextButton>
                                case 6:
                                    return <NextButton proceed={true} width={props.switchValue === 1 ? '300px' :'150px'}>Submit</NextButton>
                                default: 
                                    return null
                            }
                        })()}
                    </div>
                </ButtonContainer>
            </div>
            }     
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    userInformation: state.app.userInformation,
    titlePhotoStyles: state.addContent.titlePhotoStyles,
    categoryLocationStyles: state.addContent.categoryLocationStyles,
    uploadStatusStyles: state.addContent.uploadStatusStyles,
    switchValue: state.addContent.switchValue,
    font: state.addContent.font,
    titlePhotoProceed: state.addContent.titlePhotoProceed,
    categoryLocationProceed: state.addContent.categoryLocationProceed,
    fontProceed: state.addContent.fontProceed,
    bodyProceed: state.addContent.bodyProceed,
    numberCharacters: state.addContent.numberCharacters,
    mainImageSmallest: state.addContent.mainImageSmallest,
    mainImageSmall: state.addContent.mainImageSmall,
    mainImageLarge: state.addContent.mainImageLarge,
    filesSmall: state.addContent.filesSmall,
    filesLarge: state.addContent.filesLarge,
    fileNames: state.addContent.fileNames,
    itemsToUploadData: state.addContent.itemsToUploadData,
    filesIndex: state.addContent.filesIndex,
    imageSizeRatio: state.addContent.imageSizeRatio,
    isAdditionalElements: state.addContent.isAdditionalElements,
})

export default connect(mapStateToProps)(AddContent)