import React from 'react'
import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import { ReactComponent as Edit } from '../Icons/Edit.svg'
import {
    Container,
    Options,
    OptionText,
    OptionIcon,
    OptionIconContainer,
    Triangle,
} from '../Styles/DropdownStyles.styles'

const PostDropdown = (props) => {

    const editPost = () => {
        // props.setShowRename(true)
        // props.setCollectionName(props.collectionName)
        props.setShowEdit(true)
        props.getPostData()
    }

    const deletePost = () => {
        props.setShowDelete(true)
        props.setShowOptions(false)
        // props.setShowGear(true)
    }

    return(
        <Container width={props.showOptions? '200px' : '0px'} fontSize='20px' translateContainer={props.translateContainer}>
            <Triangle shift='translate(-65%, -90%)' />
            <Options>
                <OptionIconContainer onClick={editPost} radius='5px 5px 0 0'>
                    <OptionIcon>
                        <Edit style={{transform: 'scale(.7)', position: 'relative', top: 3}} />
                    </OptionIcon>
                    <OptionText>Edit</OptionText>
                </OptionIconContainer>
                <OptionIconContainer onClick={deletePost} radius='0 0 5px 5px'>
                    <OptionIcon>
                        <TrashCan style={{transform: 'scale(.7)', position: 'relative', top: 4}} />
                    </OptionIcon>
                    <OptionText>Delete</OptionText>
                </OptionIconContainer>
            </Options>
        </Container>
    )
}

export default PostDropdown