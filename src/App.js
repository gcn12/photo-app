import React, { 
  useState, 
  useEffect,
} from 'react'
import Header from './Header/Header'
import VerticalScroll from './VeritcalScroll/VerticalScroll'
import Discover from './Discover/Discover'
import FeaturedPost from './FeaturedPost/FeaturedPost'
import MainPhotoDisplay from './MainPhotoDisplay/MainPhotoDisplay'
import Profile from './Profile/Profile'
import Login from './Login/Login'
import PublicProfile from './PublicProfile/PublicProfile'
import Footer from './Header/Footer'
// import TestFile from './TestFile'
import AddContent from './AddContent/AddContent'
import Signup from './SignUp/SignUp'
import firebase from 'firebase'
import { db } from './Firebase'
import { Route, Switch } from 'react-router-dom'
// import { firebaseApp } from './Firebase'

const App = () => {
  const [user, setUser] = useState()
  const [homePhotoInformation, setHomePhotoInformation] = useState(null)
  const [photoInformation, setPhotoInformation] = useState(null)
  const [userData, setUserData] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [displayView, setDisplayView] = useState(false)

  const getFeaturedPhotoInfo = (url, username) => {
    db.collection('posts')
    .where('url', '==', url)
    .where('username', '==', username)
    .get()
    .then(data=> {
      let arr = []
      data.forEach(item=> {
        arr.push(item.data())
      })
      const info = arr[0]
      info['username'] = username
      setPhotoInformation(info)
      window.scrollTo({top: 0})
    })
  }


  const getUserProfile = (username) => {
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
    .orderBy('timestamp', 'desc')
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
      {/* <TestFile />  */}

      <Route path='/photo-app/' render={(props)=> (
        <Header {...props} displayView={displayView} setDisplayView={setDisplayView} setHomePhotoInformation={setHomePhotoInformation} user={user}/>
      )} />

      <Route path='/photo-app/' render={(props)=> (
        <Footer {...props} />
      )} />
        
      <Switch>

        <Route exact path='/photo-app/signup/' render={(props)=> (
          <Signup {...props}/>
        )} />

        <Route exact path='/photo-app/login' render={(props)=> (
          <Login setUser={setUser} {...props}/>
        )} />
 
        <Route path='/photo-app/profile/:route?' render={(props)=>( <Profile 
          setUser={setUser}
          getFeaturedPhotoInfo={getFeaturedPhotoInfo}
          setHomePhotoInformation={setHomePhotoInformation} 
          setPhotoInformation={setPhotoInformation} 
          user={user} 
          {...props}
        />)} />

        <Route exact path='/photo-app/upload' render={(props)=> (<AddContent 
          getFeaturedPhotoInfo={getFeaturedPhotoInfo}
          setPhotoInformation={setPhotoInformation}
          user={user} 
          {...props}
          /> 
        )} />

        <Route path='/photo-app/profiles/:username' render={(props)=>(<PublicProfile 
          getUserProfile={getUserProfile}
          userPosts={userPosts} 
          userData={userData} 
          user={user} 
          getFeaturedPhotoInfo={getFeaturedPhotoInfo}
          {...props}
          />
        )} />

        <Route exact path='/photo-app/post/:username/:url' render={(props)=> (
          <FeaturedPost 
          getUserProfile={getUserProfile}
          getFeaturedPhotoInfo={getFeaturedPhotoInfo}
          user={user} 
          setHomePhotoInformation={setHomePhotoInformation} 
          setPhotoInformation={setPhotoInformation} 
          photoInformation={photoInformation} 
          {...props}
        />
        )} />

        <Route exact path='/photo-app/discover' render={()=> (
          <Discover />
        )} />

        <Route exact path='/photo-app/posts/:sort?' render={(props)=> (
          <VerticalScroll scrollHeight='87vh'>
            <MainPhotoDisplay 
              displayView={displayView}
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
              homePhotoInformation={homePhotoInformation} 
              setHomePhotoInformation={setHomePhotoInformation} 
              setPhotoInformation={setPhotoInformation} 
              {...props}
            />
          </VerticalScroll>
        )} />
      </Switch>
    </div>
  );
}

export default App;