import React, { 
  useState, 
  useEffect,
} from 'react'
import Header from './Header/Header'
import PhotoFeatured from './PhotoFeatured/PhotoFeatured'
// import AddContent from './AddContent/AddContent'
import GetPhotos from './GetPhotosHomepage/GetPhotosHomepage2'
import Profile from './Profile/Profile'
// import Login from './Login/Login'
// import Signup from './SignUp/SignUp'
// import Autocomplete from './Autocomplete/Autocomplete'
import firebase from 'firebase'
// import { firebaseApp } from './Firebase'

const App = () => {
  // eslint-disable-next-line     
  const [user, setUser] = useState()
  const [photoInformation, setPhotoInformation] = useState(null)
  const [pageRoute, setPageRoute] = useState('GetPhotos')
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user) {
        setUser(user.uid)
      }
    })
  }, [])

  return (
    <div>
      <Header setPageRoute={setPageRoute} user={user}/>
      {/* <Autocomplete /> */}
      {/* <Login setUser={setUser} user={user} /> */}
      {/* <Signup /> */}
      {/* <AddContent /> */}

      {(() => {
        switch (pageRoute) {
          case 'GetPhotos':
            return <GetPhotos setPageRoute={setPageRoute} setPhotoInformation={setPhotoInformation} />
          case 'PhotoFeatured':
            return <PhotoFeatured setPageRoute={setPageRoute} setPhotoInformation={setPhotoInformation} photoInformation={photoInformation} />
          case 'Profile':
            return <Profile setPageRoute={setPageRoute} />;
          default:
            return null;
        }
      })()}
      
    </div>
  );
}



export default App;