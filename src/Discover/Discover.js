import React from 'react'
import CategoriesDisplay from './CategoriesDisplay'
import SingleLocation from './SingleLocation'
import FeaturedPosts from './FeaturedPosts'
import {

} from './Discover.styles'
 
const Discover = () => {

    return(
        <div style={{marginTop: '60px'}}>
            <SingleLocation />
            <FeaturedPosts />
            <CategoriesDisplay />
        </div>
    )
}

export default Discover