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
    bodyContent,
    bodyImages,
    uploadProgressColor,
    paragraph, 
    titlePhotoProceed,
    isDuplicate,
    itemsToUploadData,
    filesIndex,
    previewImages,
    previewImageSizeRatio,
    resetState,
} from '../Redux/Actions/addContentActions'
import { photoInformation } from '../Redux/Actions/appActions'

const AddContent = (props) => {
    const [uploadCount, setUploadCount] = useState(3)
    const [uploadProgress, setUploadProgress] = useState(0)

    const submit = (imagesEmptyArraysSmall, imagesEmptyArraysLarge, unsortedImages, imageMap, imageSizeArray, dataObj, filesIndex, postID) => {

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
    
        let mainImage
        let mainImageSmall
        let mainImageSmallest = unsortedImages[unsortedImages.length-1]
    
        let unsortedImagesLarge = unsortedImages.slice(0, (unsortedImages.length-1)/2)
        let unsortedImagesSmall = unsortedImages.slice((unsortedImages.length-1) / 2)

        for(let i=0; i<unsortedImagesLarge.length; i++) {
            if(i === 0) {
                mainImage = unsortedImagesLarge[i]
                mainImageSmall = unsortedImagesSmall[i]
            }else{
                if(i<imageMap.length+1) {
                    imagesEmptyArraysLarge[imageMap[i-1]].push(unsortedImagesLarge[i])
                    imagesEmptyArraysSmall[imageMap[i-1]].push(unsortedImagesSmall[i])
                }
            }
        }

        
        const imageSizeArrayValues = Object.values(imageSizeArray)
        const urlObjectLarge = {}
        const urlObjectSmall = {}
        const imageSizeArrayWithIndex = {}
        for (let i=0; i<imagesEmptyArraysLarge.length; i++) {
            urlObjectLarge[props.filesIndex[i]] = imagesEmptyArraysLarge[i]
            urlObjectSmall[props.filesIndex[i]] = imagesEmptyArraysSmall[i]
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
                    imagesLarge: urlObjectLarge,
                    imagesSmall: urlObjectSmall,
                    title,
                    timestamp,
                    previewDescription,
                    smallImage: mainImageSmall,
                    image: mainImage,
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
                            image: mainImage,
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
                            setTimeout(()=>props.dispatch(uploadProgressColor(true), 300))
                            setTimeout(()=>props.getFeaturedPhotoInfo(postID), 2000)
                            setTimeout(()=>props.history.push(`/photo-app/post/${postID}`), 2000)
                            setTimeout(()=>props.dispatch(resetState()), 2500)
                        })
                    })              
                })
            })
        })
    }
    
    const fileUpload1 = (imageSizeArray) => {

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

                    let photoIndexes = []
                    let fileArray = []
                    const photoUrlArraySortedSmall = []
                    const photoUrlArraySortedLarge = []
                    for (let i = 0; i < props.filesLarge.length; i++) {
                        fileArray = [...fileArray, ...props.filesLarge[i]]
                        if(i !== 0){
                            photoUrlArraySortedSmall.push([])
                            photoUrlArraySortedLarge.push([])
                            for(let j = 0; j<props.filesLarge[i].length; j++) {
                                photoIndexes.push(i-1)
                            }
                        }
                    }
                    for (let i = 0; i < props.filesLarge.length; i++) {
                        fileArray = [...fileArray, ...props.filesSmall[i]]
                    }
                    fileArray = [...fileArray, props.filesSmallest]
                    setUploadCount(uploadCount => uploadCount + fileArray.length)
                    const urlArray = []
                    let index = []
                    let indexNum = 0
                    setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                    const upload = () => {
                        if(indexNum<fileArray.length) {
                            const random = Math.round(Math.random()*1000000)
                            const file = fileArray[indexNum]
                            firebase.storage().ref()
                            .child(`${props.userInformation.id}/${postID}/${props.fileNames[indexNum]}${random}`)
                            .putString(file, 'data_url')
                            .then(snapshot => {
                                setUploadProgress(previousUploadProgress => previousUploadProgress + 1)
                                snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    urlArray.push(downloadURL)  
                                    indexNum++ 
                                    index.push(downloadURL) 
                                    if(urlArray.length===fileArray.length) {
                                        submit(photoUrlArraySortedSmall, photoUrlArraySortedLarge, [...urlArray], photoIndexes, imageSizeArray, props.itemsToUploadData, props.filesIndex, postID)
                                    }else{
                                        upload()
                                    }
                                })
                                .catch(error => console.log(error))
                            });
                        }else{
                            return
                        }
                    }
                    upload()
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
        let previewImageIndex = 1
        let previewImageSizeRatioIndex = 0
        let previewImagesObj = {}
        let previewImageSizeRatioObj = {}
        for (let i = 0; i<data.length; i++){
            if(data[i].className.includes('add-content-description-input') || data[i].className.includes('content-paragraph')){
                dataObj[index] = ['paragraph', data[i].value]
                index++
            }
            if(data[i].className.includes('new-header-input')){
                dataObj[index] = ['header', data[i].value]
                index++
            }
            if(data[i].className.includes('image-caption-input')){
                dataObj[index] = ['caption', data[i].value]
                index++
            }
            if(data[i].className.includes('body-photos')){
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

    const getBodyContent = () => {
        const paragraphs = document.getElementsByClassName('content-paragraph')
        const content = []
        for (let paragraph of paragraphs) {
            content.push(paragraph.value)
        }
        props.dispatch(bodyContent(content))
    }

    const getParagraphSample = () => {
        let paragraphArr = []
        const paragraphSample = document.getElementsByClassName('add-content-description-input')[0].value
        const splitParagraph = paragraphSample.split('\n')
        let finalParagraph = splitParagraph[0].slice(0, 400)
        finalParagraph = finalParagraph.trim()
        if(finalParagraph[finalParagraph.length-1]!=='.'){
            finalParagraph += '...'
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
            }else{
                props.dispatch(isDuplicate(false))
                props.dispatch(titlePhotoStyles({left: '20%', opacity: 0, display: 'none', visibility: 'hidden'}))
                props.dispatch(categoryLocationStyles({opacity: 1, left: '50%', visibility: 'visible', display: 'initial'}))
                props.dispatch(switchValue(2))
            }
        })
    }

    const getBodyImages = () => {
        const images = document.getElementsByClassName('body-photos')
        let imagesArray = []
        for (let i = 0; i < images.length; i++) {
            let subArray = []
            for(let j = 0; j<images[i].files.length; j++) {
                subArray.push(images[i].files[j])
            }
            imagesArray.push(subArray)
        }
        props.dispatch(bodyImages(imagesArray))
    }

    const cancelUpload = () => {
        // props.history.goBack()
        props.dispatch(resetState())
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
                    getItemsToUploadData()
                    props.dispatch(bodyStyles({opacity: 0, visibility: 'hidden', left: '20%', display: 'none',}))
                    props.dispatch(selectFontStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                    getParagraphSample()
                    props.dispatch(switchValue(5))
                }
                break
            case 5:
                props.dispatch(selectFontStyles({opacity: 0, visibility: 'hidden', left: '20%', display: 'none',}))
                props.dispatch(previewStyles({opacity: 1, visibility: 'visible', left: '50%', display: 'initial',}))
                getBodyContent()
                getBodyImages()
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
                <UploadProgress display='initial'  uploadCount={uploadCount} uploadProgress={uploadProgress}/>
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
                    <Link to='/photo-app/posts/popular/all' onClick={cancelUpload}>
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
                                    return <NextButton proceed={props.bodyProceed} width={props.switchValue === 1 ? '40vw' :'150px'}>Next</NextButton>
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
    filesSmallest: state.addContent.filesSmallest,
    filesSmall: state.addContent.filesSmall,
    filesLarge: state.addContent.filesLarge,
    fileNames: state.addContent.fileNames,
    itemsToUploadData: state.addContent.itemsToUploadData,
    filesIndex: state.addContent.filesIndex,
    imageSizeRatio: state.addContent.imageSizeRatio,
})

export default connect(mapStateToProps)(AddContent)