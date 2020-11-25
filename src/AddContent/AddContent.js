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

    // return(
    //     <div>
    //         <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
    //         <Container>
    //             <div>
    //                 <FormContainer id='content-form'>
    //                     <label>Main photo</label>
    //                     <input type='file' className='photo-input'></input>
    //                     <label>Title</label>
    //                     <TextInput onChange={e=>setTitle(e.target.value)}></TextInput>
    //                     <label>Your name</label>
    //                     <TextInput onChange={e=>setAuthor(e.target.value)}></TextInput>
    //                     <label htmlFor='category'>Category</label>
    //                     <SelectInput name='category' id='category'>
    //                         <option value='' defaultValue>Select category</option>
    //                         <option value='restaurant'>Restaurant</option>
    //                         <option value='entertainment'>Entertainment</option>
    //                         <option value='adventure'>Adventure</option>
    //                         <option value='sightseeing'>Sightseeing</option>
    //                         <option value='shopping'>Shopping</option>
    //                         <option value='museum'>Museum</option>
    //                     </SelectInput>
    //                     <label>Select City</label>
    //                     <Autocomplete />
    //                     <label>First paragraph</label>
    //                     <DescriptionInput className='content-paragraph'></DescriptionInput>
    //                     {isAdditionalElements ? 
    //                     <RemoveLastElement type="button" onClick={removeLastElement}>Remove last element</RemoveLastElement>
    //                     :
    //                     null
    //                     }
    //                     {isAddImage ? 
    //                     <NewItemButton type="button" onClick={newParagraph}>Add paragraph</NewItemButton>
    //                     : 
    //                     <NewItemButton type="button" onClick={newImage}>Add image</NewItemButton>
    //                     }
    //                     <br></br>
    //                     <br></br>
    //                 </FormContainer>
    //                 <SubmitButton type="button" onClick={fileUpload}>Submit</SubmitButton>
    //             </div>
    //         </Container>
    //     </div>
    // )
}

export default AddContent

// return(
//     <div>
//         <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
//         <Container>
//             <div>
//                 <FormContainer id='content-form'>
//                     <label>Main photo</label>
//                     <input type='file' className='photo-input'></input>
//                     <label>Title</label>
//                     <TextInput onChange={e=>setTitle(e.target.value)}></TextInput>
//                     <label>Your name</label>
//                     <TextInput onChange={e=>setAuthor(e.target.value)}></TextInput>
//                     <label htmlFor='category'>Category</label>
//                     <SelectInput name='category' id='category'>
//                         <option value='' defaultValue>Select category</option>
//                         <option value='restaurant'>Restaurant</option>
//                         <option value='entertainment'>Entertainment</option>
//                         <option value='adventure'>Adventure</option>
//                         <option value='sightseeing'>Sightseeing</option>
//                         <option value='shopping'>Shopping</option>
//                         <option value='museum'>Museum</option>
//                     </SelectInput>
//                     <label>Select City</label>
//                     <Autocomplete />
//                     <label>First paragraph</label>
//                     <DescriptionInput className='content-paragraph'></DescriptionInput>
//                     {isAdditionalElements ? 
//                     <RemoveLastElement type="button" onClick={removeLastElement}>Remove last element</RemoveLastElement>
//                     :
//                     null
//                     }
//                     {isAddImage ? 
//                     <NewItemButton type="button" onClick={newParagraph}>Add paragraph</NewItemButton>
//                     : 
//                     <NewItemButton type="button" onClick={newImage}>Add image</NewItemButton>
//                     }
//                     <br></br>
//                     <br></br>
//                 </FormContainer>
//                 <SubmitButton type="button" onClick={fileUpload}>Submit</SubmitButton>
//             </div>
//         </Container>
//     </div>
// )

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