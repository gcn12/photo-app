import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Container,
    Image,
    Title,
} from './CollectionsComponent.styles'

const CollectionsComponent = (props) => {
    return(
        <Container>
            <Link to={`/photo-app/post/${props?.collection?.username}/${props?.collection?.url}`} style={{textDecoration: 'none'}}>
                <Image src={props?.collection?.smallImage} />
                <Title>{props?.collection?.title}</Title>
            </Link>
        </Container>
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(CollectionsComponent)