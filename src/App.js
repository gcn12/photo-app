import React, { useState, useEffect } from 'react'
import UploadPhoto from './UploadPhoto/UploadPhoto'
import PhotoFeatured from './PhotoFeatured/PhotoFeatured'
// import AddContent from './AddContent/AddContent'
import GetPhotos from './GetPhotosHomepage/GetPhotosHomepage2'
// import Login from './Login/Login'
// import Signup from './SignUp/SignUp'
import firebase from 'firebase'
// import { firebaseApp } from './Firebase'

const App = () => {
  // eslint-disable-next-line     
  const [user, setUser] = useState()
  // eslint-disable-next-line 
  const [photoInformation, setPhotoInformation] = useState(null)
  const [pageRoute, setPageRoute] = useState(false)
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user) {
        setUser(user.id)
        // console.log(user)
        console.log('signed in')
      }
    })
  }, [])

  return (
    <div>
      <button onClick={()=>console.log(photoInformation)}>PhotoInfo</button>
      <UploadPhoto />
      {/* <Login setUser={setUser} user={user} /> */}
      {/* <Signup /> */}
      {/* <AddContent /> */}
      {pageRoute ? 
      <PhotoFeatured photoInformation={photoInformation} />
      :
      <GetPhotos setPageRoute={setPageRoute} setPhotoInformation={setPhotoInformation} />
      }
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