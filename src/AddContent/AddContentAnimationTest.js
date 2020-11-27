import React, { useState } from 'react'
import {
    PreviewImage,
    TextInput,
    Container,
    PreviewContainer,
    Label,
    SubmitButton,
    // FormContainer,
    // SelectInput,
    // DescriptionInput,
    // NewItemButton,
    // RemoveLastElement,
} from './AddContentAnimationTest.styles'

const AddContent = () => {

    const [isImage, setIsImage] = useState(false)
    const [shiftUp, setShiftUp] = useState({y: 'calc(50vh - 80%)'})

    const displayImage = () => {
        const file = document.getElementById('photo-input').files[0]
        console.log(file)
        setIsImage(true)
        setShiftUp({y: 10})
        const viewFile = new FileReader()
        viewFile.onload = (e) => {
            const image = document.getElementById('previewImage')
            // const image = document.createElement('img')
            image.src = e.target.result
            // document.body.appendChild(image)
        }
        viewFile.readAsDataURL(file)
    }

    const next = () => {
        setShiftUp({x: -1200})
    }

    return(
        <div>
            <SubmitButton onClick={next}>Next</SubmitButton>
            <Container animate={shiftUp}>
                <Label>Create a title:</Label>
                <TextInput></TextInput>
                <Label>Upload header photo:</Label>
                <br></br>
                <PreviewContainer>
                    <input style={{paddingBottom: '20px'}} onChange={displayImage} id='photo-input' type='file' className='photo-input'></input>
                    {isImage ? 
                    <PreviewImage alt='preview' id='previewImage'></PreviewImage>
                    :
                    null
                    }
                </PreviewContainer>
                <br></br>
            </Container>
        </div>
    )
}

export default AddContent