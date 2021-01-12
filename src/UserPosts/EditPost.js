import React, { useState, useEffect } from 'react'
import VerticalScroll from '../VeritcalScroll/VerticalScroll'
import firebase from 'firebase'
import { db } from '../Firebase'
import Autocomplete from '../Autocomplete/Autocomplete'
import UploadProgress from '../AddContent/UploadProgress'
import {ReactComponent as Text} from '../Icons/Text.svg'
import {ReactComponent as Image} from '../Icons/Image.svg'
import {ReactComponent as Remove} from '../Icons/Remove.svg'
import { ButtonIconContainer, NewItemButton } from '../AddContent/AddContent.styles'
import { connect } from 'react-redux'
import {
    Container,
    MainImage,
    Title,
    Cancel,
    Container2,
    Submit,
    FontSelect,
    FontOption,
    X,
    RemoveLastElement,
    BodyButtonContainer,
    Paragraphs,
    ImageNew,
    Masonry,
    UploadLabel,
    Label,
    SelectInput,
    PostDescriptionInput,
    TooManyImages,
    HideContent,
    CenterUploadProgress,
    EditHeader,
    EditCaption,
} from './EditPost.styles'

const EditPost = (props) => {

    const [font, setFont] = useState(props?.postData[0]?.font)
    const [isAdditionalElements, setIsAdditionalElements] = useState(false)
    const [isAddImage, setIsAddImage] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const [filesArray, setFilesArray] = useState([])
    const [postData, setPostData] = useState({})
    const [remainingCharacters, setRemainingCharacters] = useState(100)
    const [isTooManyImages, setIsTooManyImages] = useState(false)
    const [uploadCount, setUploadCount] = useState(3)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(true)
    const [showCancel, setShowCancel] = useState(true)
    const [uploadProgressColor, setUploadProgressColor] = useState(false)
    const [uploadStatusProps, setUploadStatusProps] = useState('initial')
    const [imagesIndexMap, setImagesIndexMap] = useState({})
    const [mainImageChangedSmallAndLarge, setMainImageChangedSmallAndLarge] = useState(['', ''])
    const [imagesToUploadSmall, setImagesToUploadSmall] = useState({})
    const [imagesToUploadLarge, setImagesToUploadLarge] = useState({})

    const newImage = () => {
        const filesArrayCopy = [...filesArray]
        filesArrayCopy.push([])
        setFilesArray(filesArrayCopy)
        const copy = {...postData}
        const photoBodyMap = copy.photoBodyMap
        const dataLength = Object.keys(copy.dataObj).length
        copy.dataObj[dataLength] = ['images', dataLength]
        copy.dataObj[dataLength + 1] = ['caption', '']
        copy['photoBodyMap'] = photoBodyMap
        setPostData(copy)
        setShowUpload(true)
        setIsAddImage(true)
    }

    const removeLastElement = () => {
        const copy = {...postData}
        if(isAddImage) {
            setIsTooManyImages(false)
            const filesArrayCopy = [...filesArray]
            filesArrayCopy.pop()
            setFilesArray(filesArrayCopy)
            const photoBodyMap = copy.photoBodyMap
            const mapIndex = Object.keys(photoBodyMap).length
            delete photoBodyMap[mapIndex-1]
            copy['photoBodyMap'] = photoBodyMap
            setPostData({...copy})
            setIsAddImage(false)
            setShowUpload(false)
        }else{
            const content = copy.dataObj
            const dataLength = Object.keys(content).length
            delete content[dataLength - 1]
            delete content[dataLength - 2]
            setPostData({...copy})
            setIsAddImage(true)
            setShowUpload(true)
        }
    }

    const newParagraph = () => {
        const copy = {...postData}
        const length = Object.keys(copy.dataObj).length
        copy.dataObj[length] = ['header', '']
        copy.dataObj[length + 1] = ['paragraph', '']
        setPostData({...copy})
        setShowUpload(false)
        setIsAddImage(false)
    }

    useEffect(()=> {
        setPostData(props?.postData[0])
        setFont(props?.postData[0]?.font)

        if(props?.postData[0]?.previewDescription) {
            const quanityCharacters = 100 - props?.postData[0]?.previewDescription.length 
            setRemainingCharacters(quanityCharacters)
        }
        if(props.postData) {
            if(props.postData[0]){
                if(Object.values(props?.postData[0]?.dataObj)?.length > 0) {
                    setIsAdditionalElements(true)
                }
                const imageQuantity = Object.keys(props?.postData[0]?.imagesSmall).length + 1
                let fileUploadArray = new Array(imageQuantity).fill([])
                setFilesArray(fileUploadArray)
            }
        }
    }, [props?.postData])

    const getFont = () => {
        const fontSelected =  document.getElementById('font-select').value
        setFont(fontSelected)
    }

    const changeMainPhoto = () => {
        const file = document.getElementById('main-image-input').files[0]
        const viewFile = new FileReader()
        viewFile.onload = (e) => {
            const mainImage = document.createElement('img')
            mainImage.src=e.target.result
            mainImage.onload = function () {
                const copy = {...postData}
                copy.smallImage = e.target.result
                setPostData({...copy})

                const height = mainImage.height
                const width = mainImage.width
                let ratio
                let finalHeightLarge
                let finalWidthLarge
                let finalHeightSmall
                let finalWidthSmall
                if (height >= width) {
                    ratio = width / height
                    finalHeightSmall = 850
                    finalHeightLarge = 2000
                    finalWidthLarge = Math.round(ratio * 2000)
                    finalWidthSmall = Math.round(ratio * 850)
                }else {
                    ratio = height / width
                    finalWidthSmall = 850
                    finalWidthLarge = 2000
                    finalHeightSmall = Math.round(ratio * 850)
                    finalHeightLarge = Math.round(ratio * 2000)
                }
                let canvasSmall = document.createElement('canvas'), ctx;
                let canvasLarge = document.createElement('canvas'), ctx2;
                canvasSmall.width = finalWidthSmall;
                canvasSmall.height = finalHeightSmall;
                canvasLarge.width = finalWidthLarge;
                canvasLarge.height = finalHeightLarge;
                ctx = canvasSmall.getContext('2d');
                ctx2 = canvasLarge.getContext('2d');
                ctx.drawImage(mainImage, 0, 0, canvasSmall.width, canvasSmall.height);
                ctx2.drawImage(mainImage, 0, 0, canvasLarge.width, canvasLarge.height);
                const imageSrcSmall = canvasSmall.toDataURL('image/jpeg', 1)
                const imageSrcLarge = canvasLarge.toDataURL('image/jpeg', 1)

                setMainImageChangedSmallAndLarge([imageSrcSmall, imageSrcLarge])
            }
        }
        viewFile.readAsDataURL(file)
    }

    const changeBodyPhotos = (index) => {
        const images = document.getElementById(`edit-body-photos${index}`).files

        const imagesIndexMapCopy = {...imagesIndexMap}
        imagesIndexMapCopy[index] = images
        setImagesIndexMap(imagesIndexMapCopy)

        const filesArrayCopy = [...filesArray]
        filesArrayCopy[Number(index)+1] = images
        setFilesArray(filesArrayCopy)
        let sizeMapArray = []
        if(images.length<4) {
            setIsTooManyImages(false)
            let loopIndex = 0
            let imagesLength = images.length
            const loopProcessImages = () => {
                let filesArraySmall = []
                let filesArrayLarge = []
                let fileNamesArray = []
                const processImages = () => {
                    const file = images[loopIndex];
                    const fileReader  = new FileReader();
                    let percentageArray = []
                    fileReader.onload = function(e)  {
                        const displayImage = document.createElement("img");
                        displayImage.src = e.target.result;
                        displayImage.onload = function () {
                            const fileName = file.name
                            const height = this.height;
                            const width = this.width;
                            sizeMapArray.push(width/height)
                            if(sizeMapArray.length === images.length) {
                                const reducer = (sum, val) => sum + val;
                                let ratioTotal = sizeMapArray.reduce(reducer, 0);
                                for (let image of sizeMapArray) {
                                    percentageArray.push(image/ratioTotal)
                                }
                                const dataCopy = {...postData}
                                dataCopy.photoBodyMap[index] = percentageArray
                            }

                            let ratio
                            let finalHeightLarge
                            let finalWidthLarge
                            let finalHeightSmall
                            let finalWidthSmall
                            if (height >= width) {
                                ratio = width / height
                                finalHeightLarge = 2500
                                finalWidthLarge = Math.round(ratio * 2500)
                                finalHeightSmall = 1200
                                finalWidthSmall = Math.round(ratio * 1200)
                            }else {
                                ratio = height / width
                                finalWidthLarge = 2500
                                finalHeightLarge = Math.round(ratio * 2500)
                                finalWidthSmall = 1200
                                finalHeightSmall = Math.round(ratio * 1200)
                            }
                            let canvasLarge = document.createElement('canvas'), ctx;
                            let canvasSmall = document.createElement('canvas'), ctx2;
                            canvasLarge.width = finalWidthLarge;
                            canvasLarge.height = finalHeightLarge;
                            canvasSmall.width = finalWidthSmall;
                            canvasSmall.height = finalHeightSmall;
                            ctx = canvasLarge.getContext('2d');
                            ctx2 = canvasSmall.getContext('2d');
                            ctx.drawImage(displayImage, 0, 0, canvasLarge.width, canvasLarge.height);
                            ctx2.drawImage(displayImage, 0, 0, canvasSmall.width, canvasSmall.height);
                            const smallImage = document.createElement('img')
                            const imageSrcLarge = canvasLarge.toDataURL('image/jpeg', 1)
                            const imageSrcSmall = canvasSmall.toDataURL('image/jpeg', 1)
                            smallImage.src = imageSrcSmall
                            smallImage.className = `upload-gallery-image`
                            filesArrayLarge.push(imageSrcLarge)
                            filesArraySmall.push(imageSrcSmall)
                            fileNamesArray.push(fileName)

                            loopIndex++
                            if(loopIndex < imagesLength) {
                                processImages()
                            }else{
                                const smallCopy = {...imagesToUploadSmall}
                                const largeCopy = {...imagesToUploadLarge}
                                smallCopy[index] = filesArraySmall
                                largeCopy[index] = filesArrayLarge
                                setImagesToUploadSmall(smallCopy)
                                setImagesToUploadLarge(largeCopy)

                                const dataCopy = {...postData}
                                dataCopy.imagesSmall[index] = filesArraySmall
                                dataCopy.imagesLarge[index] = filesArrayLarge
                                setPostData(dataCopy)
                            }
                        };
                    }
                    fileReader.readAsDataURL(file);
                }
                processImages()
            }
            loopProcessImages()
        }else{
            setIsTooManyImages(true)
        }
        
    }

    const fileUpload = () => {
        setIsUploading(true)
        setShowCancel(false)
        // filesArray.forEach(files=> {
        //     if(files?.length > 0) {
        //         setUploadCount(uploadCount => uploadCount + files.length)
        //     }
        // })
        setTimeout(()=>setUploadStatusProps('transitionStart'), 400)
        setTimeout(()=>setUploadProgress(previousUploadProgress=> previousUploadProgress + 1), 200)
        upload2()
    }

    const upload2 = () => {
        let imagesSmallQuantity = 0
        let imagesIndexMapValues = []
        if(mainImageChangedSmallAndLarge[0].length > 0) {
            imagesIndexMapValues.push(mainImageChangedSmallAndLarge[0])
        }
        if(Object.values(imagesToUploadSmall).length > 0){
            let allSmallFiles = []
            for (let item of Object.values(imagesToUploadSmall)){
                allSmallFiles = [...allSmallFiles, ...item]
            }
            imagesSmallQuantity = allSmallFiles.length
            imagesIndexMapValues = [...imagesIndexMapValues, ...allSmallFiles]
        }
        if(mainImageChangedSmallAndLarge[1].length > 0) {
            imagesIndexMapValues.push(mainImageChangedSmallAndLarge[1])
        }
        if(Object.values(imagesToUploadLarge).length > 0){
            let allLargeFiles = []
            for (let item of Object.values(imagesToUploadLarge)){
                allLargeFiles = [...allLargeFiles, ...item]
            }
            imagesIndexMapValues = [...imagesIndexMapValues, ...allLargeFiles]
        }
        setUploadCount(uploadCount => uploadCount + imagesIndexMapValues.length)
        // setUploadProgress(previousUploadProgress=> previousUploadProgress + imagesIndexMapValues.length)

        let index = 0
        let finalArray = []
        const upload = () => {
            if(index < imagesIndexMapValues.length){
                const random = Math.round(Math.random()*1000000)
                const storageRef = firebase.storage().ref()
                const picRef = storageRef.child(`${props.userInformation.id}/${postData.url}/${imagesIndexMapValues[index].name}${random}`)
                const file = imagesIndexMapValues[index]
                setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                picRef.putString(file, 'data_url')
                .then((snapshot)=> {
                    snapshot.ref.getDownloadURL()
                    .then((url)=> {
                        finalArray.push(url)
                        if(index === imagesIndexMapValues.length - 1){
                            submit(finalArray, imagesSmallQuantity)
                        }else{
                            index++
                            upload()
                        }
                    })
                })
            }
        }
        if(imagesIndexMapValues.length > 0) {
            upload()
        }else{ 
            submit(finalArray, imagesSmallQuantity)
        }
    }

    const submit = (images, imagesSmallQuantity) => {
        let mainImageLarge
        let mainImageSmall
        const imageMapKeys = Object.keys(imagesToUploadSmall)
        const imageMapValues = Object.values(imagesToUploadSmall)
        const imagesSmall = images.slice(0, images.length / 2)
        const imagesLarge = images.slice(images.length / 2)
        let imagesSmallObj = {}
        let imagesLargeObj = {}
        if (imagesSmall.length > imagesSmallQuantity) {
            mainImageLarge = imagesLarge[0]
            mainImageSmall = imagesSmall[0]
            imagesSmall.shift()
            imagesLarge.shift()
        }
        let index = 0
        let j = 0
        for (let i = 0; i<imagesSmall.length; i++) {
            if(imagesSmallObj[imageMapKeys[index]]) {
                imagesSmallObj[imageMapKeys[index]] = [...imagesSmallObj[imageMapKeys[index]], imagesSmall[i]]
                imagesLargeObj[imageMapKeys[index]] = [...imagesLargeObj[imageMapKeys[index]], imagesLarge[i]]
                if(imageMapValues[index].length === j) {
                    index++
                    j = 0
                }else{
                    j++
                }
            }else{
                imagesSmallObj[imageMapKeys[index]] = [imagesSmall[i]]
                imagesLargeObj[imageMapKeys[index]] = [imagesLarge[i]]
                if(imageMapValues[index].length === j) {
                    index++
                    j = 0
                }else{
                    j++
                }
            }
        }


        const title = document.getElementById('edit-post-title').value
        let previewDescription 
        const location = document.getElementById('autocomplete').value
        let country 
        let city

        let previewDescriptionNoEllipsis = document.getElementById('edit-post-description').value
        if(previewDescriptionNoEllipsis[previewDescriptionNoEllipsis.length-1]!== '.') {
            previewDescriptionNoEllipsis += '...'
        }
        previewDescription = previewDescriptionNoEllipsis
        
        const category = document.getElementById('category').value
        const descriptionArray = []
        const content = document.getElementsByClassName('content-paragraph')
        for (let i=0; i<content.length; i++) {
            descriptionArray.push(String(content[i].value))
        }

        const fullPostUpdate = {}
        const previewPostUpdate = {}

        
        // const postDataValues = Object.values(postData.dataObj)
        // const originalDataValues = Object.values(props.postData[0].dataObj)
        // console.log(postDataValues)
        // console.log(originalDataValues)
        // if (postDataValues.length !== originalDataValues.length) {
        //     fullPostUpdate['dataObj'] = postData.dataObj
        // }else{
        //     originalDataValues.forEach((item, index) => {
        //         if (item[1] !== postDataValues[index][1]) {
        //             fullPostUpdate['dataObj'] = postData.dataObj
        //         }
        //     })
        // }
        // console.log(fullPostUpdate)
        fullPostUpdate['dataObj'] = postData.dataObj
        if(Object.keys(imagesSmallObj)?.length > 0) {
            const imagesFinalSmall = {...postData.imagesSmall, ...imagesSmallObj}
            const imagesFinalLarge = {...postData.imagesLarge, ...imagesLargeObj}
            fullPostUpdate['imagesSmall'] = imagesFinalSmall
            fullPostUpdate['imagesLarge'] = imagesFinalLarge
            fullPostUpdate['photoBodyMap'] = postData.photoBodyMap
        }
        if(location.length > 2 && location !== postData.location) {
            const splitLocation = location.split(',')
            country = splitLocation[splitLocation.length-1].trim()
            city = splitLocation[0].trim()
            fullPostUpdate['country'] = country
            fullPostUpdate['city'] = city
            fullPostUpdate['location'] = location
        }
        if (previewDescription !== postData.previewDescription) {
            fullPostUpdate['previewDescription'] = previewDescription
            previewPostUpdate['previewDescription'] = previewDescription
        }
        if(mainImageLarge!==postData.image) {
            if(mainImageSmall){
                fullPostUpdate['smallImage'] = mainImageSmall
                previewPostUpdate['smallImage'] = mainImageSmall
                fullPostUpdate['image'] = mainImageLarge
                previewPostUpdate['image'] = mainImageLarge
            }
        }
        if (title !== postData.title && title.length > 0) {
            fullPostUpdate['title'] = title
            previewPostUpdate['title'] = title
        }

        if (category !== postData.category && category.length > 0) {
            fullPostUpdate['category'] = category
            previewPostUpdate['category'] = category
        }

        if (font !== postData.font) {
            fullPostUpdate['font'] = font
        }

        db.collection('posts')
        .where('username', '==', postData.username)
        .where('url', '==', postData.url)
        .get()
        .then(data=> {
            setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
            let postRef = data.docs[0].id
            db.collection('posts')
            .doc(postRef)
            .update({
                ...fullPostUpdate
            }).then(()=> {
                db.collection('preview-posts')
                .where('username', '==', postData.username)
                .where('url', '==', postData.url)
                .get()
                .then(data=> {
                    setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                    let previewPostRef = data.docs[0].id
                    db.collection('preview-posts')
                    .doc(previewPostRef)
                    .update({
                        ...previewPostUpdate
                    })
                    .then(()=>{
                        props.getPosts(props.userInformation.id)
                        console.log('uploaded')
                        setUploadProgressColor(true)
                        setTimeout(()=>props.closeEdit(), 1200)
                    })
                })
            })              
        })
    }

    const calculateRemainingCharacters = () => {
        const characters = document.getElementById('edit-post-description').value
        const characterQuantity = 100 - characters.length
        setRemainingCharacters(characterQuantity)
    }

    const animationMap = {
        uploadStatus: {
            initial: {
                x: 0,
                y: 50,
                opacity: 0,
            },
            transitionStart: {
                x: 0,
                y: 50,
                opacity: 1,
            }
        }
    }

    return(
        <div style={{position: 'relative'}}>
            <CenterUploadProgress>
                <UploadProgress uploadProgressColor={uploadProgressColor} animate={uploadStatusProps} variants={animationMap.uploadStatus} uploadCount={uploadCount} uploadProgress={uploadProgress} />
            </CenterUploadProgress>
            <Container height={isUploading ? '50vh' : '97vh'} width={isUploading ? '50vw' : '90vw'} opacity={1}>
                {/* <button onClick={()=> console.log(postData)}>Log</button> */}
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <X visibility={showCancel ? 'visible' : 'hidden'} display={showCancel ? 'initial' : 'none'} onClick={props.closeEdit}>&times;</X>
                    </div>
                    <VerticalScroll height='10vh'>
                <HideContent visibility={isUploading ? 'hidden' : 'visible'} display={isUploading ? 'none' : 'initial'}>
                        <div>
                            <Container2>
                                <div id='edit-area'>
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <Title autoComplete='off' placeholder='title' id='edit-post-title' font={font} onChange={null} defaultValue={props?.postData[0]?.title}></Title>
                                        <MainImage onLoad={()=>setIsUploading(false)} src={postData?.smallImage}></MainImage>
                                        <label htmlFor='main-image-input' className='upload-button-label'>Change main image</label>
                                        <input onChange={changeMainPhoto} hidden id='main-image-input' type='file'></input>
                                    </div>
                                </div>


                                {postData?.dataObj ? 
                                Object.keys(postData?.dataObj).map((item, index)=> {
                                    return(
                                        <div key={index}>
                                            {postData.dataObj[item][0] === 'paragraph' ? 
                                            <Paragraphs onChange={(e)=>setPostData({...postData, dataObj: {...postData.dataObj, [index]: ['paragraph', e.target.value]}})} className='content-paragraph' font={font} defaultValue={postData.dataObj[item][1]}></Paragraphs>
                                            :
                                            null
                                            }
                                            {postData.dataObj[item][0] === 'caption' ? 
                                            <EditCaption onChange={(e)=> setPostData({...postData, dataObj: {...postData.dataObj, [index]: ['caption', e.target.value]}})} placeholder='caption (optional)' className='content-paragraph' font={font} defaultValue={postData.dataObj[item][1]}></EditCaption>
                                            :
                                            null
                                            }
                                            {postData.dataObj[item][0] === 'header' ? 
                                            <EditHeader onChange={(e)=> setPostData({...postData, dataObj: {...postData.dataObj, [index]: ['header', e.target.value]}})} placeholder='paragraph header (optional)' className='content-paragraph' font={font} defaultValue={postData.dataObj[item][1]}></EditHeader>
                                            :
                                            null
                                            }
                                            {postData.dataObj[item][0] === 'images' ? 
                                            <div>
                                                <Masonry>
                                                {postData?.imagesSmall[item]?.map((image, i)=> {
                                                    return(
                                                        <ImageNew key={i} src={image}></ImageNew>
                                                        )
                                                    })}
                                                </Masonry>
                                                {postData?.imagesSmall[item] || showUpload || postData.content.length > index + 1 ? 
                                                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                    <UploadLabel htmlFor={`edit-body-photos${item}`}>Select photos (max. 3)</UploadLabel>
                                                    <input multiple id={`edit-body-photos${item}`} onChange={()=> changeBodyPhotos(item)} hidden  type='file'></input>
                                                    {isTooManyImages ? 
                                                    <TooManyImages>Exceeded image limit of three</TooManyImages>
                                                    :
                                                    null
                                                    }
                                                </div>    
                                                :
                                                null
                                                }
                                            </div>
                                            :
                                            null
                                            }
                                        </div>
                                    )
                                })
                                :
                                null
                                }

                                <BodyButtonContainer id='add-content-body-buttons'>
                                    {isAdditionalElements ? 
                                    <RemoveLastElement type="button" onClick={removeLastElement}>
                                        {/* {`Remove last ${isAddImage ? 'image' : 'text block'}`} */}
                                        <ButtonIconContainer>
                                            <Remove />
                                        </ButtonIconContainer>
                                    </RemoveLastElement>
                                    :
                                    null
                                    }

                                    <NewItemButton long={!isAdditionalElements} type="button" onClick={newParagraph}>
                                        {/* Add paragraph */}
                                        <ButtonIconContainer>
                                            <Text />
                                        </ButtonIconContainer>
                                    </NewItemButton>

                                    <NewItemButton border='1px solid white' long={!isAdditionalElements} type="button" onClick={newImage}>
                                        {/* Add image */}
                                        <ButtonIconContainer>
                                            <Image />
                                        </ButtonIconContainer>
                                    </NewItemButton>

                                </BodyButtonContainer>
                                <Label>Post description</Label>
                                <PostDescriptionInput defaultValue={props?.postData[0]?.previewDescription} font={font} onChange={calculateRemainingCharacters} id='edit-post-description'></PostDescriptionInput>
                                <div style={{marginBottom: '15px'}}>Remaining characters: {remainingCharacters}</div>
                                <Label>Font:</Label>
                                <FontSelect onChange={getFont} value={font} id='font-select'>
                                    <FontOption value="'Montserrat', sans-serif;" font="'Montserrat', sans-serif;">Montserrat</FontOption>
                                    <FontOption value="'Work Sans', sans-serif;" font="'Work Sans', sans-serif;">Work Sans</FontOption>
                                    <FontOption value="'Heebo', sans-serif;" font="'Heebo', sans-serif;">Heebo</FontOption>
                                    <FontOption value="'Roboto', sans-serif;" font="'Roboto', sans-serif;">Roboto</FontOption>
                                    <FontOption value="'Raleway', sans-serif;" font="'Raleway', sans-serif;">Raleway</FontOption>
                                    <FontOption value="'Poppins', sans-serif;" font="'Poppins', sans-serif;">Poppins</FontOption>
                                </FontSelect>
                                <Label htmlFor='category'>Category:</Label>
                                <SelectInput onChange={null} defaultValue={props?.postData[0]?.category} name='category' id='category'>
                                    <option value='restaurant'>Restaurant</option>
                                    <option value='entertainment'>Entertainment</option>
                                    <option value='adventure'>Adventure</option>
                                    <option value='sightseeing'>Sightseeing</option>
                                    <option value='shopping'>Shopping</option>
                                    <option value='museum'>Museum</option>
                                </SelectInput>
                                <Label>Location:</Label>
                                <Autocomplete defaultValue={props?.postData[0]?.location} id='autocomplete-component'/>
                                <div style={{marginBottom: '20px'}}></div>
                                <div style={{display: 'flex'}}>
                                    <Cancel onClick={props.closeEdit}>Cancel</Cancel>
                                    <Submit onClick={fileUpload}>Submit</Submit>
                                </div>
                            </Container2>
                        </div>
                </HideContent>
                    </VerticalScroll>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    userInformation: state.app.userInformation,
})

export default connect(mapStateToProps)(EditPost)