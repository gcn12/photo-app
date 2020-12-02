import React from 'react'
import { db } from '../Firebase'
import Subheader from './Subheader'
import {
    Container,
    UL,
    LI,
    Border,
    Navigation,
} from './Header.styles'

const Header = (props) => {

    const getPhotoInfo = (continent) => {
        const photosArray = []
        db.collection('posts').where('continent', '==', continent)
        .get()
        .then(photos => {
            photos.docs.forEach(photo=> {
                photosArray.push(photo.data())
            })
            console.log(photosArray)
            props.setHomePhotoInformation(photosArray)
        })
    }

    return(
        <Border>
            <Container className='test'>
                <UL>
                    <LI onClick={()=> getPhotoInfo('North America')}>Discover</LI>
                    {/* <LI onClick={()=> getPhotoInfo('South America')}>SOUTH AMERICA</LI> */}
                </UL>
                {props.user ? 
                <Navigation onClick={()=>props.setPageRoute('Upload')}>Upload</Navigation>
                :
                null
                }
                <Navigation>|</Navigation>
                {props.user ? 
                <Navigation onClick={()=>props.setPageRoute('Profile')}>Profile</Navigation>
                :
                <Navigation onClick={()=>props.setPageRoute('Login')}>Log in</Navigation>
                } 
            </Container>
            <Subheader setHomePhotoInformation={props.setHomePhotoInformation}/>
            <div style={{marginBottom: '10px'}}></div>
        </Border>
    )
}

export default Header




// import React from 'react'
// import { SubmitButton } from '../Login/Login.styles'
// import { db } from '../Firebase'
// import Subheader from './Subheader'
// import {
//     Container,
//     UL,
//     LI,
//     Border,
// } from './Header.styles'

// const Header = (props) => {

//     const getPhotoInfo = (continent) => {
//         const photosArray = []
//         db.collection('posts').where('continent', '==', continent)
//         .get()
//         .then(photos => {
//             photos.docs.forEach(photo=> {
//                 photosArray.push(photo.data())
//             })
//             console.log(photosArray)
//             props.setHomePhotoInformation(photosArray)
//         })
//     }

//     return(
//         <Border>
//             <Container className='test'>
//                 <UL>
//                     <LI onClick={()=> getPhotoInfo('North America')}>NORTH AMERICA</LI>
//                     <LI onClick={()=> getPhotoInfo('South America')}>SOUTH AMERICA</LI>
//                     <LI onClick={()=> getPhotoInfo('Europe')}>EUROPE</LI>
//                     <LI onClick={()=> getPhotoInfo('Oceania')}>OCEANIA</LI>
//                     <LI onClick={()=> getPhotoInfo('Asia')}>ASIA</LI>
//                     <LI onClick={()=> getPhotoInfo('Africa')}>AFRICA</LI>
//                 </UL>
//                 {props.user ? 
//                 <SubmitButton onClick={()=>props.setPageRoute('Upload')}>Upload</SubmitButton>
//                 :
//                 null
//                 }
//                 {props.user ? 
//                 <SubmitButton onClick={()=>props.setPageRoute('Profile')}>Profile</SubmitButton>
//                 :
//                 <SubmitButton onClick={()=>props.setPageRoute('Login')}>Log in</SubmitButton>
//                 } 
//             </Container>
//             <Subheader />
//         </Border>
//     )
// }

// export default Header




// import { db } from '../Firebase'
// import firebase from 'firebase'

// const test = () => {
//     db.collection('users')
//     .get()
//     .then((snapshot) => {
//         snapshot.docs.forEach(doc => {console.log(doc.data())
//         })
//     })
// }

// const update = () => {
//     const ref = db.collection('users')
//     ref.doc('hello').set({
//         lists: {
//             'Fav': [
//                 1, 2, 4
//             ]
//         },
//         postsCreated: [
//             43, 242, 1321
//         ]
//     }).then(console.log('added'))
// }

// const deleteItem = () => {
//     const ref = db.collection('users').doc('hello')
//     ref.update({
//         'lists.Fav': firebase.firestore.FieldValue.delete()
//     }).then(console.log('deleted'))
// }