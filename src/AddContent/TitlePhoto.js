import React, { useState } from 'react'
import {
    PreviewImage,
    TextInput,
    Container,
    Label,
    FileUpload,
} from './AddContentAnimationTest.styles'

const TitlePhoto = (props) => {

    const [isImage, setIsImage] = useState(false)

    const displayImage = () => {
        props.setTitlePhotoProps('transitionStart')
        const file = document.getElementById('photo-input').files[0]
        const viewFile = new FileReader()
        viewFile.onload = (e) => {
            const image = document.getElementById('previewImage')
            image.src = e.target.result
            props.setMainImage(e.target.result)
        }
        viewFile.readAsDataURL(file)
        setIsImage(true)
    }

    return(
        <div>
           
            <Container visibility={props.animationMap.titlePhoto[props.transition].opacity} initial='initial'  transition='transition' variants={props.animationMap.titlePhoto} animate={props.transition}>
                <Label>Create a title:</Label>
                <TextInput autoComplete='off' id='add-content-title'></TextInput>
                <Label>Upload header photo:</Label>
                <FileUpload onChange={displayImage} id='photo-input' type='file' className='photo-input'></FileUpload>
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