import React, { useState } from 'react'
import {
    PreviewImage,
    TextInput,
    Container,
    Label,
    FileUpload,
} from './AddContent.styles'

const TitlePhoto = (props) => {

    const [isImage, setIsImage] = useState(false)

    const displayImage = () => {
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
        setIsImage(true)
    }

    return(
        <div>
            <Container visibility={props.animationMap.titlePhoto[props.titlePhotoProps].opacity} initial='initial'  transition='transition' variants={props.animationMap.titlePhoto} animate={props.titlePhotoProps}>
                <Label>Create a title:</Label>
                <TextInput autoComplete='off' id='add-content-title'></TextInput>
                <Label>Upload header photo:</Label>
                <input hidden onChange={displayImage} id='photo-input' type='file' className='photo-input'></input>
                <FileUpload htmlFor='photo-input'>Select image</FileUpload>
                <br></br>
                {isImage ? 
                <PreviewImage alt='preview' id='previewImage'></PreviewImage>
                :
                null
                }
                <br></br>
            </Container>
        </div>
    )
}

export default TitlePhoto