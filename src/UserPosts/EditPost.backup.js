import React, { useState, useEffect } from 'react'
import VerticalScroll from '../VeritcalScroll/VerticalScroll'
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
} from './EditPost.styles'

const EditPost = (props) => {

    const [font, setFont] = useState(props?.postData[0]?.font)
    const [isAdditionalElements, setIsAdditionalElements] = useState(false)
    const [isAddImage, setIsAddImage] = useState(false)
    const [imageSizeRatio, setImageSizeRatio] = useState()

    const getImageMap = (inputID, inputDiv, imageSizeRatio1) => {
        // const test = imageSizeRatio
        const images = document.getElementById(inputID)
        let sizeMapArray = new Array(images.files.length).fill('')
        if(images.files.length<4) {
            if(images.files.length>1) {
                // setIsTooManyImages(false)
                for (let i = 0; i < images.files.length; i++) {
                    const file = images.files[i];
                    const fileReader  = new FileReader();
                    fileReader.onload = function(e)  {
                        const displayImage = document.createElement("img");
                        displayImage.src = e.target.result;
                        displayImage.className = 'upload-gallery-image'
                        // document.body.appendChild(displayImage);
                        document.getElementById(inputDiv).appendChild(displayImage);
                    }
                    fileReader.readAsDataURL(file);
    
                    let percentageArray = []
                    const reader = new FileReader()
                    reader.readAsDataURL(images.files[i]);
                    reader.onload = (e) => {
                        const image = document.createElement('img')
                        image.src = e.target.result;
                        image.onload = function () {
                            const height = this.height;
                            const width = this.width;
                            sizeMapArray[i] = width/height
                            if(sizeMapArray.length === images.files.length) {
                                const reducer = (sum, val) => sum + val;
                                let ratioTotal = sizeMapArray.reduce(reducer, 0);
                                for (let image of sizeMapArray) {
                                    percentageArray.push(image/ratioTotal)
                                }
                                const index = inputID[inputID.length-1]
                                const imageSizeRatioCopy = imageSizeRatio 
                                imageSizeRatioCopy[index] = percentageArray
                                setImageSizeRatio(imageSizeRatioCopy)
                            }
                        };
                    }
                }
            }else{
                const index = inputID[inputID.length-1]
                console.log(imageSizeRatio)
                const imageSizeRatioCopy = imageSizeRatio 
                imageSizeRatioCopy[index] = [1]
                setImageSizeRatio(imageSizeRatioCopy)
                const file = images.files[0];
                const fileReader  = new FileReader();
                fileReader.onload = function(e)  {
                    const displayImage = document.createElement("img");
                    displayImage.src = e.target.result;
                    displayImage.className = 'upload-gallery-image'
                    document.getElementById(inputDiv).appendChild(displayImage);
                }
                fileReader.readAsDataURL(file);
            }
        }else{
            // setIsTooManyImages(true)
        }
    }

    const newImage = () => {
        const numberInputs = document.getElementsByClassName('body-photos').length
        const image = document.createElement('input')
        image.id = `image-input-${numberInputs}`
        image.type='file'
        image.className='photo-input additional-item body-photos'
        image.setAttribute('multiple', '')
        image.setAttribute('accept', 'image/jpeg, image/png, image/jpg, image/tif')
        image.setAttribute('hidden', '')
        const uploadButtonLabel = document.createElement('label')
        uploadButtonLabel.htmlFor = `image-input-${numberInputs}`
        uploadButtonLabel.className = 'upload-button-label'
        uploadButtonLabel.innerHTML = 'Select images (max. 3)'
        
        const imageDiv = document.createElement('div')
        imageDiv.id = `image-div-${numberInputs}`
        imageDiv.className = 'image-div'

        const parent = document.getElementById('edit-body-container')
        parent.appendChild(image)
        parent.appendChild(imageDiv)
        parent.appendChild(uploadButtonLabel)
        setIsAddImage(!isAddImage)

        image.onchange = ()=> {
            getImageMap(`image-input-${numberInputs}`, `image-div-${numberInputs}`)
        }
    }

    const removeLastElement = () => {
        const numberInputs = document.getElementsByClassName('body-photos').length
        const parent = document.getElementById('edit-body-container')
        parent.removeChild(parent.lastChild)
        if(isAddImage) {
            parent.removeChild(parent.lastChild)
            parent.removeChild(parent.lastChild)
            const imageSizeRatioCopy = props.imageSizeRatio
            delete imageSizeRatioCopy[numberInputs-1]
            setImageSizeRatio(imageSizeRatioCopy)
            setIsAddImage(false)
        }
    }

    const newParagraph = () => {
        const input = document.createElement('textarea')
        input.className='add-content-description-input content-paragraph additional-item'
        const parent = document.getElementById('edit-body-container')
        parent.appendChild(input)
        setIsAddImage(false)
    }

    useEffect(()=> {
        setFont(props?.postData[0]?.font)
        setImageSizeRatio(props?.postData[0]?.photoBodyMap)
        // document.getElementsByClassName('edit-body-text').style.fontFamily = props?.postData[0]?.font
        document.getElementById('font-select').value = props?.postData[0]?.font
        if(props?.postData[0]?.content.length > 0) {
            setIsAdditionalElements(true)
        }
        // if(props.postData[0]){
        //     if(props?.postData[0]?.content.length < Object?.keys(props?.postData[0]?.images)?.length ) {
        //         setIsAddImage(true)
        //     }
        // }
        const mapItems = () => {
            props?.postData[0]?.content.forEach((item, index)=> {
                const paragraph = document.createElement('textarea')
                paragraph.defaultValue = item
                paragraph.className='edit-body-text'
                const newFont = props?.postData[0]?.font
                const splitFont = newFont.split(',')
                paragraph.style.fontFamily = splitFont[0]
                const parent = document.getElementById('edit-body-container')
                parent.appendChild(paragraph)
                setIsAddImage(false)
                const photoContainer = document.createElement('div')
                photoContainer.className = 'edit-photo-container'

                props?.postData[0]?.images[index]?.forEach((pic, i)=> {
                    const image = document.createElement('img')
                    image.src = pic
                    image.className = 'edit-body-image'
                    photoContainer.appendChild(image)
                })
                if(props?.postData[0]?.images[index]){
                    setIsAddImage(true)
                    parent.appendChild(photoContainer)
                    newImage()
                }


            })
        }
        const mappedItems = document.getElementById('edit-body-container').childElementCount
        if(mappedItems===0 && imageSizeRatio) {
            mapItems()
        }
        // eslint-disable-next-line 
    }, [props?.postData])

    const getFont = () => {
        let newFont 
        const fontSelected =  document.getElementById('font-select').value
        setFont(fontSelected)
        newFont = fontSelected.split(',')
        const paragraphs = document.getElementsByClassName('edit-body-text')
        for (let i=0; i<paragraphs.length; i++) {
            paragraphs[i].style.fontFamily = newFont[0]
        }
    }
    
    return(
        <Container>
            <button onClick={()=> console.log(imageSizeRatio)}>eee</button>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <X onClick={()=>props.setShowEdit(false)}>&times;</X>
            </div>
            <VerticalScroll height='10vh'>
                <div>
                    <Container2>
                        <div id='edit-area'>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Title font={font} onChange={null} defaultValue={props?.postData[0]?.title}></Title>
                                <MainImage src={props?.postData[0]?.image}></MainImage>
                                <label htmlFor='main-image-input' className='upload-button-label'>Change main image</label>
                                <input hidden id='main-image-input' type='file'></input>
                            </div>
                        </div>
                        <div id='edit-body-container' style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}></div>
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
                        <FontSelect onChange={getFont} id='font-select'>
                            <FontOption value="'Castoro', serif;" font="'Castoro', serif;">Castoro</FontOption>
                            <FontOption value="'Roboto', sans-serif;" font="'Roboto', sans-serif;">Roboto</FontOption>
                            <FontOption value="'Raleway', sans-serif;" font="'Raleway', sans-serif;">Raleway</FontOption>
                            <FontOption value="'Zilla Slab', serif;" font="'Zilla Slab', serif;">Zilla Slab</FontOption>
                            <FontOption value="'Open Sans', sans-serif;" font="'Open Sans', sans-serif;">Open Sans</FontOption>
                            <FontOption value="'Poppins', sans-serif;" font="'Poppins', sans-serif;">Poppins</FontOption>
                            <FontOption value="'Antic Slab', serif;" font="'Antic Slab', serif;">Antic Slab</FontOption>
                        </FontSelect>
                        <div style={{display: 'flex'}}>
                            <Cancel onClick={()=>props.setShowEdit(false)}>Cancel</Cancel>
                            <Submit>Submit</Submit>
                        </div>
                    </Container2>
                </div>
            </VerticalScroll>
        </Container>
    )
}

export default EditPost