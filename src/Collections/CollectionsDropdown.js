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

const CollectionsDropdown = (props) => {

    const renameCollection = () => {
        props.openRename()
        // props.setCollectionName(props.collectionName)
    }

    const deleteCollection = () => {
        props.openDelete()
    }

    return(
        <Container fontSize='20px' translateContainer='translate(121%, 115%)'>
            <Triangle shift='translate(-70%, -90%)' />
            <Options>
                <OptionIconContainer onClick={renameCollection} radius='5px 5px 0 0'>
                    <OptionIcon>
                        <Edit style={{transform: 'scale(.7)', position: 'relative', top: 3}} />
                    </OptionIcon>
                    <OptionText>Rename</OptionText>
                </OptionIconContainer>
                <OptionIconContainer onClick={deleteCollection} radius='0 0 5px 5px'>
                    <OptionIcon>
                        <TrashCan style={{transform: 'scale(.7)', position: 'relative', top: 4}} />
                    </OptionIcon>
                    <OptionText>Delete</OptionText>
                </OptionIconContainer>
            </Options>
        </Container>
    )
}

export default CollectionsDropdown