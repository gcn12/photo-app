import React from 'react'
import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import { ReactComponent as Edit } from '../Icons/Edit.svg'
import {
    Container,
    Options,
    OptionIcon,
    OptionText,
    OptionIconContainer,
    Triangle,
} from '../Styles/DropdownStyles.styles'

const DropdownDelete = (props) => {

    const renameCollection = () => {
        props.setShowRename(true)
        props.setCollectionName(props.collectionName)
    }

    const deleteCollection = () => {
        props.setCollectionIndex(props.index)
        props.setShowDelete(true)
        props.setCollectionName(props.collectionName)
    }

    return(
        <Container fontSize='20px' translateContainer='translate(-80%, 10%)'>
            <Triangle shift='translate(-70%, -90%)' />
            <Options>
                <OptionIconContainer radius='5px 5px 0 0'>
                    <OptionIcon>
                        <Edit style={{transform: 'scale(.7)', position: 'relative', top: 3}} />
                    </OptionIcon>
                    <OptionText onClick={renameCollection}>Rename</OptionText>
                </OptionIconContainer>
                <OptionIconContainer radius='0 0 5px 5px'>
                    <OptionIcon>
                        <TrashCan style={{transform: 'scale(.7)', position: 'relative', top: 4}} />
                    </OptionIcon>
                    <OptionText onClick={deleteCollection}>Delete</OptionText>
                </OptionIconContainer>
            </Options>
        </Container>
    )
}

export default DropdownDelete