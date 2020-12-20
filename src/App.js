import React, { 
  useState, 
  useEffect,
} from 'react'
import Header from './Header/Header'
// import VerticalScroll from './VeritcalScroll/VerticalScroll'
import Discover from './Discover/Discover'
import FeaturedPost from './FeaturedPost/FeaturedPost'
import MainPhotoDisplay from './MainPhotoDisplay/MainPhotoDisplayVertical'
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
// import { SubmitButton, } from './AddContent/AddContent.styles'
// import { firebaseApp } from './Firebase'

const App = (props) => {
  const [user, setUser] = useState()
  const [homePhotoInformation, setHomePhotoInformation] = useState(null)
  const [photoInformation, setPhotoInformation] = useState(null)
  const [userData, setUserData] = useState([])
  const [userPosts, setUserPosts] = useState([])
  const [displayView, setDisplayView] = useState(true)
  const [isMainPhotosVisible, setIsMainPhotosVisible] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(true)
  
  //search criteria:
  const [sortCriteria, setSortCriteria] = useState({
    city: '',
    country: '',
    continent: '',
    category: '',
    views: false,
    new: false,
    rating: false,
  })
  const [startAfter, setStartAfter] = useState('')

  const sort = (criteriaObject, isNewSort) => {
    let sortQuery = db.collection('preview-posts')
    if(criteriaObject.city.length > 0) {
      sortQuery = sortQuery.where('city', '==', criteriaObject.city)
    }
    if(criteriaObject.country.length > 0) {
      sortQuery = sortQuery.where('country', '==', criteriaObject.country)
    }
    if(criteriaObject.continent.length > 0) {
      sortQuery = sortQuery.where('continent', '==', criteriaObject.continent)
    }
    if(criteriaObject.category.length > 0) {
      sortQuery = sortQuery.where('category', '==', criteriaObject.category)
    }
    if(criteriaObject.views) {
      sortQuery = sortQuery.orderBy('views', 'desc')
    }
    if(criteriaObject.new) {
      sortQuery = sortQuery.orderBy('timestamp', 'desc')
    }
    if(criteriaObject.rating) {
      sortQuery = sortQuery.orderBy('ratio', 'desc')
    }
    if(!isNewSort) {
      sortQuery =  sortQuery.startAfter(startAfter)
    }
    sortQuery
    .limit(8)
    .get()
    .then(data=> {
      let dataArray = []
      data.forEach(item=> {
        dataArray.push(item.data())
      })
      if(dataArray.length === 0) {
        setIsLoadMore(false)
      }else{
        setIsLoadMore(true)
      }
      setStartAfter(data.docs[data.docs.length-1])
      if(isNewSort) {
        // for (let i = 0; i < dataArray.length; i++) {
        //   if(dataArray.id === homePhotoInformation.id && i === dataArray.length - 1) {
        //     setIsMainPhotosVisible(true)
        //   }else{
        //   }
        // }
        setTimeout(()=>setHomePhotoInformation([...dataArray]), 100)

      }else{
        setTimeout(()=>setHomePhotoInformation([...homePhotoInformation, ...dataArray]), 100)
      }
      // setIsMainPhotosVisible(true)
    })
  }
  
  // const { pathname } = props.location

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user) {
        setUser(user.uid)
      }
    })
    if(props?.location?.pathname) {
      let initialSort = db.collection('preview-posts')
      let criteria = sortCriteria
      if(props?.location?.pathname?.includes('/posts/popular')|| props?.location?.pathname === '/photo-app/posts') {
        initialSort = initialSort.orderBy('views', 'desc')
        criteria['views'] = true
      }else{
        criteria['views'] = false
      }
      if(props?.location?.pathname?.includes('/posts/new')) {
        initialSort = initialSort.orderBy('timestamp', 'desc')
        criteria['new'] = true
      }else{
        criteria['new'] = false
      }
      if(props?.location?.pathname?.includes('/posts/rating')) {
        initialSort = initialSort.orderBy('ratio', 'desc')
        criteria['rating'] = true
      }else{
        criteria['rating'] = false
      }
      setSortCriteria(criteria)
      initialSort
      .limit(8)
      .get()
      .then(data=> {
        let dataArray = []
        data.forEach(item=> {
          dataArray.push(item.data())
        })
        if(dataArray.length === 0) {
          setIsLoadMore(false)
        }else{
          setIsLoadMore(true)
        }
        setStartAfter(data.docs[data.docs.length-1])
        setHomePhotoInformation([...dataArray])
        // setIsMainPhotosVisible(true)
      })
    }
    // eslint-disable-next-line
  // }, [pathname])
}, [])

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

  // const test = () => {
  //   console.log(props)
  // }

  return (
    <div>
      <Route path='/photo-app/' render={(props)=> (
        <Header {...props} sort={sort} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} setIsMainPhotosVisible={setIsMainPhotosVisible} displayView={displayView} setDisplayView={setDisplayView} setHomePhotoInformation={setHomePhotoInformation} user={user}/>
        )} />


      <Route path='/photo-app/' render={(props)=> (
        <Footer {...props} user={user} />
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
            <MainPhotoDisplay 
              isLoadMore={isLoadMore}
              setSortCriteria={setSortCriteria}
              sortCriteria={sortCriteria}
              sort={sort}
              isMainPhotosVisible={isMainPhotosVisible}
              setIsMainPhotosVisible={setIsMainPhotosVisible}
              displayView={displayView}
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
              homePhotoInformation={homePhotoInformation} 
              setHomePhotoInformation={setHomePhotoInformation} 
              setPhotoInformation={setPhotoInformation} 
              {...props}
            />
        )} />
      </Switch>
        {/* <div style={{display: 'flex', justifyContent: 'center'}}>
            <SubmitButton onClick={null}>Load more</SubmitButton>
        </div> */}
      {/* <button onClick={test}>Delete</button> */}
      {/* <TestFile homePhotoInformation={homePhotoInformation}  setHomePhotoInformation={setHomePhotoInformation}  />  */}
    </div>
  );
}

export default App;