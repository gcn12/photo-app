import React, { useState } from 'react'
import {
    PreviewImage,
    TextInput,
    Container,
    Label,
    FileUpload,
} from './AddContent.styles'

const TitlePhoto = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    const displayImage = () => {
        checkProceed()
        props.setTitlePhotoProps('shiftUp')
        const file = document.getElementById('photo-input').files[0]
        const viewFile = new FileReader()
        viewFile.onload = (e) => {
            const heightWidth = new Image()
            heightWidth.src=e.target.result
            heightWidth.onload = function () {
                if(heightWidth.height / heightWidth.width > 1)  {
                    props.setIsImageHorizontal(false)
                }
            }
            const image = document.getElementById('previewImage')
            image.src = e.target.result
            props.setMainImage(e.target.result)
        }
        viewFile.readAsDataURL(file)
        // setIsImage(true)
    }

    const checkProceed = () => {
        if (document.getElementById('add-content-title').value.length > 1 && document.getElementById('photo-input').files.length===1) {
            props.setTitlePhotoProceed(true)
        }else{
            props.setTitlePhotoProceed(false)
        }
    }

    return(
        <div>
            <Container visibility={props.animationMap.titlePhoto[props.titlePhotoProps].opacity} initial='initial' transition='transition' variants={props.animationMap.titlePhoto} animate={props.titlePhotoProps}>
                <Label>Create a title:</Label>
                <div>
                    <TextInput onChange={checkProceed} autoComplete='off' id='add-content-title'></TextInput>
                    {props.isDuplicate ? 
                    <div style={{color: '#e04343'}}>Title already used</div>
                    :
                    null
                    }
                </div>
                <Label>Upload header photo:</Label>
                <input hidden onChange={displayImage} id='photo-input' type='file' className='photo-input'></input>
                <FileUpload htmlFor='photo-input'>Select image</FileUpload>
                <br></br>
                <PreviewImage onLoad={()=>setIsVisible(true)} opacity={isVisible ? 1 : 0} alt='preview' id='previewImage'></PreviewImage>
                
                <br></br>
            </Container>
        </div>
    )
}

export default TitlePhoto