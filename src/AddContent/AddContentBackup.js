import React, { useState } from 'react'
import { db } from '../Firebase'
import firebase from 'firebase'
import Autocomplete from '../Autocomplete/Autocomplete'
import {
    SubmitButton,
    Container,
    FormContainer,
    TextInput,
    SelectInput,
    // PreviewImage,
    DescriptionInput,
    NewItemButton,
    RemoveLastElement,
} from './AddContent.styles'

const AddContent = (props) => {

    // const [isImage, setIsImage] = useState(false)
    // const [description, setDescription] = useState(null)
    const [title, setTitle] = useState(null)
    const [author, setAuthor] = useState(null)
    const [isAddImage, setIsAddImage] = useState(false)
    const [isAdditionalElements, setIsAdditionalElements] = useState(false)

    const submit = (images, mainImage, test) => {
        console.log(test)
        const location = document.getElementById('autocomplete').value
        const splitLocation = location.split(',')
        const country = splitLocation[splitLocation.length-1].trim()
        const city = splitLocation[0]
        const category = document.getElementById('category').value
        const timestamp = Date.now()
        const descriptionArray = []
        const content = document.getElementsByClassName('content-paragraph')
        for (let i=0; i<content.length; i++) {
            descriptionArray.push(String(content[i].value))
        }
        const urlObject = {}
        console.log(images)
        
        for (let i=0; i<images.length; i++) {
            console.log(images[i])
            urlObject[i] = images[i]
        }

        console.log(urlObject)

        db.collection('continents-countries').doc('map').collection(country)
        .where(country, 'in', ['North America', 'South America', 'Asia', 'Europe', 'Oceania', 'Africa'])
        .get()
        .then(data => {
            const continent = data.docs[0].data()[country]
            db.collection('posts').add({
                content: descriptionArray,
                images: urlObject,
                title,
                timestamp,
                image: mainImage,
                category,
                city,
                country,
                continent,
                author,
                views: 0,
            }).then(docRef => {
                db.collection('users').doc(props.user)
                .collection('posts').doc(docRef.id).set({
                    reference: `posts/${docRef.id}`,
                    timestamp,
                    id: docRef.id,
                    title,
                    image: mainImage,
                    views: 0,
                    city,
                    country,
                    continent,
                }, {merge: true})
                .then(()=>{
                    db.collection('posts').doc(docRef.id).set({
                        id: docRef.id,
                    }, {merge: true}) 
                })
                .then(()=> {
                    db.collection('preview-posts').add({
                        reference: `/posts/${docRef.id}`,
                        timestamp,
                        id: docRef.id,
                        title,
                        image: mainImage,
                        views: 0,
                        category,
                        city,
                        country,
                        continent,
                    })
                    .then(()=>console.log('uploaded'))
                })              
            })
        })
    }

    const fileUpload = () => {
        let mainPhoto = []
        let photoIndexes = []
        let fileArray = []
        const photoUrlArraySorted = []
        const testArray = []
        const photoFiles = document.getElementsByClassName('photo-input')
        for (let i = 0; i < photoFiles.length; i++) {
            fileArray = [...fileArray, ...photoFiles[i].files]
            if(photoFiles[i].files.length > 1) {
                photoUrlArraySorted.push([])
                for(let j = 0; j<photoFiles[i].files.length; j++) {
                    photoIndexes.push(i-1)
                }
            }else{
                if(i!==0) {
                    photoUrlArraySorted.push([])
                    photoIndexes.push(i-1)
                }
            }
        }
        for (let i = 0; i<fileArray.length; i++) {
            const file = fileArray[i]
            const metadata = {
                contentType: file.type
            }
            firebase.storage().ref()
            .child(file.name)
            .put(file, metadata)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                    testArray.push(downloadURL)
                    if(i===0) {
                        mainPhoto.push(downloadURL)
                        if(fileArray.length===1){
                            submit([], downloadURL)
                        }
                    }else{
                        photoUrlArraySorted[photoIndexes[i-1]] = [...photoUrlArraySorted[photoIndexes[i-1]], downloadURL]
                        if(i===fileArray.length-1) {
                            submit(photoUrlArraySorted, mainPhoto[0], testArray)
                            console.log(photoUrlArraySorted)
                            return
                        }
                    }
                    //keep for now
                    // if(i===0) {
                    //     mainPhoto.push(downloadURL)
                    // }else if(photoUrlArraySorted[photoIndexes[i-1]] === null){
                    //     photoUrlArraySorted[photoIndexes[i-1]] = downloadURL
                    // }else{
                    //     photoUrlArraySorted[photoIndexes[i-1]] = [...photoUrlArraySorted[photoIndexes[i-1]], downloadURL]
                    // }
                    // if(i===fileArray.length-1) {
                    //     submit(photoUrlArraySorted, mainPhoto[0])
                    //     console.log(photoUrlArraySorted)
                    //     return
                    // }
                }).then(()=>{
                })
                .catch(error => console.log(error))
            });
        }
    }

    const newParagraph = () => {
        const input = document.createElement('textarea')
        input.className='add-content-description-input content-paragraph additional-item'
        const parent = document.getElementById('content-form')
        parent.appendChild(input)
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
    }

    const newImage = () => {
        const image = document.createElement('input')
        image.type='file'
        image.className='photo-input additional-item'
        image.setAttribute('multiple', '')
        image.setAttribute('accept', 'image/jpeg, image/png, image/jpg, image/tif')
        const parent = document.getElementById('content-form')
        parent.appendChild(image)
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
    }
    
    const removeLastElement = () => {
        const parent = document.getElementById('content-form')
        parent.removeChild(parent.lastChild)
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
    }

    const checkAdditionalElement = () => {
        const additionalElements = document.getElementsByClassName('additional-item')
        if(additionalElements.length > 0) {
            setIsAdditionalElements(true)
        }else{
            setIsAdditionalElements(false)
        }
    }

    return(
        <div>
        <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
        <Container>
            <FormContainer >
                <div id='content-form'>
                <label>Main photo</label>
                <br></br>
                <input type='file' className='photo-input'></input>
                <br></br>
                <label>Title</label>
                <TextInput onChange={e=>setTitle(e.target.value)}></TextInput>
                <label>Your name</label>
                <TextInput onChange={e=>setAuthor(e.target.value)}></TextInput>
                <label htmlFor='category'>Category</label>
                <SelectInput name='category' id='category'>
                    <option value='' defaultValue>Select category</option>
                    <option value='restaurant'>Restaurant</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='adventure'>Adventure</option>
                    <option value='sightseeing'>Sightseeing</option>
                    <option value='shopping'>Shopping</option>
                    <option value='museum'>Museum</option>
                </SelectInput>
                <label>Select City</label>
                <Autocomplete />
                <label>First paragraph</label>
                <DescriptionInput className='content-paragraph'></DescriptionInput>
                </div>
                {isAdditionalElements ? 
                <RemoveLastElement type="button" onClick={removeLastElement}>Remove last element</RemoveLastElement>
                :
                null
                }
                {isAddImage ? 
                <NewItemButton type="button" onClick={newParagraph}>Add paragraph</NewItemButton>
                : 
                <NewItemButton type="button" onClick={newImage}>Add image</NewItemButton>
                }
                <br></br>
                <SubmitButton type="button" onClick={fileUpload}>Submit</SubmitButton>
            </FormContainer> 
        </Container>
        </div>
    )
}

export default AddContent

// <input onChange={displayImage} type='file' className='photo-input'></input>

// {isImage ? 
//     <PreviewImage alt='preview' id='previewImage'></PreviewImage>
//     :
//     null
// }


// const displayImage = () => {
    //     const file = document.getElementById('input').files[0]
    //     setIsImage(true)
    //     const viewFile = new FileReader()
    //     viewFile.onload = (e) => {
    //         const image = document.getElementById('previewImage')
    //         image.src = e.target.result
    //         document.body.appendChild(image)
    //     }
    //     viewFile.readAsDataURL(file)
    // }