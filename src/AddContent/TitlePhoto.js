import React, { useState } from 'react'
import {
    PreviewImage,
    TextInput,
    Container,
    PreviewContainer,
    Label,
    FileUpload,
    // NextButton,
    // ButtonContainer,
    // FormContainer,
    // SelectInput,
    // DescriptionInput,
    // NewItemButton,
    // RemoveLastElement,
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
        }
        viewFile.readAsDataURL(file)
        setIsImage(true)
    }

    // const next = () => {
    //     setShiftUp({x: -1200})
    // }

    return(
        <div>
           
            <Container visibility={props.animationMap.titlePhoto[props.transition].opacity} initial='initial'  transition='transition' variants={props.animationMap.titlePhoto} animate={props.transition}>
                <Label>Create a title:</Label>
                <TextInput></TextInput>
                <Label>Upload header photo:</Label>
                <FileUpload style={{paddingBottom: '20px'}} onChange={displayImage} id='photo-input' type='file' className='photo-input'></FileUpload>
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