import React from 'react'
import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import { ReactComponent as Edit } from '../Icons/Edit.svg'
import {
    Container,
    Options,
    Option
} from './UserPostsDropdown.styles'

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
        props.setShowGear(true)
    }

    return(
        <Container>
            <Options>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <Edit style={{height: '20px', width: '20px'}} />
                    <Option onClick={editPost}>Edit</Option>
                </div>
                <div style={{display: 'flex', alignItems:'center'}}>
                    <TrashCan style={{height: '20px', width: '20px'}} />
                    <Option onClick={deletePost}>Delete</Option>
                </div>
            </Options>
        </Container>
    )
}

export default PostDropdown