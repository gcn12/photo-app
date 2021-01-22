import React, { useEffect } from 'react'
import PhotoDescriptionView from '../MainPhotoDisplay/PhotoDescriptionView'
import CitiesDisplay from './CitiesDisplay'
// import UsersDisplay from './UsersDisplay'
import UserProfileCard from '../UserProfileCard/UserProfileCard'
import { connect } from 'react-redux'
import { searchQueries, query } from '../Redux/Actions/appActions'
import {
    CitiesDisplayContainer,
    PostsDisplayContainer,
    UsersContainer,
    ResultTitle,
    TitleContainer, 
    SeeMore,
    NoResults,
} from './SearchPage.styles'

const SearchPage = (props) => {

    useEffect(()=> {
        if(props.match.params.searchQuery.length > 0) {
            props.dispatch(query(props.match.params.searchQuery))
            props.search('all results', false, props.match.params.searchQuery)
        }
        // eslint-disable-next-line
    }, [])

    const seeMore = (type) => {
        props.dispatch(searchQueries(type))
        props.search(type)
    }

    return(
        <div style={{margin: '100px 5% 0 5%'}}>
            {props?.searchResults !== 'No results' ? 
            <div>
                {props?.searchResults[3]?.length > 0 || props?.searchResults[2]?.length > 0 ? 
                <div>
                    <TitleContainer>
                        <ResultTitle>Places</ResultTitle>
                        {props.searchQueries === 'all results' && props?.searchResults[2]?.length === 8 ? 
                        <SeeMore onClick={()=>seeMore('places')}>See more</SeeMore>
                        :
                        null
                        }
                    </TitleContainer>
                    <CitiesDisplayContainer quantity={props?.searchResults[2]?.length < 4 ? 'center' : 'center'}>
                        {props?.searchResults[2]?.map((item, index)=> {
                            return (
                                <CitiesDisplay sort={props.sort} item={item} key={index} />
                            )
                        })}
                    </CitiesDisplayContainer>
                </div>
                :
                null
                }
                {props?.searchResults[0]?.length > 0 ? 
                <div>
                    <TitleContainer>
                        <ResultTitle>Posts</ResultTitle>
                        {props.searchQueries === 'all results' && props?.searchResults[0]?.length === 6 ? 
                        <SeeMore onClick={()=>seeMore('posts')}>See more</SeeMore>
                        :
                        null
                        }
                    </TitleContainer>
                    <PostsDisplayContainer quantity={props?.searchResults[3]?.length < 4 ? 'center' : 'center'} >
                        {props?.searchResults[0]?.map((item, index)=> {
                            return (
                                <PhotoDescriptionView history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} photoInfo={item} key={index} />
                            )
                        })}
                    </PostsDisplayContainer>
                </div>
                :
                null
                }
                {props?.searchResults[1]?.length > 0 ? 
                <div>
                    <TitleContainer>
                        <ResultTitle>People</ResultTitle>
                        {props.searchQueries === 'all results' && props?.searchResults[1]?.length === 10 ? 
                        <SeeMore onClick={()=>seeMore('people')}>See more</SeeMore>
                        :
                        null
                        }
                    </TitleContainer>
                    <UsersContainer quantity={props?.searchResults[1]?.length < 4 ? 'center' : 'center'}>
                        {props?.searchResults[1]?.map((item, index)=> {
                            return (
                                <UserProfileCard photoInformation={item} key={index}/>
                            )
                        })}
                    </UsersContainer>
                </div>
                    :
                    null
                }
            </div>

            :
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <NoResults>No results</NoResults>
            </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    searchResults: state.app.searchResults,
    searchQueries: state.app.searchQueries,
    query: state.app.query
})

export default connect(mapStateToProps)(SearchPage)