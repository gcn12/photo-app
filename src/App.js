import React, { useState, useEffect } from 'react'
import UploadPhoto from './UploadPhoto/UploadPhoto'
// import AddContent from './AddContent/AddContent'
// import GetPhotos from './GetPhotosHomepage/GetPhotosHomepage'
import Login from './Login/Login'
import Signup from './SignUp/SignUp'
import firebase from 'firebase'

const App = () => {

  const [user, setUser] = useState()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user) {
        setUser(user.id)
        console.log('signed in')
      }
    })
  })

  return (
    <div>
      <UploadPhoto />
      <Login setUser={setUser} user={user} />
      <Signup />
      {/* <AddContent /> */}
      {/* <GetPhotos /> */}
    </div>
  );
}

export default App;



// const dataTest = {
//   continents: {
//     Asia: {
//       cities: {

//       }
//     },
//     Africa: {

//     },
//     NorthAmerica: {

//     },
//     SouthAmerica: {

//     },
//     Oceania: {

//     },
//     Europe: {

//     }
//   },
//   Posts: {
//     1: {
//       country: 'country',
//       city: 'city',
//       category: 'category',
//       timestamp: 'timestamp',
//       author: 'author',
//       photo: 'url'
//     }
//   },
//   Users : {
//     username: {
//       postsCreated: ['listID', 'listID2'],
//       lists: {
//         listName: ['listID', 'listID2']
//       }
//     }
//   }
// }