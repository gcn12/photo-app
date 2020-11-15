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
            }).then(docRef => {
                submitRef.doc(continent).set({
                    [docRef.id]: docRef.id,
                })
            })
            .then(console.log('uploaded'))
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
                    <TextInput name='title' onChange={e=>setTitle(e.target.value)}></TextInput>
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
                    <TextInput name='city' onChange={e=>setCity(e.target.value)}></TextInput>
                    <label>Country</label>
                    <TextInput name='country' onChange={e=>setCountry(e.target.value)}></TextInput>
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
                    <DescriptionInput name='description' onChange={e=>setDescription(e.target.value)}></DescriptionInput>
                </FormContainer>
                <SubmitButton onClick={fileUpload}>Submit</SubmitButton>
            </div>
        </Container>
    )
}








// class AddContent extends Component {

//     state = {
//         title: '',
//         city: '',
//         country: '',
//         description: '',
//     }

//     onChange = (e) => {
//         const { value, name } = e.target
//         this.setState({
//             [name]: value
//         })
//     }

//     submit = (image) => {
//         const { title, city, country, description } = this.state
//         const category = document.getElementById('category').value
//         // if(category && title && city && country && description) {
//             db.collection('posts').add({
//                 title,
//                 category,
//                 city,
//                 country,
//                 description,
//                 timestamp: Date.now(),
//                 image,
//             }).then(console.log('uploaded'))
//         // }
//     }

//     fileUpload = () => {
//         const file = document.getElementById('input').files[0]
//         const submit = this.submit
//         if(file) {
//             const ref1 = firebase.storage().ref().child(file.name);
//             const metadata = {
//                 contentType: file.type
//             }
//             ref1.put(file, metadata).then(function(snapshot) {
//                 snapshot.ref.getDownloadURL()
//                 .then(downloadURL => {
//                     submit(downloadURL)
//                 })
//                 .catch(error => console.log(error))
//             });
//         }
//     }

//     render() {
//         return(
//             <div>
//                 <input type='file' id='input'></input>
//                 <form>
//                     <label>Title</label>
//                     <input name='title' onChange={this.onChange}></input>
//                     <label htmlFor='category'>Category</label>
//                     <select name='category' id='category'>
//                         <option value='' defaultValue>Select category</option>
//                         <option value='restaurant'>Restaurant</option>
//                         <option value='entertainment'>Entertainment</option>
//                         <option value='adventure'>Adventure</option>
//                         <option value='sightseeing'>Sightseeing</option>
//                         <option value='shopping'>Shopping</option>
//                         <option value='museum'>Museum</option>
//                     </select>
//                     <label>City</label>
//                     <input name='city' onChange={this.onChange}></input>
//                     <label>Country</label>
//                     <input name='country' onChange={this.onChange}></input>
//                     <label>Description</label>
//                     <input name='description' onChange={this.onChange}></input>
//                 </form>
//                 <button onClick={this.fileUpload}>Submit</button>
//             </div>
//         )
//     }
// }

export default AddContent