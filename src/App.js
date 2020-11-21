import React, { 
  useState, 
  useEffect,
} from 'react'
import Header from './Header/Header'
import VerticalScroll from './VeritcalScroll/VerticalScroll'
import PhotoFeatured from './PhotoFeatured/PhotoFeatured'
// import AddContent from './AddContent/AddContent'
import GetPhotos from './GetPhotosHomepage/GetPhotosHomepage'
import Profile from './Profile/Profile'
// import Login from './Login/Login'
// import Signup from './SignUp/SignUp'
import firebase from 'firebase'
// import { firebaseApp } from './Firebase'

const App = () => {
  const [user, setUser] = useState()
  const [homePhotoInformation, setHomePhotoInformation] = useState(null)
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
      {pageRoute==='GetPhotos' ? 
      <Header setHomePhotoInformation={setHomePhotoInformation} setPageRoute={setPageRoute} user={user}/>
      :
      null
      }

      {/* <Autocomplete /> */}
      {/* <Signup /> */}
      {/* <AddContent user={user} /> */}

      {(() => {
        switch (pageRoute) {
          case 'GetPhotos':
            // return null
            return (
              <VerticalScroll>
                <GetPhotos 
                  homePhotoInformation={homePhotoInformation} 
                  setHomePhotoInformation={setHomePhotoInformation} 
                  setPageRoute={setPageRoute} 
                  setPhotoInformation={setPhotoInformation} 
                />
              </VerticalScroll>
            )
          case 'PhotoFeatured':
            return <PhotoFeatured 
              user={user} 
              setHomePhotoInformation={setHomePhotoInformation} 
              setPageRoute={setPageRoute} 
              setPhotoInformation={setPhotoInformation} 
              photoInformation={photoInformation} 
            />
          case 'Profile':
            return <Profile 
              setHomePhotoInformation={setHomePhotoInformation} 
              setPhotoInformation={setPhotoInformation} 
              user={user} 
              setPageRoute={setPageRoute} 
            />;
          case 'Login':
            return <Login setUser={setUser} user={user} />
          default:
            return null;
        }
      })()}
    </div>
  );
}



export default App;