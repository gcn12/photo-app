import React, { useState, useEffect } from 'react'
import VerticalScroll from '../VeritcalScroll/VerticalScroll'
import firebase from 'firebase'
import { db } from '../Firebase'
import Autocomplete from '../Autocomplete/Autocomplete'
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
    NewItemButton,
    RemoveLastElement,
    BodyButtonContainer,
    Paragraphs,
    ImageNew,
    ContentContainer,
    Masonry,
    UploadLabel,
    Label,
    PhotoAndButtonContainer,
    SelectInput,
    PostDescriptionInput,
    TooManyImages,
} from './EditPost.styles'

const EditPost = (props) => {

    const [font, setFont] = useState(props?.postData[0]?.font)
    const [isAdditionalElements, setIsAdditionalElements] = useState(false)
    const [isAddImage, setIsAddImage] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    const [imagesToUpload, setImagesToUpload] = useState([])
    const [filesArray, setFilesArray] = useState([])
    const [postData, setPostData] = useState({})
    const [remainingCharacters, setRemainingCharacters] = useState(150)
    const [isTooManyImages, setIsTooManyImages] = useState(false)

    const newImage = () => {
        const filesArrayCopy = filesArray
        filesArrayCopy.push([])
        setFilesArray(filesArrayCopy)
        const copy = postData
        const photoBodyMap = postData.photoBodyMap
        const images = postData.images
        const index = Object.keys(photoBodyMap).length
        images[index] = []
        photoBodyMap[index] = []
        copy['images'] = images
        copy['photoBodyMap'] = photoBodyMap
        // const length = Object.keys(postData.images).length
        // copy.images[length+1] = []
        // console.log(copy)
        const imagesToUploadCopy = imagesToUpload 
        imagesToUploadCopy.push(false)
        setImagesToUpload([...imagesToUploadCopy])
        setPostData(copy)
        setShowUpload(true)
        setIsAddImage(true)
    }

    const removeLastElement = () => {
        const copy = postData
        if(isAddImage) {
            setIsTooManyImages(false)
            const filesArrayCopy = filesArray
            filesArrayCopy.pop()
            setFilesArray(filesArrayCopy)
            // const imageSizeRatioCopy = props.imageSizeRatio
            // delete imageSizeRatioCopy[numberInputs-1]
            // setImageSizeRatio(imageSizeRatioCopy)
            const index = Object.keys(copy.images).length - 1
            const imagesData = copy.images
            delete imagesData[index]
            copy['images'] = imagesData
            const photoBodyMap = copy.photoBodyMap
            const mapIndex = Object.keys(photoBodyMap).length
            delete photoBodyMap[mapIndex-1]
            copy['photoBodyMap'] = photoBodyMap
            setPostData({...copy})
            const imagesToUploadCopy = imagesToUpload 
            imagesToUploadCopy.pop()
            setImagesToUpload([...imagesToUploadCopy])
            setIsAddImage(false)
            setShowUpload(false)
        }else{
            const content = copy.content
            content.pop()
            copy['content'] = content
            setPostData({...copy})
            setIsAddImage(true)
            setShowUpload(true)
        }
    }

    const newParagraph = () => {
        // const input = document.createElement('textarea')
        // input.className='add-content-description-input content-paragraph additional-item'
        // const parent = document.getElementById('edit-body-container')
        // parent.appendChild(input)
        const copy = postData
        const length = postData.content.length
        copy.content[length] = ''
        setPostData(copy)
        setShowUpload(false)
        setIsAddImage(false)
    }

    useEffect(()=> {
        setPostData(props?.postData[0])
        setFont(props?.postData[0]?.font)
        document.getElementById('font-select').value = props?.postData[0]?.font
        document.getElementById('category').value = props?.postData[0]?.category
        document.getElementById('autocomplete').value = props?.postData[0]?.location
        document.getElementById('edit-post-description').value = props?.postData[0]?.previewDescription

        if(props?.postData[0]?.previewDescription) {
            const quanityCharacters = 150 - props?.postData[0]?.previewDescription.length 
            setRemainingCharacters(quanityCharacters)
        }
        // document.getElementsByClassName('edit-body-text').style.fontFamily = props?.postData[0]?.font
        if(props?.postData[0]?.content.length > 0) {
            setIsAdditionalElements(true)
        }
        if(props.postData) {
            if(props.postData[0]){
                // console.log((props.postData[0].images))
                const imageQuantity = Object.keys(props.postData[0].images).length + 1
                let toUploadArray = new Array(imageQuantity).fill(false)
                let fileUploadArray = new Array(imageQuantity).fill([])
                setImagesToUpload(toUploadArray)
                setFilesArray(fileUploadArray)
            }
        }
        if(props.postData[0]){
            if(props?.postData[0]?.content.length <= Object?.keys(props?.postData[0]?.images)?.length ) {
                setIsAddImage(true)
            }
        }
        
    }, [props?.postData])

    const getFont = () => {
        const fontSelected =  document.getElementById('font-select').value
        setFont(fontSelected)
    }

    const changeMainPhoto = () => {
        const file = document.getElementById('main-image-input').files[0]
        const filesArrayCopy = filesArray
        filesArrayCopy[0] = [file]
        setFilesArray(filesArrayCopy)
        const viewFile = new FileReader()
        viewFile.onload = (e) => {
            const heightWidth = new Image()
            heightWidth.src=e.target.result
            // heightWidth.onload = function () {
            //     if(heightWidth.height / heightWidth.width > 1)  {
            //         props.setIsImageHorizontal(false)
            //     }
            // }
            // const image = document.getElementById('previewImage')
            // props.setMainImage(e.target.result)
            // image.src = e.target.result
            const copy = postData
            copy.image = e.target.result
            // copy.content[3] = 'hello'
            const imagesToUploadCopy = imagesToUpload
            imagesToUploadCopy[0] = true
            setImagesToUpload([...imagesToUploadCopy])
            setPostData({...copy})
        }
        viewFile.readAsDataURL(file)
    }

    const changeBodyPhotos = (index) => {
        const images = document.getElementById(`edit-body-photos${index}`).files 
        const filesArrayCopy = filesArray
        filesArrayCopy[index+1] = images
        setFilesArray(filesArrayCopy)
        const imagesToUploadCopy = imagesToUpload 
        imagesToUploadCopy[index + 1] = true
        setImagesToUpload([...imagesToUploadCopy])
        let sizeMapArray = new Array(images.length).fill('')
        if(images.length<4) {
            setIsTooManyImages(false)
            if(images.length>1) {
                const imagesArray = []
                for (let i = 0; i < images.length; i++) {
                    const file = images[i];
                    const fileReader  = new FileReader();
                    fileReader.onload = function(e)  {
                        imagesArray.push(e.target.result)
                        const copy = postData
                        copy.images[index] = imagesArray
                        setPostData({...copy})
                    }
                    fileReader.readAsDataURL(file);
    
                    let percentageArray = [] 
                    const reader = new FileReader()
                    reader.readAsDataURL(images[i]);
                    reader.onload = (e) => {
                        const image = document.createElement('img')
                        image.src = e.target.result;
                        


                        image.onload = function () {
                            const height = this.height;
                            const width = this.width;
                            sizeMapArray[i] = width/height
                            if(sizeMapArray.length === images.length) {
                                const reducer = (sum, val) => sum + val;
                                let ratioTotal = sizeMapArray.reduce(reducer, 0);
                                for (let image of sizeMapArray) {
                                    percentageArray.push(image/ratioTotal)
                                }
                                const dataCopy = postData
                                const imageSizeRatioCopy = postData.photoBodyMap 
                                imageSizeRatioCopy[index] = percentageArray
                                dataCopy['photoBodyMap'] = imageSizeRatioCopy
                                setPostData(dataCopy)
                            }
                        };
                    }
                }
            }else{
                const dataCopy = postData
                const imageSizeRatioCopy = postData.photoBodyMap 
                imageSizeRatioCopy[index] = [1]
                dataCopy['photoBodyMap'] = imageSizeRatioCopy
                setPostData({...dataCopy})
                const file = images[0];
                const fileReader  = new FileReader();
                fileReader.onload = function(e)  {
                    const dataCopy = postData
                    const imagesCopy = postData.images
                    imagesCopy[index] = [e.target.result]
                    dataCopy[images] = imagesCopy
                    setPostData({...dataCopy})
                }
                fileReader.readAsDataURL(file);
            }
        }else{
            setIsTooManyImages(true)
        }
        
    }

    const fileUpload = () => {
        console.log(filesArray)
        let index = 0
        let j = 0
        let finalArray = []
        const upload = () => {
            if(index < filesArray.length){
                if(filesArray[index].length > 0) {
                    const random = Math.round(Math.random()*1000000)
                    if(j===0) {
                        finalArray.push([])
                    }
                    const metadata = {
                        contentType: filesArray[index][j].type,
                    }
                    const storageRef = firebase.storage().ref()
                    const picRef = storageRef.child(`${postData.username}/${postData.url}/${filesArray[index][j].name}${random}`)
                    const file = filesArray[index][j]
                    picRef.put(file, metadata)
                    .then((snapshot)=> {
                        console.log('Uploaded file');
                        snapshot.ref.getDownloadURL()
                        .then((url)=> {
                            console.log(url)
                            finalArray[index].push(url)
                            j++
                            if(index === filesArray.length -1 && j===filesArray[index].length){
                                // console.log(finalArray)
                                submit(finalArray)
                            }
                            if(j === filesArray[index].length){
                                j = 0
                                index++
                            }
                            upload()
                        })
                    })
                }else{
                    if(index === filesArray.length -1 && j===filesArray[index].length){
                        submit(finalArray)
                        // console.log(finalArray)
                    }else{
                        finalArray.push([])
                        index++
                        upload()
                    }
                }
            }
        }
        upload()
    }

    const submit = (images) => {
        let mainImage = postData.image
        
        const allImages = postData.images
        for (let i = 0; i<images.length; i++) {
            if(i===0 && images[i].length === 1) {
                mainImage = images[i][0]
            }else if (images[i].length > 0) {
                allImages[i-1] = images[i]
            }
        }
        console.log(allImages)
        const title = document.getElementById('edit-post-title').value
        const previewDescription = document.getElementById('edit-post-description').value
        const location = document.getElementById('autocomplete').value
        let country 
        let city
        
        const category = document.getElementById('category').value
        const descriptionArray = []
        const content = document.getElementsByClassName('content-paragraph')
        for (let i=0; i<content.length; i++) {
            descriptionArray.push(String(content[i].value))
        }

        const fullPostUpdate = {}
        const previewPostUpdate = {}
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
        }else{
            previewPostUpdate['previewDescription'] = descriptionArray[0].substring(0,150)
            fullPostUpdate['previewDescription'] = descriptionArray[0].substring(0,150)
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
        if(mainImage!==postData.image) {
            fullPostUpdate['image'] = mainImage
            previewPostUpdate['image'] = mainImage
        }
        fullPostUpdate['photoBodyMap'] = postData.photoBodyMap
        fullPostUpdate['content'] = descriptionArray
        fullPostUpdate['images'] = allImages


        db.collection('posts')
        .where('username', '==', postData.username)
        .where('url', '==', postData.url)
        .get()
        .then(data=> {
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
                    let previewPostRef = data.docs[0].id
                    db.collection('preview-posts')
                    .doc(previewPostRef)
                    .update({
                        ...previewPostUpdate
                    })
                    .then(()=>{
                        console.log('uploaded')
                        alert('uploaded')
                    })
                })
            })              
        })
    }

    const calculateRemainingCharacters = () => {
        const characters = document.getElementById('edit-post-description').value
        const characterQuantity = 150 - characters.length
        setRemainingCharacters(characterQuantity)
    }
     
    // const test = () => {
    //     console.log(postData)
    // }

    return(
        <Container>
            {/* <button onClick={test}>eee</button> */}
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <X onClick={()=>props.setShowEdit(false)}>&times;</X>
            </div>
            <VerticalScroll height='10vh'>
                <div>
                    <Container2>
                        <div id='edit-area'>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Title id='edit-post-title' font={font} onChange={null} defaultValue={props?.postData[0]?.title}></Title>
                                <MainImage src={postData?.image}></MainImage>
                                <label htmlFor='main-image-input' className='upload-button-label'>Change main image</label>
                                <input onChange={changeMainPhoto} hidden id='main-image-input' type='file'></input>
                            </div>
                        </div>
                        {postData?.content?.map((paragraph, index)=> {
                            return(
                            <ContentContainer key={index}>
                                <Paragraphs className='content-paragraph' font={font} defaultValue={paragraph}></Paragraphs>
                                <PhotoAndButtonContainer>
                                    <Masonry>
                                        {postData?.images[index]?.map((image, i)=> {
                                            return(
                                                <ImageNew key={i} src={image}></ImageNew>
                                                )
                                            })}
                                    </Masonry>
                                    {postData?.images[index] || showUpload || postData.content.length > index + 1 ? 
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <UploadLabel htmlFor={`edit-body-photos${index}`}>Select photos (max. 3)</UploadLabel>
                                        <input multiple id={`edit-body-photos${index}`} onChange={()=> changeBodyPhotos(index)} hidden  type='file'></input>
                                        {isTooManyImages ? 
                                        <TooManyImages>Exceeded image limit of three</TooManyImages>
                                        :
                                        null
                                        }
                                    </div>    
                                    :
                                    null
                                    }
                                </PhotoAndButtonContainer>
                            </ContentContainer>
                            )
                        })}
                        <BodyButtonContainer id='add-content-body-buttons'>
                            {isAdditionalElements ? 
                            <RemoveLastElement type="button" onClick={removeLastElement}>{`Remove last ${isAddImage ? 'image' : 'text block'}`}</RemoveLastElement>
                            :
                            null
                            }
                            {isAddImage ? 
                            <NewItemButton type="button" onClick={newParagraph}>Add paragraph</NewItemButton>
                            : 
                            <NewItemButton long={!isAdditionalElements} type="button" onClick={newImage}>Add image</NewItemButton>
                            }
                        </BodyButtonContainer>
                        <Label>Post description</Label>
                        <PostDescriptionInput font={font} onChange={calculateRemainingCharacters} id='edit-post-description'></PostDescriptionInput>
                        <div>Remaining characters: {remainingCharacters}</div>
                        <Label>Font:</Label>
                        <FontSelect onChange={getFont} id='font-select'>
                            <FontOption value="'Castoro', serif;" font="'Castoro', serif;">Castoro</FontOption>
                            <FontOption value="'Roboto', sans-serif;" font="'Roboto', sans-serif;">Roboto</FontOption>
                            <FontOption value="'Raleway', sans-serif;" font="'Raleway', sans-serif;">Raleway</FontOption>
                            <FontOption value="'Zilla Slab', serif;" font="'Zilla Slab', serif;">Zilla Slab</FontOption>
                            <FontOption value="'Open Sans', sans-serif;" font="'Open Sans', sans-serif;">Open Sans</FontOption>
                            <FontOption value="'Poppins', sans-serif;" font="'Poppins', sans-serif;">Poppins</FontOption>
                            <FontOption value="'Antic Slab', serif;" font="'Antic Slab', serif;">Antic Slab</FontOption>
                        </FontSelect>
                        <Label htmlFor='category'>Category:</Label>
                        <SelectInput onChange={null} name='category' id='category'>
                            <option value='restaurant'>Restaurant</option>
                            <option value='entertainment'>Entertainment</option>
                            <option value='adventure'>Adventure</option>
                            <option value='sightseeing'>Sightseeing</option>
                            <option value='shopping'>Shopping</option>
                            <option value='museum'>Museum</option>
                        </SelectInput>
                        <Label>Location:</Label>
                        <Autocomplete id='autocomplete-component'/>
                        <div style={{marginBottom: '20px'}}></div>
                        <div style={{display: 'flex'}}>
                            <Cancel onClick={()=>props.setShowEdit(false)}>Cancel</Cancel>
                            <Submit onClick={fileUpload}>Submit</Submit>
                        </div>
                    </Container2>
                </div>
            </VerticalScroll>
        </Container>
    )
}

export default EditPost