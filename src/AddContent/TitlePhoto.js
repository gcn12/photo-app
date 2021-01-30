import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    PreviewImage,
    TextInput,
    Container,
    FileUpload,
    CenterContainer,
    FileInput,
} from './TitlePhoto.styles'
import { 
    titlePhotoProceed, 
    mainImageSmallest, 
    mainImageSmall,
    mainImageLarge,
    fileNames,
} from '../Redux/Actions/addContentActions'
import { Label } from './AddContent.styles'

const TitlePhoto = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    const displayImage = () => {
        checkProceed()
        const file = document.getElementById('photo-input').files[0]
        const viewFile = new FileReader()
        const fileName = file.name
        viewFile.onload = (e) => {
            const uploadedImage = document.createElement('img')
            uploadedImage.src=e.target.result
            uploadedImage.onload = function () {
                const height = this.height;
                const width = this.width;
                const image = document.getElementById('previewImage')
                let ratio
                if(height < width) {
                    ratio = height / width
                }else{
                    ratio = width / height
                }
                let finalHeightLarge
                let finalWidthLarge
                let finalHeightSmall
                let finalWidthSmall
                let finalHeightSmallest
                let finalWidthSmallest
                if(height > 650 || width > 650) {
                    if (height >= width) {
                        finalWidthSmall = Math.round(ratio * 650)
                        finalHeightSmall = 650
                    }else {
                        finalHeightSmall = Math.round(ratio * 650)
                        finalWidthSmall =  650
                    }
                }else{
                    finalHeightSmall = height
                    finalWidthSmall = width
                }
                let canvasSmall = document.createElement('canvas'), ctx2;
                canvasSmall.width = finalWidthSmall;
                canvasSmall.height = finalHeightSmall;
                ctx2 = canvasSmall.getContext('2d');
                ctx2.drawImage(uploadedImage, 0, 0, canvasSmall.width, canvasSmall.height);
                const imageSrcSmall = canvasSmall.toDataURL('image/jpeg', 1)
                image.src = imageSrcSmall
                props.dispatch(mainImageSmall([imageSrcSmall]))


                if(height > 2500 || width > 2500) {
                    if (height >= width) {
                        finalHeightLarge = 2500
                        finalWidthLarge = Math.round(ratio * 2500)
                    }else {
                        finalWidthLarge = 2500
                        finalHeightLarge = Math.round(ratio * 2500)
                    }
                }else{
                    finalHeightLarge = height
                    finalWidthLarge = width
                }
                let canvasLarge = document.createElement('canvas'), ctx;
                canvasLarge.width = finalWidthLarge;
                canvasLarge.height = finalHeightLarge;
                ctx = canvasLarge.getContext('2d');
                ctx.drawImage(uploadedImage, 0, 0, canvasLarge.width, canvasLarge.height);
                const imageSrcLarge = canvasLarge.toDataURL('image/jpeg', 1)
                props.dispatch(fileNames(fileName))
                props.dispatch(mainImageLarge([imageSrcLarge]))


                if(height > 150 || width > 150) {
                    if (height >= width) {
                        finalHeightSmallest = 150
                        finalWidthSmallest = Math.round(ratio * 150)
                    }else {
                        finalWidthSmallest= 150
                        finalHeightSmallest = Math.round(ratio * 150)
                    }
                }else{
                    finalHeightSmallest = height
                    finalWidthSmallest = width
                }
                let canvasSmallest = document.createElement('canvas'), ctx3;
                canvasSmallest.width = finalWidthSmallest;
                canvasSmallest.height = finalHeightSmallest;
                ctx3 = canvasSmallest.getContext('2d');
                ctx3.drawImage(uploadedImage, 0, 0, canvasSmallest.width, canvasSmallest.height);
                const imageSrcSmallest = canvasSmallest.toDataURL('image/jpeg', 1)

                props.dispatch(fileNames(fileName))
                props.dispatch(mainImageSmallest([imageSrcSmallest]))
            }
        }
        viewFile.readAsDataURL(file)
    }

    const checkProceed = () => {
        if (document.getElementById('add-content-title').value.length > 1 && document.getElementById('photo-input').files.length===1) {
            props.dispatch(titlePhotoProceed(true))
        }else{
            props.dispatch(titlePhotoProceed(false))
        }
    }

    const closeKeyboard = (e) => {
        if(e.code==='Enter') {
            document.activeElement.blur();
        }
    }


    return(
        <CenterContainer styles={props.titlePhotoStyles}>
            <Container>
                <Label>Create a title:</Label>
                <div>
                    <TextInput onChange={checkProceed} onKeyDown={closeKeyboard} autoComplete='off' id='add-content-title'></TextInput>
                    {props.isDuplicate ? 
                    <div style={{color: '#e04343'}}>Title already used</div>
                    :
                    null
                    }
                    {props.isTitleTooLong ? 
                    <div style={{color: '#e04343'}}>Title appears to be too long</div>
                    :
                    null
                    }
                </div>
                <Label>Upload header photo:</Label>
                <FileUpload  htmlFor='photo-input'>
                    <FileInput role='button' tabIndex='0' onChange={displayImage} id='photo-input' type='file' className='photo-input'></FileInput>
                    Select image
                </FileUpload>
                <br></br>
                <PreviewImage onLoad={()=>setIsVisible(true)} display={isVisible ? 'initial' : 'none'} opacity={isVisible ? 1 : 0} alt='preview' id='previewImage'></PreviewImage>
                <br></br>
            </Container>
        </CenterContainer>
    )
}

const mapStateToProps = state => ({
    titlePhotoStyles: state.addContent.titlePhotoStyles,
    isDuplicate: state.addContent.isDuplicate,
    filesSmall: state.addContent.filesSmall,
    filesLarge: state.addContent.filesLarge,
    isTitleTooLong: state.addContent.isTitleTooLong,
})

export default connect(mapStateToProps)(TitlePhoto)