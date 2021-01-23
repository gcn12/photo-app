import React from 'react'
import {
    Photo,
    Container,
    Container2,
} from './UserResults.styles'
import { Text } from '../Styles/GlobalStyles.styles'

const SearchResults = (props) => {
    return(
        <Container2>
            <Photo alt='' src={props.hit.profileImage}></Photo>
            <div>
            <Container>
                <Text>{props.hit.name}</Text>
            </Container>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Text>{props.hit.username}</Text>
            </div>
            </div>
        </Container2>
    )
}

export default SearchResults