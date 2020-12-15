import React from 'react'
import {
    Photo,
    Container,
    Text,
} from './SearchResults.styles'

const SearchResults = (props) => {
    return(
        <Container>
            <Photo alt='' src={props.hit.image}></Photo>
            <Text>{props.hit.title}</Text>
            <Text>{props.hit.username}</Text>
        </Container>
    )
}

export default SearchResults