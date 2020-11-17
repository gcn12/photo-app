import React, { useState } from 'react'
import { db } from '../Firebase'
import firebase from 'firebase'
import {
    SubmitButton,
    Container,
    FormContainer,
    TextInput,
    SelectInput,
    PreviewImage,
    DescriptionInput,
} from './AddContent.styles'

const AddContent = () => {

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)
    const [author, setAuthor] = useState(null)
    const [isImage, setIsImage] = useState(false)

    const submit = (image) => {
        const category = document.getElementById('category').value
        const continent = document.getElementById('continent').value
        const submitRef = db.collection('continents')
        // if(category && title && city && country && description) {
            db.collection('posts').add({
                title,
                timestamp: Date.now(),
                image,
                category,
                city,
                description,
                country,
                continent,
                author,
            }).then(docRef => {
                submitRef.doc(continent).set({
                    [docRef.id]: docRef.id,
                }, {merge: true})
                .then(console.log('uploaded'))
            })
        // }
    }

    const displayImage = () => {
        const file = document.getElementById('input').files[0]
        setIsImage(true)
        const viewFile = new FileReader()
        viewFile.onload = (e) => {
            const image = document.getElementById('previewImage')
            image.src = e.target.result
            document.body.appendChild(image)
        }
        viewFile.readAsDataURL(file)
    }

    const fileUpload = () => {
        const file = document.getElementById('input').files[0]
        if(file) {
            const ref1 = firebase.storage().ref().child(file.name);
            const metadata = {
                contentType: file.type
            }
            ref1.put(file, metadata).then(function(snapshot) {
                snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                    submit(downloadURL)
                })
                .catch(error => console.log(error))
            });
        }
    }

    return(
        <Container>
            <div>
                <input onChange={displayImage} type='file' id='input'></input>
                {isImage ? 
                <PreviewImage alt='preview' id='previewImage'></PreviewImage>
                :
                null
                }
                <FormContainer>
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
                    <label>City</label>
                    <TextInput onChange={e=>setCity(e.target.value)}></TextInput>
                    <label>Country</label>
                    <TextInput onChange={e=>setCountry(e.target.value)}></TextInput>
                    <label htmlFor='continent'>Continent</label>
                    <SelectInput name='continent' id='continent'>
                        <option value='' defaultValue>Select continent</option>
                        <option value='Europe'>Europe</option>
                        <option value='North America'>North America</option>
                        <option value='South America'>South America</option>
                        <option value='Africa'>Africa</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Asia'>Asia</option>
                    </SelectInput>
                    <label>Description</label>
                    <DescriptionInput onChange={e=>setDescription(e.target.value)}></DescriptionInput>
                </FormContainer>
                <SubmitButton onClick={fileUpload}>Submit</SubmitButton>
            </div>
        </Container>
    )
}

export default AddContent