import TitlePhoto from './TitlePhoto'
import CategoryLocation from './CategoryLocation'
import Preview from './Preview'
import Body from './Body'
import Scroll from './Scroll'
import PostDescription from './PostDescription'
import SelectFont from './SelectFont'
import { db } from '../Firebase'
import firebase from 'firebase'
import UploadProgress from './UploadProgress'
import { connect } from 'react-redux'
import React, { 
    useState 
} from 'react'
import {
    NextButton,
    ButtonContainer,
    UploadProgressContainer,
} from './AddContent.styles'
import { photoInformation } from '../Redux/Actions/appActions'

const animationMap = {
    titlePhoto: {
        initial: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        shiftUp: {
            x: 0,
            y: '1vh',
            opacity: 1,
        }, 
        transitionEnd: {
            x: -100,
            y: '1vh',
            opacity: 0,
        },
        transitionBack: {
            x: 0,
            // y: 10,
            opacity: 1,
        }, 
        transition: {
            opacity: {
                delay: 1,
            },
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    categoryLocation: {
        initial: {
            x: 100,
            y: '20vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionEnd: {
            x: -100,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    createDescription: {
        initial: {
            x: 100,
            y: '20vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionEnd: {
            x: -100,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    body: {
        initial: {
            x: 100,
            y: '20vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        shiftUp: {
            x: 0,
            y: '0',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            opacity: 1,
        },
        transitionEnd: {
            x: -100,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    selectFont: {
        initial: {
            x: 100,
            y: '20vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            y: '20vh',
            opacity: 1,
        },
        transitionEnd: {
            opacity: 0,
            y: '20vh',
            x: -100
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    preview: {
        initial: {
            x: 100,
            y: '10',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: 0,
            opacity: 1,
        },
        transitionBack: {
            x: 0,
            opacity: 1,
        },
        transitionEnd: {
            x: -100,
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    },
    uploadStatus: {
        initial: {
            x: 30,
            y: '50vh',
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: '50vh',
            opacity: 1,
        },
        transitionEnd: {
            opacity: 0
        },
        transition: {
            x: {
                type: 'spring',
                stiffness: 1000,
            }
        }
    }
}


const AddContent = (props) => {
    // const [mainImage, setMainImage] = useState(null)
    // const [mainImageSmall, setMainImageSmall] = useState(null)
    const [titlePhotoProps, setTitlePhotoProps] = useState('initial')
    const [categoryLocationProps, setCategoryLocationProps] = useState('initial')
    const [bodyProps, setBody] = useState('initial')
    const [previewProps, setPreviewProps] = useState('initial')
    const [uploadStatusProps, setUploadStatusProps] = useState('initial')
    const [selectFontProps, setSelectFontProps] = useState('initial')
    const [createDescriptionProps, setCreateDescriptionProps] = useState('initial')
    const [switchValue, setSwitchValue] = useState(1)
    const [bodyContent, setBodyContent] = useState([])
    const [bodyImages, setBodyImages] = useState([])
    const [imageSizeRatio, setImageSizeRatio] = useState({})
    const [uploadCount, setUploadCount] = useState(3)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadProgressColor, setUploadProgressColor] = useState(false)
    const [paragraph, setParagraph] = useState('')
    const [isImageHorizontal, setIsImageHorizontal] = useState(true)
    const [font, setFont] = useState("'Montserrat', sans-serif;")
    const [titlePhotoProceed, setTitlePhotoProceed] = useState(false)
    const [categoryLocationProceed, setCategoryLocationProceed] = useState(false)
    const [bodyProceed, setBodyProceed] = useState(false)
    const [fontProceed, setFontProceed] = useState(true)
    const [isDuplicate, setIsDuplicate] = useState(false)
    const [numberCharacters, setNumberCharacters] = useState(100)
    const [filesSmallest, setFilesSmallest] = useState([])
    const [filesSmall, setFilesSmall] = useState([])
    const [filesLarge, setFilesLarge] = useState([])
    const [fileNames, setFileNames] = useState([])
    const [itemsToUploadData, setItemsToUploadData] = useState({})
    const [filesIndex, setFilesIndex] = useState([])
    const [previewImages, setPreviewImages] = useState({})
    const [previewImageSizeRatio, setPreviewImageSizeRatio] = useState({})

    const submit = (imagesEmptyArraysSmall, imagesEmptyArraysLarge, unsortedImages, imageMap, imageSizeArray, dataObj, filesIndex, postID) => {

        const title = document.getElementById('add-content-title').value
        const location = document.getElementById('autocomplete').value
        const locationArray = location.split(',')
        const country = locationArray[locationArray.length-1].trim()
        const category = document.getElementById('category').value
        const timestamp = Date.now()
        const descriptionArray = []
        const content = document.getElementsByClassName('content-paragraph')

        let titleNoBlankSpace = title.trim()
        let url = titleNoBlankSpace.split(' ')
        url = url.join('-')
        url = url.toLowerCase()
    
        for (let i=0; i<content.length; i++) {
            descriptionArray.push(String(content[i].value))
        }

        let previewDescription
        if (document.getElementById('post-description-input').value.length > 0) {
            previewDescription = document.getElementById('post-description-input').value
        }else{
            let descriptionNoEllipsis = descriptionArray[0].substring(0, 100)
            descriptionNoEllipsis = descriptionNoEllipsis.trim()
            if (descriptionNoEllipsis[descriptionNoEllipsis.length-1] !== '.') {
                descriptionNoEllipsis = descriptionNoEllipsis.slice(0, -3)
                descriptionNoEllipsis = descriptionNoEllipsis.trim()
                if(descriptionNoEllipsis[descriptionNoEllipsis.length-1] !== '.'){
                    descriptionNoEllipsis += '...'
                }
            }
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
                // if(i<imageMapCopy.length) {
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
            urlObjectLarge[filesIndex[i]] = imagesEmptyArraysLarge[i]
            urlObjectSmall[filesIndex[i]] = imagesEmptyArraysSmall[i]
            imageSizeArrayWithIndex[filesIndex[i]] = imageSizeArrayValues[i]
            // urlObjectLarge[i] = imagesEmptyArraysLarge[i]
            // urlObjectSmall[i] = imagesEmptyArraysSmall[i]
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
                    font,
                    profileImage,
                    photoBodyMap: imageSizeArrayWithIndex,
                    // content: descriptionArray,
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
                    locationArray,
                    dataObj,
                    postID,
                    // views: 0, change back later
                    url,
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
                            smallestImage: mainImageSmallest,
                            title,
                            image: mainImage,
                            category,
                            postID,
                            locationArray,
                            location,
                            url,
                            // views: 0,
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
                                'post-names': firebase.firestore.FieldValue.arrayUnion(url)
                            }, {merge: true})
                            setTimeout(()=>setUploadProgressColor(true), 300)
                            setTimeout(()=>props.getFeaturedPhotoInfo(postID), 2000)
                            setTimeout(()=>props.history.push(`/photo-app/post/${postID}`), 2000)
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



                    // const title = document.getElementById('add-content-title').value
                    // let url = title.split(' ')
                    // url = url.join('-')
                    // url = url.toLowerCase()
                    // const random = Math.round(Math.random()*1000000)

                    let photoIndexes = []
                    let fileArray = []
                    const photoUrlArraySortedSmall = []
                    const photoUrlArraySortedLarge = []
                    for (let i = 0; i < filesLarge.length; i++) {
                        fileArray = [...fileArray, ...filesLarge[i]]
                        if(i !== 0){
                            photoUrlArraySortedSmall.push([])
                            photoUrlArraySortedLarge.push([])
                            for(let j = 0; j<filesLarge[i].length; j++) {
                                photoIndexes.push(i-1)
                            }
                        }
                    }
                    for (let i = 0; i < filesLarge.length; i++) {
                        fileArray = [...fileArray, ...filesSmall[i]]
                    }
                    fileArray = [...fileArray, filesSmallest]
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
                            .child(`${props.userInformation.id}/${postID}/${fileNames[indexNum]}${random}`)
                            .putString(file, 'data_url')
                            .then(snapshot => {
                                setUploadProgress(previousUploadProgress => previousUploadProgress + 1)
                                snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    urlArray.push(downloadURL)  
                                    indexNum++ 
                                    index.push(downloadURL) 
                                    if(urlArray.length===fileArray.length) {
                                        submit(photoUrlArraySortedSmall, photoUrlArraySortedLarge, [...urlArray], photoIndexes, imageSizeArray, itemsToUploadData, filesIndex, postID)
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
                previewImageSizeRatioObj[index] = imageSizeRatio[previewImageSizeRatioIndex]
                previewImagesObj[index] = filesSmall[previewImageIndex]
                previewImageIndex++
                previewImageSizeRatioIndex++
                dataObj[index] = ['images', i]
                filesIndexArr.push(index)
                index++
            }
        }
        setPreviewImageSizeRatio(previewImageSizeRatioObj)
        setPreviewImages(previewImagesObj)
        setItemsToUploadData(dataObj)
        setFilesIndex(filesIndexArr)
    }

    const getBodyContent = () => {
        const paragraphs = document.getElementsByClassName('content-paragraph')
        const content = []
        for (let paragraph of paragraphs) {
            content.push(paragraph.value)
        }
        setBodyContent(content)
    }

    const getParagraphSample = () => {
        let paragraphArr = []
        const paragraph = document.getElementById('content-paragraph-original').value
        const splitParagraph = paragraph.split('\n')
        let finalParagraph = splitParagraph[0].slice(0, 400)
        finalParagraph = finalParagraph.trim()
        if(finalParagraph[finalParagraph.length-1]!=='.'){
            finalParagraph += '...'
        }
        paragraphArr.push(finalParagraph)
        setParagraph(paragraphArr)
    }

    const checkTitleDuplicates = () => {
        const title = document.getElementById('add-content-title').value
        // let url = title.replaceAll(' ', '-')
        let url = title.split(' ')
        url = url.join('-')
        url = url.toLowerCase()
        db.collection('users').doc(props.user)
        .collection('post-names')
        .where('post-names', 'array-contains', url)
        .get()
        .then(data=> {
            let dataArray = []
            data.forEach(item=> {
                dataArray.push(item.data())
            })
            if(dataArray.length > 0){
                setIsDuplicate(true)
                setTitlePhotoProceed(false)
            }else{
                setIsDuplicate(false)
                setTitlePhotoProps('transitionEnd')
                setCategoryLocationProps('transitionStart')
                setSwitchValue(2)
            }
        })
    }

    const getBodyImages = () => {
        const images = document.getElementsByClassName('body-photos')
        // let count = 0
        let imagesArray = []
        for (let i = 0; i < images.length; i++) {
            let subArray = []
            for(let j = 0; j<images[i].files.length; j++) {
                // count += 1
                subArray.push(images[i].files[j])
            }
            imagesArray.push(subArray)
        }
        setBodyImages(imagesArray)
    }

    const transitionSwitchNext = () => {
        switch(switchValue) {
            case 1:
                if(titlePhotoProceed) {
                    checkTitleDuplicates()
                }
                break
            case 2:
                if(categoryLocationProceed) {
                    setCategoryLocationProps('transitionEnd')
                    setCreateDescriptionProps('transitionStart')
                    setSwitchValue(3)
                }
                break
            case 3: 
            if (numberCharacters >= 0) {
                setCreateDescriptionProps('transitionEnd')
                setBody('transitionStart')
                setSwitchValue(4)
            }
                break
            case 4:
                if(bodyProceed) {
                    getItemsToUploadData()
                    setBody('transitionEnd')
                    setSelectFontProps('transitionStart')
                    getParagraphSample()
                    setSwitchValue(5)
                }
                break
            case 5:
                setSelectFontProps('transitionEnd')
                setPreviewProps('transitionStart')
                getBodyContent()
                getBodyImages()
                setSwitchValue(6)
                props.dispatch(photoInformation([]))
            break
                case 6: 
                setPreviewProps('transitionEnd')
                fileUpload1(imageSizeRatio)
                setUploadStatusProps('transitionStart')
                setSwitchValue(7)
                break
            default: 
                return null
        }
    }

    const transitionSwitchBack = () => {
        switch(switchValue) {
            case 2:
                setTitlePhotoProps('transitionBack')
                setCategoryLocationProps('initial')
                setSwitchValue(1)
                break
            case 3:
                setCategoryLocationProps('transitionBack')
                setCreateDescriptionProps('initial')
                setSwitchValue(2)
                break
            case 4: 
                setCreateDescriptionProps('transitionBack')
                setBody('initial')
                setSwitchValue(3)
                break
            case 5:
                setBody('transitionBack')
                setSelectFontProps('initial')
                setSwitchValue(4)
                break
            case 6: 
                setSelectFontProps('transitionBack')
                setPreviewProps('initial')
                setSwitchValue(5)
                break
            default: 
                return null
        }
    }


    return(
        <div>
            {/* <button onClick={()=>console.log(filesSmall, filesLarge, fileNames)}>Upload test</button> */}
            <UploadProgressContainer visibility={animationMap.uploadStatus[uploadStatusProps].opacity} animate={uploadStatusProps} variants={animationMap.uploadStatus} initial='initial' transition='transition'>
                <UploadProgress display='initial' uploadProgressColor={uploadProgressColor} uploadCount={uploadCount} uploadProgress={uploadProgress}/>
            </UploadProgressContainer>
            {switchValue === 7 ? 
            null
            :
            <div>
                <NextButton proceed={1} width='130px' onClick={()=>props.history.goBack()}>Back</NextButton>
                <Scroll scrollHeight='90vh' visibility={animationMap.preview[previewProps].opacity}>
                    <Preview previewImageSizeRatio={previewImageSizeRatio} previewImages={previewImages} filesSmall={filesSmall} itemsToUploadData={itemsToUploadData} font={font} isImageHorizontal={isImageHorizontal} imageSizeRatio={imageSizeRatio} bodyImages={bodyImages} bodyContent={bodyContent} filesLarge={filesLarge} previewProps={previewProps} animationMap={animationMap}></Preview>
                </Scroll>
            </div>
            }
            <Scroll scrollHeight='90vh' visibility={animationMap.titlePhoto[titlePhotoProps].opacity}>
                <TitlePhoto setFilesSmallest={setFilesSmallest} fileNames={fileNames} setFileNames={setFileNames}  filesLarge={filesLarge} filesSmall={filesSmall} setFilesLarge={setFilesLarge} setFilesSmall={setFilesSmall} isDuplicate={isDuplicate} setTitlePhotoProceed={setTitlePhotoProceed} setIsImageHorizontal={setIsImageHorizontal} animationMap={animationMap} setTitlePhotoProps={setTitlePhotoProps} titlePhotoProps={titlePhotoProps}/>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.categoryLocation[categoryLocationProps].opacity}>
                <CategoryLocation setCategoryLocationProceed={setCategoryLocationProceed} animationMap={animationMap} categoryLocation={categoryLocationProps}/>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.body[bodyProps].opacity}>
                <Body fileNames={fileNames} setFileNames={setFileNames} filesSmall={filesSmall} filesLarge={filesLarge} setFilesSmall={setFilesSmall} setFilesLarge={setFilesLarge} setBodyProceed={setBodyProceed} imageSizeRatio={imageSizeRatio} setImageSizeRatio={setImageSizeRatio} setBody={setBody} animationMap={animationMap} bodyProps={bodyProps}></Body>
            </Scroll>
            <Scroll scrollHeight='90vh' visibility={animationMap.selectFont[selectFontProps].opacity}>
                <SelectFont setFontProceed={setFontProceed} font={font} setFont={setFont} paragraph={paragraph} animationMap={animationMap} selectFontProps={selectFontProps}/>
            </Scroll>
            

            <Scroll scrollHeight='90vh' visibility={animationMap.createDescription[createDescriptionProps].opacity}>
                <PostDescription setNumberCharacters={setNumberCharacters} animationMap={animationMap} createDescriptionProps={createDescriptionProps} />
            </Scroll>

            {switchValue === 7 ? 
            null
            :
            <ButtonContainer>
                {switchValue === 1 ? 
                null
                :
                <NextButton proceed={1} width='150px' onClick={transitionSwitchBack}>Back</NextButton>
                }
                {(()=> {
                    switch (switchValue) {
                        case 1: 
                            return <NextButton proceed={titlePhotoProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 2: 
                            return <NextButton proceed={categoryLocationProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 3:
                            return <NextButton proceed={numberCharacters >= 0 ? true : false} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 4: 
                            return <NextButton proceed={bodyProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Next</NextButton>
                        case 5: 
                            return <NextButton proceed={fontProceed} width={switchValue === 1 ? '40vw' :'150px'} onClick={transitionSwitchNext}>Preview</NextButton>
                        case 6:
                            return <NextButton proceed={true} width={switchValue === 1 ? '300px' :'150px'} onClick={transitionSwitchNext}>Submit</NextButton>
                        default: 
                            return null
                    }
                })()}
            </ButtonContainer>
            }     
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    userInformation: state.app.userInformation,
})

export default connect(mapStateToProps)(AddContent)