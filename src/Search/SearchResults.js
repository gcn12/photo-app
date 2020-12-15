import React from 'react'
import {
    Photo,
    Container,
} from './SearchResults.styles'

const SearchResults = (props) => {
    return(
        <Container>
            <Photo alt='' src={props.hit.image}></Photo>
            <div>{props.hit.title}</div>
            <div>{props.hit.username}</div>
        </Container>
    )
}

export default SearchResults