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
} from './AddContent.styles'

const AddContent = (props) => {

    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [author, setAuthor] = useState(null)
    const [isImage, setIsImage] = useState(false)

    const submit = (image) => {
        const location = document.getElementById('autocomplete').value
        const splitLocation = location.split(',')
        const country = splitLocation[splitLocation.length-1].trim()
        const city = splitLocation[0]
        const category = document.getElementById('category').value
        const submitRef = db.collection('continents')
        const timestamp = Date.now()
        // if(category && title && city && country && description) {

        db.collection('continents-countries').doc('map').collection(country)
        .where(country, 'in', ['North America', 'South America', 'Asia', 'Europe', 'Oceania', 'Africa'])
        .get()
        .then(data => {
            const continent = data.docs[0].data()[country]
            db.collection('posts').add({
                title,
                timestamp,
                image,
                category,
                city,
                description,
                country,
                continent,
                author,
            }).then(docRef => {
                submitRef.doc(continent).collection(country).doc(city).set({
                    [docRef.id]: docRef.id,
                }, {merge: true})
                .then(
                    db.collection('users').doc(props.user)
                    .collection('posts').doc(docRef.id).set({
                        timestamp,
                        id: docRef.id,
                        title,
                        image,
                        category,
                        city,
                        description,
                        country,
                        continent,
                        author,
                    }, {merge: true})
                    .then(db.collection('posts').doc(docRef.id).set({
                        id: docRef.id,
                    }, {merge: true}))               
                )
                .then(console.log('uploaded'))
            })
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
                    <label>Select City</label>
                    <Autocomplete />
                    <label>Description</label>
                    <DescriptionInput onChange={e=>setDescription(e.target.value)}></DescriptionInput>
                </FormContainer>
                <SubmitButton onClick={fileUpload}>Submit</SubmitButton>
            </div>
        </Container>
    )
}

export default AddContent


// db.collection('continents-map')
//         .get()
//         .then(data=>{
//             // data.docs.forEach(doc=>console.log(doc.data()))
//             const continentsList = data.docs[0].data()
//             const continent = continentsList[country.trim()]
//             db.collection('posts').add({
//                 title,
//                 timestamp: Date.now(),
//                 image,
//                 category,
//                 city,
//                 description,
//                 country,
//                 continent,
//                 author,
//             }).then(docRef => {
//                 // submitRef.doc(continent).set({
//                 submitRef.doc(continent).collection(country).doc(city).set({
//                     [docRef.id]: docRef.id,
//                 }, {merge: true})
//                 .then(console.log('uploaded'))
//             })
//         })