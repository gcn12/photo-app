import React, { useState } from 'react'
import { 
    Container,
    Collection, 
} from './Dropdown.styles'
import { db } from '../Firebase'

const DropdownItem = (props) => {

    const addToCollection = () => {
        db.collection('users')
        .doc(props.user)
        .collection('collections')
        .doc(props.collection)
        .collection(props.collection)
        .doc(props.photoInformation.id)
        .set({
            ...props.photoInformation,
        }).then(null)
    }

    const add = () => {
        const isAddedArray = props.isAdded
        isAddedArray[props.index] = true
        props.setIsAdded([true, true])
    }

    const remove = () => {
        const isAddedArray = props.isAdded
        isAddedArray[isAddedArray[props.index]] = false
        props.setIsAdded(isAddedArray)
    }

    return(
        <Collection className='dropdown' onClick={addToCollection}>
            <div className='dropdown'>{props.collection}</div>
            {
                props.isAdded[props.index] ?
                <div className='dropdown' onClick={remove}>Remove</div>
                :
                <div className='dropdown' onClick={add}>Add</div> 
            }
        </Collection>
    )
}

const Dropdown = (props) => {

    const [isAdded, setIsAdded] = useState([false, false])

    const boolArray = Array(2).fill(false)

    // setIsAdded(boolArray)

    return(
        <Container>
            {props.collectionsList?.map((collection, index) => {
                return(
                    <DropdownItem setIsAdded={setIsAdded} isAdded={isAdded} index={index} className='dropdown' user={props.user} photoInformation={props.photoInformation} collection={collection} key={index}/>
                )
            })}
        </Container>
    )
}

export default Dropdown