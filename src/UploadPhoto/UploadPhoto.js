import React from 'react'
import './UploadPhoto.css'
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

const TakePhoto = () => {
    return(
        <div className='test'>
            <ul>
                <li>NORTH AMERICA</li>
                <li>SOUTH AMERICA</li>
                <li>EUROPE</li>
                <li>OCEANIA</li>
                <li>ASIA</li>
                <li>AFRICA</li>
            </ul>
            {/* <button onClick={test}>Query</button>
            <button onClick={update}>Update</button>
            <button onClick={deleteItem}>Delete</button> */}
        </div>
    )
}

export default TakePhoto