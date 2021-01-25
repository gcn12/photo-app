import React from 'react'
import { db } from '../Firebase'
import { ReactComponent as Collections } from '../Icons/Collections.svg'
import { connect } from 'react-redux'
import { ReactComponent as FilledHeart } from '../Icons/FilledHeart.svg'
import { unadmirePost } from '../Functions'
import {
    Container,
    OptionIcon,
    Options,
    OptionIconContainer,
    OptionText,
    Triangle,
} from '../Styles/DropdownStyles.styles'

const AdmiredDropdown = (props) => {

    const getCollectionsList = () => {
        props.openAddToCollection()
        const collectionsArray = []
        db.collection('users')
        .doc(props.user)
        .collection('collection-names')
        .orderBy('timestamp', 'desc')
        .get()
        .then(collections => {
            if(collections.docs.length>0) {
                collections.docs.forEach((collection, index)=> {
                    const mapArray = []
                    mapArray.push(collection.data().collection)
                    db.collection('users')
                    .doc(props.user)
                    .collection('collections')
                    .where('collection', '==', collection.data().collection)
                    .where('id', '==', props.id)
                    .get()
                    .then(data=> {
                        if(data) {
                            if(data.docs.length > 0){
                                mapArray.push(true)
                            }else{
                                mapArray.push(false)
                            }
                        }
                        collectionsArray.push(mapArray)
                        if (index+1 === collections.docs.length) {
                            props.setCollectionsList(collectionsArray)
                            props.setShowSpinner(false)
                        }
                    })
                })
            }else{
                props.setShowSpinner(false)
            }
        }) 
    }

    const unadmire = () => {
        unadmirePost(props.photoInfo.id, props.photoInfo.postID, props.user)
        if(props.removeFromSavedPostArray) {
            props.removeFromSavedPostArray(props.index)
            props.setShowDropdown(false)
        }
        if(!props.isRemoveFromSavedPage){
            props.setIsBookmarked(false)
        }
    }


    return(
        <Container fontSize='20px' translateContainer={props.translateContainer}>
            <Triangle shift='translate(-45%, -90%)' />
            <Options>
                <OptionIconContainer radius='5px 5px 0 0' className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}  onClick={unadmire}>
                    <OptionIcon className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}  style={{transform: 'scale(.9)'}}>
                        <FilledHeart style={{backrgroundColor: 'red', transform: 'scale(.8)', position: 'relative', top: 4}} />
                    </OptionIcon>
                    <OptionText className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} >Remove from admired</OptionText>
                </OptionIconContainer>
                <OptionIconContainer radius='0 0 5px 5px' onClick={getCollectionsList}>
                    <OptionIcon>
                        <Collections style={{transform: 'scale(.7)', position: 'relative', top: 4}} />
                    </OptionIcon>
                    <OptionText>Add to collection</OptionText>
                </OptionIconContainer>
            </Options>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(AdmiredDropdown)