import React from 'react'
import {
    Photo,
    Container,
    Container2,
} from './SearchResults.styles'
import { Text } from '../Styles/GlobalStyles.styles'

const SearchResults = (props) => {
    return(
        <Container2>
            <Photo alt='' src={props.hit.image}></Photo>
            <div>
            <Container>
                <Text>{props.hit.title}</Text>
            </Container>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text>{`${props.hit.city}, ${props.hit.country}`}</Text>
            </div>
            </div>
        </Container2>
    )
}

export default SearchResults