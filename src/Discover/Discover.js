import React from 'react'
import CategoriesDisplay from './CategoriesDisplay'
import SingleLocation from './SingleLocation'
import FeaturedPosts from './FeaturedPlaces'
import FeaturedUsers from './FeaturedUsers'
import {

} from './Discover.styles'
 
const Discover = (props) => {

    return(
        <div style={{marginTop: '60px'}}>
            <SingleLocation image='https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1969&q=80' />
            <FeaturedPosts />
            <CategoriesDisplay sort={props.sort} />
            <FeaturedUsers />
            <SingleLocation image='https://images.unsplash.com/photo-1484503369601-c5f45a1bf914?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' />
        </div>
    )
}

export default Discover