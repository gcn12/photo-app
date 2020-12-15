import React from 'react'
import {
    Photo,
    Container,
    Text,
    Container2,
} from './SearchResults.styles'

const SearchResults = (props) => {
    return(
        <Container2>
            <Photo alt='' src={props.hit.image}></Photo>
            <div>
            <Container>
                <Text>{props.hit.title}</Text>
                {/* <Text>{props.hit.username}</Text> */}
            </Container>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text>{`${props.hit.city}, ${props.hit.country}`}</Text>
            </div>
            </div>
        </Container2>
    )
}

export default SearchResults