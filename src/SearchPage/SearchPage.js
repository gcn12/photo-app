import React from 'react'
import PhotoDescriptionView from '../MainPhotoDisplay/PhotoDescriptionView'
import CitiesDisplay from './CitiesDisplay'
import UsersDisplay from './UsersDisplay'
import {
    CitiesDisplayContainer,
    PostsDisplayContainer,
    UsersContainer,
    ResultTitle,
} from './SearchPage.styles'

const SearchPage = (props) => {
    return(
        <div style={{margin: '100px 5% 0 5%'}}>
            {props?.searchResults !== 'No results' ? 
            <div>
                
                {props?.searchResults[3]?.length > 0 || props?.searchResults[2]?.length > 0 ? 
                <ResultTitle>Places</ResultTitle>
                :
                null
                }
                <CitiesDisplayContainer quantity={props?.searchResults[3]?.length < 4 ? null : 'center'}>
                    {props?.searchResults[3]?.map((item, index)=> {
                        return (
                            <CitiesDisplay item={item} key={index} />
                        )
                    })}
                    {props?.searchResults[2]?.map((item, index)=> {
                        return (
                            <CitiesDisplay item={item} key={index} />
                        )
                    })}
                </CitiesDisplayContainer>
                {props?.searchResults[0]?.length > 0 ? 
                <ResultTitle>Posts</ResultTitle>
                :
                null
                }
                <PostsDisplayContainer quantity={props?.searchResults[3]?.length < 4 ? null : 'center'} >
                    {props?.searchResults[0]?.map((item, index)=> {
                        return (
                            <PhotoDescriptionView photoInfo={item} key={index} />
                        )
                    })}
                </PostsDisplayContainer>
                {props?.searchResults[1]?.length > 0 ? 
                    <ResultTitle>People</ResultTitle>
                    :
                    null
                }
                <UsersContainer>
                    {props?.searchResults[1]?.map((item, index)=> {
                        return (
                            <UsersDisplay item={item} key={index} />
                        )
                    })}
                </UsersContainer>
            </div>

            :
            <div>
                <div>No results</div>
            </div>
            }
        </div>
    )
}

export default SearchPage