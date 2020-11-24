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
    PreviewImage,
    DescriptionInput,
    NewItemButton,
    RemoveLastElement,
} from './AddContent.styles'

const AddContent = (props) => {

    const [title, setTitle] = useState(null)
    // const [description, setDescription] = useState(null)
    const [author, setAuthor] = useState(null)
    // eslint-disable-next-line
    const [isImage, setIsImage] = useState(false)
    const [isAddImage, setIsAddImage] = useState(false)

    const submit = (images, mainImage) => {
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

        db.collection('continents-countries').doc('map').collection(country)
        .where(country, 'in', ['North America', 'South America', 'Asia', 'Europe', 'Oceania', 'Africa'])
        .get()
        .then(data => {
            const continent = data.docs[0].data()[country]
            db.collection('posts').add({
                content: descriptionArray,
                images,
                title,
                timestamp,
                image: mainImage,
                category,
                city,
                // description,
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
                    .then(console.log('uploaded'))
                })              
            })
        })
    }

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

    // const fileUpload = () => {
    //     const file = document.getElementById('input').files[0]
    //     if(file) {
    //         const ref1 = firebase.storage().ref().child(file.name);
    //         const metadata = {
    //             contentType: file.type
    //         }
    //         ref1.put(file, metadata).then(function(snapshot) {
    //             snapshot.ref.getDownloadURL()
    //             .then(downloadURL => {
    //                 submit(downloadURL)
    //             })
    //             .catch(error => console.log(error))
    //         });
    //     }
    // }

    const fileUpload = () => {
        const photoUrlArray = []
        let mainPhoto = []
        const photoFiles = document.getElementsByClassName('photo-input')
        if(photoFiles.length>0) {
            for (let i = 0; i<photoFiles.length; i++) {
                const file = photoFiles[i].files[0]
                const metadata = {
                    contentType: file.type
                }
                firebase.storage().ref()
                .child(file.name)
                .put(file, metadata)
                .then(function(snapshot) {
                    snapshot.ref.getDownloadURL()
                    .then(downloadURL => {
                        if(i===0) {
                            mainPhoto.push(downloadURL)
                        }else{
                            photoUrlArray.push(downloadURL)
                        }
                        if(i === photoFiles.length -1) {
                            submit(photoUrlArray, mainPhoto)
                        }
                    })
                    .catch(error => console.log(error))
                });
            }
        }
    }

    const newParagraph = () => {
        const input = document.createElement('textarea')
        input.className='add-content-description-input content-paragraph'
        const parent = document.getElementById('content-form')
        parent.appendChild(input)
        setIsAddImage(!isAddImage)
    }

    const newImage = () => {
        const image = document.createElement('input')
        image.type='file'
        image.className='photo-input'
        const parent = document.getElementById('content-form')
        parent.appendChild(image)
        setIsAddImage(!isAddImage)
    }
    
    const removeLastElement = () => {
        const parent = document.getElementById('content-form')
        parent.removeChild(parent.lastChild)
    }

    return(
        <Container>
            <div>
                {isImage ? 
                <PreviewImage alt='preview' id='previewImage'></PreviewImage>
                :
                null
                }
                <FormContainer id='content-form'>
                    <label>Main photo</label>
                    {/* <input onChange={displayImage} type='file' className='photo-input'></input> */}
                    <input type='file' className='photo-input'></input>
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
                </FormContainer>
                {/* {isAddImage ?  */}
                {/* : */}
                {/* } */}
                <NewItemButton onClick={newImage}>Add image</NewItemButton>
                <RemoveLastElement onClick={removeLastElement}>Remove last element</RemoveLastElement>
                <NewItemButton onClick={newParagraph}>Add paragraph</NewItemButton>
                <br></br>
                {/* <SubmitButton onClick={fileUploadTest}>Test</SubmitButton> */}
                <SubmitButton onClick={fileUpload}>Submit</SubmitButton>
            </div>
        </Container>
    )
}

export default AddContent