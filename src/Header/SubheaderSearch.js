import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { 
    homePhotoInformation, 
    searchQueries,
} from '../Redux/Actions/appActions'
import { selected } from '../Redux/Actions/headerActions'
import {
    Container,
    LI,
    Margin,
    ULSearch,
} from './SubheaderPosts.styles'


const Subheader = (props) => {
    useEffect(()=> {
        if (props?.location?.pathname.includes('new')) {
            props.dispatch(selected('timestamp'))
        }else if (props?.location?.pathname.includes('rating')) {
            props.dispatch(selected('ratio'))
        }else if (props?.location?.pathname.includes('popular')) {
            props.dispatch(selected('views'))
        }else{
            props.dispatch(selected('views'))
        }
        // eslint-disable-next-line
    }, [])

    const changeSort = (result) => {
        if(result !== props.searchQueries) {
            props.dispatch(homePhotoInformation([]))
            props.dispatch(searchQueries(result))
            props.search(result)
        }
    }
    

    return(
        <div>
            <Container>
                <ULSearch>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <LI onClick={()=>changeSort('all results')} underline={props.searchQueries === 'all results' ? true : false}>All results</LI>
                        <Margin></Margin>
                        <LI onClick={()=>changeSort('places')} underline={props.searchQueries === 'places' ? true : false}>Places</LI>
                        <Margin></Margin>
                        <LI onClick={()=>changeSort('posts')} underline={props.searchQueries === 'posts' ? true : false}>Posts</LI>
                        <Margin></Margin>
                        <LI onClick={()=>changeSort('people')} underline={props.searchQueries === 'people' ? true : false}>People</LI>
                    </div>
                    <div style={{display: 'flex'}} >
                        <div style={{display: 'flex'}} className='categories-dropdown'>
                        </div>
                    </div>
                </ULSearch>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    homePhotoInformation: state.app.homePhotoInformation,
    displayView: state.app.displayView,
    searchQueries: state.app.searchQueries,
    sortCriteria: state.app.sortCriteria
})

export default connect(mapStateToProps)(Subheader)