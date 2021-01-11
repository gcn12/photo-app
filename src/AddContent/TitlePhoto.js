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
        const file = document.getElementById('photo-input').files[0]
        const viewFile = new FileReader()
        const fileName = file.name
        viewFile.onload = (e) => {
            const uploadedImage = document.createElement('img')
            uploadedImage.src=e.target.result
            props.setTitlePhotoProps('shiftUp')
            uploadedImage.onload = function () {
                const height = this.height;
                const width = this.width;
                if(height / width > 1)  {
                    props.setIsImageHorizontal(false)
                }
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
                const filesSmallCopy = props.filesSmall
                filesSmallCopy[0] = [imageSrcSmall]
                props.setFilesSmall(filesSmallCopy)


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

                props.setFileNames(fileName)

                const filesLargeCopy = props.filesLarge
                filesLargeCopy[0] = [imageSrcLarge]
                props.setFilesLarge(filesLargeCopy)
            }
        }
        viewFile.readAsDataURL(file)
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