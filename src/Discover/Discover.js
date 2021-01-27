import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import { sortCriteria } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
import CategoriesDisplay from './CategoriesDisplay'
import SingleLocation from './SingleLocation'
import FeaturedPlaces from './FeaturedPlaces'
import { homePhotoInformation } from '../Redux/Actions/appActions'
import {

} from './Discover.styles'
 
const Discover = (props) => {

    const [posts1, setPosts1] = useState([])
    const [posts2, setPosts2] = useState([])

    useEffect(()=> {
        window.scrollTo({top: 0})
        db.collection('preview-posts')
        .orderBy('ratio', 'desc')
        .limit(8)
        .get()
        .then(posts=> {
            let posts1Array = []
            let posts2Array = []
            let index = 0
            posts.forEach(post=> {
                if(index < 4) {
                    posts1Array.push(post.data())
                }else{
                    posts2Array.push(post.data())
                }
                index++
            })
            setPosts1(posts1Array)
            setPosts2(posts2Array)
        })
    },[])

    const goToPlacesPage = (location) => {
        props.dispatch(homePhotoInformation([]))
        let criteria = {...props.sortCriteria}
        criteria['location'] = location
        criteria['category'] = 'all categories'
        criteria['new'] = false
        criteria['rating'] = false
        criteria['views'] = true
        props.sort(criteria, true)
        props.dispatch(sortCriteria(criteria))
    }

    return(
        <div style={{marginTop: '60px'}}>
            <SingleLocation goToPlacesPage={goToPlacesPage} sort={props.sort} topSmall='75%' leftSmall='30%' top='25%' left='23%' title='Tokyo, Japan' paragraph = 'Nam libero justo laoreet sit amet cursus sit amet. Potenti nullam ac tortor vitae purus faucibus. Leo in vitae turpis massa sed elementum tempus egestas.' backgroundSmall='linear-gradient(to bottom, rgba(0,0,0,0) 20%,rgba(0,0,0,.6) 100%)' background='linear-gradient(to top, rgba(0,0,0,0) 0%,rgba(0,0,0,.3) 100%)' image='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/site_photos%2Fjapan.jpg?alt=media&token=2d0444fd-5a38-4a24-a645-0b71b06a64aa' />
            <FeaturedPlaces goToPlacesPage={goToPlacesPage} sort={props.sort} posts={posts1} title='Popular Destinations' />
            <CategoriesDisplay sort={props.sort} />
            <FeaturedPlaces goToPlacesPage={goToPlacesPage} sort={props.sort} posts={posts2} title='Our Top Places' />
            <SingleLocation goToPlacesPage={goToPlacesPage} sort={props.sort} topSmall='70%' leftSmall='72%' top='78%' left='80%' title='Paris, France' paragraph = 'Adipiscing elit ut aliquam purus sit amet luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Eget magna fermentum iaculis eu non diam phasellus.' background='linear-gradient(to bottom, rgba(0,0,0,0) 20%,rgba(0,0,0,.9) 100%)' image='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/site_photos%2Fparis.jpg?alt=media&token=6488e7ca-9f14-4289-9597-70dc135dd189' />
            {/* <SingleLocation goToPlacesPage={goToPlacesPage} sort={props.sort} topSmall='70%' leftSmall='72%' top='78%' left='80%' title='Prague, Czechia' paragraph = 'Adipiscing elit ut aliquam purus sit amet luctus. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Eget magna fermentum iaculis eu non diam phasellus.' background='linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,.2) 100%)' image='https://firebasestorage.googleapis.com/v0/b/photos-634e7.appspot.com/o/site_photos%2Fprague.jpg?alt=media&token=d7f91dd8-d91e-4a53-bcf3-a92316575323' /> */}
            {/* <SingleLocation image='https://images.unsplash.com/photo-1484503369601-c5f45a1bf914?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' /> */}
        </div>
    )
}

const mapStateToProps = state => ({
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(Discover)