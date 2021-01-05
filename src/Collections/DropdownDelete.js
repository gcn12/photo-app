import React from 'react'
import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import { ReactComponent as Edit } from '../Icons/Edit.svg'
import {
    Container,
    Options,
    Option
} from './DropdownDelete.styles'

const DropdownDelete = (props) => {

    const renameCollection = () => {
        props.setShowRename(true)
        props.setCollectionName(props.collectionName)
    }

    const deleteCollection = () => {
        props.setShowDelete(true)
        props.setCollectionName(props.collectionName)
    }

    return(
        <Container>
            <Options>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <Edit style={{height: '18px', width: '18px'}} />
                    <Option onClick={renameCollection}>Rename</Option>
                </div>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'space-between'}}>
                    <TrashCan style={{height: '18px', width: '18px'}} />
                    <Option onClick={deleteCollection}>Delete</Option>
                </div>
            </Options>
        </Container>
    )
}

export default DropdownDelete