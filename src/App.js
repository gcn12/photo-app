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
import SearchPage from './SearchPage/SearchPage'
import Login from './Login/Login'
import PublicProfile from './PublicProfile/PublicProfile'
import Footer from './Header/Footer'
import algoliasearch from 'algoliasearch'
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
  const [searchResults, setSearchResults] = useState([])
  const [searchQueries, setSearchQueries] = useState('all results')
  const [query, setQuery] = useState('')
  
  //search criteria:
  const [sortCriteria, setSortCriteria] = useState({
    city: '',
    country: '',
    continent: '',
    category: 'all categories',
    views: false,
    new: false,
    rating: false,
  })
  const [startAfter, setStartAfter] = useState('')

  const sort = (criteriaObject, isNewSort) => {
    setSortCriteria(criteriaObject)
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
    if(criteriaObject.category.length > 0 && criteriaObject.category!=='all categories') {
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
    const limit = 8
    sortQuery
    .limit(limit)
    .get()
    .then(data=> {
      let dataArray = []
      data.forEach(item=> {
        dataArray.push(item.data())
      })
      if(dataArray.length === 0 || dataArray.length<limit) {
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
        setTimeout(()=>setHomePhotoInformation([...dataArray]), 0)

      }else{
        setTimeout(()=>setHomePhotoInformation([...homePhotoInformation, ...dataArray]), 0)
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
      const limit = 8
      setSortCriteria(criteria)
      initialSort
      .limit(limit)
      .get()
      .then(data=> {
        let dataArray = []
        data.forEach(item=> {
          dataArray.push(item.data())
        })
        if(dataArray.length === 0 || dataArray.length<limit) {
          setIsLoadMore(false)
        }else{
          setIsLoadMore(true)
        }
        setStartAfter(data.docs[data.docs.length-1])
        setHomePhotoInformation([...dataArray])
        // setIsMainPhotosVisible(true)
      })
    }
    // }, [pathname])
    // eslint-disable-next-line
  }, [])

  
  const search = (resultCriteria) => { 
    // setSearchResults([])
    const searchClient = algoliasearch(
      'VNSU9OYWB2',
      '6478d10ccc9941fe49a73aeb6ba2e73f'
    )

    const citiesQuery = {
      indexName: 'cities',
      query: query,
      params: {
        hitsPerPage: 6,
        attributesToRetrieve: ['city', 'country', 'image'],
      }
    }

    const usersQuery = {
      indexName: 'users',
      query: query,
      params: {
        hitsPerPage: 10,
        attributesToRetrieve: ['name', 'username', 'profileImage'],
      }
    }

    const postsQuery = {
      indexName: 'posts',
      query: query,
      params: {
        hitsPerPage: 6,
        attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city', 'previewDescription'],
      }
    }

    const countriesQuery = {
      indexName: 'countries',
      query: query,
      params: {
        hitsPerPage: 2,
        attributesToRetrieve: ['countryOnly', 'image',],
      }
    }

    const queries = [] 

    if(resultCriteria === 'posts' || resultCriteria === 'all results') {
      queries.push(postsQuery)
    }
    if(resultCriteria === 'people' || resultCriteria === 'all results') {
      queries.push(usersQuery)
    }
    if(resultCriteria === 'places' || resultCriteria === 'all results') {
      queries.push(countriesQuery)
      queries.push(citiesQuery)
    }

    let resultsArray = []
    if(query.length > 0) {
    searchClient.multipleQueries(queries).then(({ results }) => {
      if(resultCriteria==='all results'){
        if(results[0]?.hits.length>0) {
          resultsArray.push([...results[0].hits])
        }else{
          resultsArray.push([])
        }
        if(results[1]?.hits?.length>0) {
          resultsArray.push([...results[1].hits])
        }else{
          resultsArray.push([])
        }
        if(results[2]?.hits?.length>0||results[3]?.hits?.length>0) {
          resultsArray.push([...results[2].hits, ...results[3].hits])
        }else{
          resultsArray.push([])
        }
        // if(results[3]?.hits?.length>0) {
        //   resultsArray.push([...results[3].hits])
        // }else{
        //   resultsArray.push([])
        // }

      }else if(resultCriteria==='posts'){
        if(results[0]?.hits.length>0) {
          resultsArray = [results[0].hits, [], []]
        }
      }else if(resultCriteria==='people'){
        if(results[0]?.hits.length>0) {
          resultsArray = [[], results[0].hits, []]
        }
      }else if(resultCriteria==='places'){
        if(results[0]?.hits.length>0 || results[1]?.hits.length>0) {
          resultsArray = [[], [], [...results[0].hits, ...results[1].hits]]
        }
      }
      if(resultsArray.length> 0){
        setSearchResults([...resultsArray])
      }else{
        setSearchResults('No results')
      }
    });
    }else{
      setSearchResults([])
    }
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
        <Header setQuery={setQuery} search={search} setSearchQueries={setSearchQueries} searchQueries={searchQueries} {...props} setSearchResults={setSearchResults} sort={sort} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} setIsMainPhotosVisible={setIsMainPhotosVisible} displayView={displayView} setDisplayView={setDisplayView} setHomePhotoInformation={setHomePhotoInformation} user={user}/>
      )} />


      <Route path='/photo-app/' render={(props)=> (
        <Footer {...props} user={user} />
      )} />
        
      <Switch>

        <Route exact path='/photo-app/search' render={(props) => (
          <SearchPage {...props} setHomePhotoInformation={setHomePhotoInformation} sort={sort} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} searchResults={searchResults} />
        )} />

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