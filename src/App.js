import React, { 
  useEffect, 
// useState,
} from 'react'
import { connect } from 'react-redux'
import { 
  isLoadMore, 
  user, 
  photoInformation, 
  homePhotoInformation,
  userData,
  userPosts,
  searchResults,
  startAfter,
  sortCriteria,
  userInformation,
} from './Redux/Actions/appActions'
import Header from './Header/Header'
import CollectionsComponent from './Collections/CollectionsComponent'
// import NewLogin from './Login/NewLogin'
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

const App = (props) => {

  // const [showLogin, setShowLogin] = useState(false)

  const sort = (criteriaObject, isNewSort) => {
    props.dispatch(sortCriteria(criteriaObject))
    let sortQuery = db.collection('preview-posts')
    if(criteriaObject.location.length > 0) {
      sortQuery = sortQuery.where('location', '==', criteriaObject.location)
    }
    if(criteriaObject.country.length > 0) {
      sortQuery = sortQuery.where('country', '==', criteriaObject.country)
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
      sortQuery =  sortQuery.startAfter(props.startAfter)
    }
    const limit = 12
    sortQuery
    .limit(limit)
    .get()
    .then(data=> {
      let dataArray = []
      data.forEach(item=> {
        dataArray.push(item.data())
      })
      if(dataArray.length === 0 || dataArray.length<limit) {
        props.dispatch(isLoadMore(false))
      }else{
        props.dispatch(isLoadMore(true))
      }
      props.dispatch(startAfter(data.docs[data.docs.length-1]))
      if(isNewSort) {
        setTimeout(()=>props.dispatch(homePhotoInformation([...dataArray])), 0)

      }else{
        setTimeout(()=>props.dispatch(homePhotoInformation([...props.homePhotoInformation, ...dataArray])), 0)
      }
    })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userData)=> {
      if(userData) {
        props.dispatch(user(userData.uid))
        db.collection('users')
        .doc(userData.uid)
        .get()
        .then(item=> {
          props.dispatch(userInformation(item.data()))
        })
      }
    })
    if(props?.location?.pathname) {
      let initialSort = db.collection('preview-posts')
      let criteria = props.sortCriteria
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
      const limit = 12
      props.dispatch(sortCriteria(criteria))
      initialSort
      .limit(limit)
      .get()
      .then(data=> {
        let dataArray = []
        data.forEach(item=> {
          dataArray.push(item.data())
        })
        if(dataArray.length === 0 || dataArray.length<limit) {
          props.dispatch(isLoadMore(false))
        }else{
          props.dispatch(isLoadMore(true))
        }
        props.dispatch(startAfter(data.docs[data.docs.length-1]))
        props.dispatch(homePhotoInformation([...dataArray]))
      })
    }
    // eslint-disable-next-line
  }, [])

  
  const search = (resultCriteria, filter, query) => { 
    console.log(query)
    const searchClient = algoliasearch(
      'VNSU9OYWB2',
      '6478d10ccc9941fe49a73aeb6ba2e73f'
    )

    const citiesQuery = {
      indexName: 'locations',
      query: props.query,
      params: {
        hitsPerPage: 6,
        attributesToRetrieve: ['location', 'image'],
      }
    }
    if(query) {
      citiesQuery['query'] = query
    }

    const usersQuery = {
      indexName: 'users',
      query: props.query,
      params: {
        hitsPerPage: 10,
        attributesToRetrieve: ['name', 'username', 'profileImage', 'author'],
      }
    }
    if(query) {
      usersQuery['query'] = query
    }

    const postsQuery = {
      indexName: 'posts',
      query: props.query,
      params: {
        hitsPerPage: 6,
        attributesToRetrieve: ['postID', 'smallImage', 'category', 'title', 'country', 'image', 'username', 'url', 'location', 'previewDescription'],
      }
    }
    if(query) {
      postsQuery['query'] = query
    }

    if (filter) {
      postsQuery['filters'] = filter
    }

    const countriesQuery = {
      indexName: 'countries',
      query: props.query,
      params: {
        hitsPerPage: 2,
        attributesToRetrieve: ['country', 'image',],
      }
    }
    if(query) {
      countriesQuery['query'] = query
    }

    const queries = [] 

    if(resultCriteria === 'all results') {
      queries.push(postsQuery)
    }else if (resultCriteria === 'posts') {
      postsQuery.params.hitsPerPage = 12
      queries.push(postsQuery)
    }
    if(resultCriteria === 'all results') {
      queries.push(usersQuery)
    }else if (resultCriteria === 'people') {
      usersQuery.params.hitsPerPage = 12
      queries.push(usersQuery)
    }
    if(resultCriteria === 'all results') {
      queries.push(countriesQuery)
      queries.push(citiesQuery)
    }else if (resultCriteria === 'places') {
      countriesQuery.params.hitsPerPage = 5
      citiesQuery.params.hitsPerPage = 7
      queries.push(countriesQuery)
      queries.push(citiesQuery)
    }

    let resultsArray = []
    if(props.query.length > 0 || query.length > 0) {
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
        let isNoResults = false
        for (let arr of resultsArray) {
          if (arr.length > 0) {
            isNoResults = true
          }
        }
        if(!isNoResults || resultsArray.length === 0){
          props.dispatch(searchResults('No results'))
        }else{
          props.dispatch(searchResults(resultsArray))
        }
        console.log(resultsArray)
      });
    }
  }

  const getUserProfile = (userID) => {
    db.collection('users')
    .where('id', '==', userID)
    .get()
    .then(data=> {
      let dataArray = []
      data.forEach(item=> {
        dataArray.push(item.data())
      })
      props.dispatch(userData(dataArray))
    })

    db.collection('preview-posts')
    .where('userID', '==', userID)
    .orderBy('timestamp', 'desc')
    .get()
    .then(data=> {
      const postArray = []
      data.forEach(item=> {
        postArray.push(item.data())
      })
      props.dispatch(userPosts(postArray))
    })
  }

  const getFeaturedPhotoInfo = (postID) => {
    db.collection('posts')
    .where('postID', '==', postID)
    .get()
    .then(data=> {
      let arr = []
      data.forEach(item=> {
        arr.push(item.data())
      })
      const info = arr[0]
      props.dispatch(photoInformation(info))
      // props.history.push(`/photo-app/post/${postID}`)


      // info['username'] = username
      // window.scrollTo({top: 0})
    })
  }

  // const test = () => {
  //   console.log(props)
  // }

  return (
    <div>
      <Route path='/photo-app/' render={(props)=> (
        <Header search={search} 
        // setShowLogin={setShowLogin} 
        {...props} sort={sort} />
      )} />

      {/* <TestFile user={user}  />  */}

      {/* {showLogin ? 
      <NewLogin />
      :
      null
      } */}

      <Route path='/photo-app/profile/collections/:collectionName' render={(props)=> (
        <CollectionsComponent {...props} getFeaturedPhotoInfo={getFeaturedPhotoInfo}  />
      )} />

      <Route path='/photo-app/' render={(props)=> (
        <Footer {...props} />
      )} />
        
      <Switch>

        <Route exact path='/photo-app/search/:searchQuery?' render={(props) => (
          <SearchPage {...props} search={search} getFeaturedPhotoInfo={getFeaturedPhotoInfo} sort={sort} />
        )} />

        <Route exact path='/photo-app/signup/' render={(props)=> (
          <Signup {...props}/>
        )} />

        <Route exact path='/photo-app/login' render={(props)=> (
          <Login 
          {...props}/>
        )} />
 
        <Route exact path='/photo-app/profile/:route?' render={(props)=>( 
          <Profile 
            getFeaturedPhotoInfo={getFeaturedPhotoInfo}
            getUserProfile={getUserProfile}
            {...props}
        />)} />

        <Route exact path='/photo-app/upload' render={(props)=> (
          <AddContent 
            getFeaturedPhotoInfo={getFeaturedPhotoInfo}
            {...props}
          /> 
        )} />

        <Route path='/photo-app/profiles/:username' render={(props)=>(
          <PublicProfile 
            getUserProfile={getUserProfile}
            getFeaturedPhotoInfo={getFeaturedPhotoInfo}
            {...props}
          />
        )} />

        <Route exact path='/photo-app/post/:postID' render={(props)=> (
          <FeaturedPost 
          getUserProfile={getUserProfile}
          getFeaturedPhotoInfo={getFeaturedPhotoInfo}
          {...props}
        />
        )} />

        <Route exact path='/photo-app/discover' render={()=> (
          <Discover />
        )} />

        <Route exact path='/photo-app/posts/:sort?' render={(props)=> (
            <MainPhotoDisplay 
              sort={sort}
              getFeaturedPhotoInfo={getFeaturedPhotoInfo}
              {...props}
            />
        )} />
      </Switch>
      {/* <button onClick={()=>console.log(props.user)}>Press</button> */}
      
    </div>
  );
}

const mapStateToProps = state => ({
  isLoadMore: state.app.isLoadMore,
  query: state.app.query,
  user: state.app.user,
  photoInformation: state.app.photoInformation,
  homePhotoInformation: state.app.homePhotoInformation,
  startAfter: state.app.startAfter,
  sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(App);