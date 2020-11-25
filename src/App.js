import React, { 
  useState, 
  useEffect,
} from 'react'
import Header from './Header/Header'
import VerticalScroll from './VeritcalScroll/VerticalScroll'
import PhotoFeatured from './PhotoFeatured/PhotoFeatured'
import AddContent from './AddContent/AddContent'
import GetPhotos from './GetPhotosHomepage/GetPhotosHomepage'
import Profile from './Profile/Profile'
import Login from './Login/Login'
// import Signup from './SignUp/SignUp'
import firebase from 'firebase'
import { db } from './Firebase'
// import { firebaseApp } from './Firebase'

const App = () => {
  const [user, setUser] = useState()
  const [homePhotoInformation, setHomePhotoInformation] = useState(null)
  const [photoInformation, setPhotoInformation] = useState(null)
  const [pageRoute, setPageRoute] = useState('GetPhotos')

  const getFeaturedPhotoInfo = (docID) => {
    db.collection('posts').doc(docID)
    .get()
    .then(data=> {
      setPhotoInformation(data.data())
      setPageRoute('PhotoFeatured')
      window.scrollTo({top: 0})
    })
  }
  
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

      {/* <Signup /> */}

      {(() => {
        switch (pageRoute) {
          case 'Upload':
            return(
              <AddContent 
              user={user} 
              setPageRoute={setPageRoute} 
              /> 
            )
          case 'GetPhotos':
            // return null
            return (
              <VerticalScroll scrollHeight='93vh'>
                <GetPhotos 
                  getFeaturedPhotoInfo={getFeaturedPhotoInfo}
                  homePhotoInformation={homePhotoInformation} 
                  setHomePhotoInformation={setHomePhotoInformation} 
                  setPageRoute={setPageRoute} 
                  setPhotoInformation={setPhotoInformation} 
                />
              </VerticalScroll>
            )
          case 'PhotoFeatured':
            return <PhotoFeatured 
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
              user={user} 
              setHomePhotoInformation={setHomePhotoInformation} 
              setPageRoute={setPageRoute} 
              setPhotoInformation={setPhotoInformation} 
              photoInformation={photoInformation} 
            />
          case 'Profile':
            return <Profile 
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
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