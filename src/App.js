import React, { 
  useState, 
  useEffect,
} from 'react'
import Header from './Header/Header'
import VerticalScroll from './VeritcalScroll/VerticalScroll'
import FeaturedPost from './FeaturedPost/FeaturedPost'
import GetPhotos from './GetPhotosHomepage/GetPhotosHomepage'
import Profile from './Profile/Profile'
import Login from './Login/Login'
import PublicProfile from './PublicProfile/PublicProfile'
// import TestFile from './TestFile'
import AddContent from './AddContent/AddContent'
import Signup from './SignUp/SignUp'
import firebase from 'firebase'
import { db } from './Firebase'
// import { firebaseApp } from './Firebase'

const App = () => {
  const [user, setUser] = useState()
  const [homePhotoInformation, setHomePhotoInformation] = useState(null)
  const [photoInformation, setPhotoInformation] = useState(null)
  const [pageRoute, setPageRoute] = useState('GetPhotos')
  const [userData, setUserData] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [displayView, setDisplayView] = useState(false)

  const getFeaturedPhotoInfo = (docID, username) => {
    db.collection('posts').doc(docID)
    .get()
    .then(data=> {
      const info = data.data()
      info['username'] = username
      setPhotoInformation(info)
      setPageRoute('FeaturedPost')
      window.scrollTo({top: 0})
    })
  }

  const getUserProfile = (username) => {
    setPageRoute('PublicProfile')
    db.collection('users')
    .where('username', '==', username)
    .get()
    .then(data=> {
        let dataArray = []
        data.forEach(item=> {
            dataArray.push(item.data())
        })
        setUserData(dataArray)
    })

    db.collection('preview-posts')
    .where('username', '==', username)
    .get()
    .then(data=> {
        const postArray = []
        data.forEach(item=> {
          postArray.push(item.data())
        })
        setUserPosts(postArray)
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
      {pageRoute==='GetPhotos' || pageRoute==='FeaturedPost'  ? 
      <Header displayView={displayView} setDisplayView={setDisplayView} setHomePhotoInformation={setHomePhotoInformation} setPageRoute={setPageRoute} user={user}/>
      :
      null
      }


      {/* <TestFile />  */}
      
      
      

      {(() => {
        switch (pageRoute) {
          case 'PublicProfile':
            return <PublicProfile userPosts={userPosts} userData={userData} user={user} getFeaturedPhotoInfo={getFeaturedPhotoInfo}/>
          case 'Upload':
            return(
              <AddContent 
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
              setPhotoInformation={setPhotoInformation}
              user={user} 
              setPageRoute={setPageRoute} 
              /> 
            )
          case 'GetPhotos':
            return (
              <VerticalScroll scrollHeight='87vh'>
                <GetPhotos 
                  displayView={displayView}
                  getFeaturedPhotoInfo={getFeaturedPhotoInfo}
                  homePhotoInformation={homePhotoInformation} 
                  setHomePhotoInformation={setHomePhotoInformation} 
                  setPageRoute={setPageRoute} 
                  setPhotoInformation={setPhotoInformation} 
                />
              </VerticalScroll>
            )
          case 'FeaturedPost':
            return <FeaturedPost 
              getUserProfile={getUserProfile}
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
              user={user} 
              setHomePhotoInformation={setHomePhotoInformation} 
              setPageRoute={setPageRoute} 
              setPhotoInformation={setPhotoInformation} 
              photoInformation={photoInformation} 
            />
          case 'Profile':
            return <Profile 
              setUser={setUser}
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
              setHomePhotoInformation={setHomePhotoInformation} 
              setPhotoInformation={setPhotoInformation} 
              user={user} 
              setPageRoute={setPageRoute} 
            />;
          case 'Login':
            return <Login setPageRoute={setPageRoute} setUser={setUser} user={user} />
          case 'Signup':
            return <Signup setUser={setUser} setPageRoute={setPageRoute} />
          default:
            return null;
        }
      })()}
    </div>
  );
}

export default App;