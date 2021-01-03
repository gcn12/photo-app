import React from 'react'
import {
    Container,
    Cancel,
    Text,
    RenameButton,
    ButtonContainer,
} from './AddToCollection.styles'

const AddToCollection = (props) => {
    return(
        <Container>
            <Text onClick={()=>props.setIsAddToCollection(false)} style={{cursor: 'pointer'}} size='40px'>&times;</Text>
            <Text size='30px'>Add to collection</Text>
            <ButtonContainer>
                <Cancel onClick={()=>props.setIsAddToCollection(false)}>Cancel</Cancel>
                <RenameButton>Add</RenameButton>
            </ButtonContainer>
        </Container>
    )
}

export default AddToCollection