import React from 'react'
import { db } from '../Firebase'
import { ReactComponent as Collections } from '../Icons/Collections.svg'
import { ReactComponent as Remove } from '../Icons/Remove.svg'
import { connect } from 'react-redux'
import { unbookmarkPost, bookmarkPost } from '../Functions'
import {
    Container,
    OptionIcon,
    Options,
    OptionIconContainer,
    OptionText,
    Triangle,
} from '../Styles/DropdownStyles.styles'

const DescriptionViewDropdown = (props) => {

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
                            props.openAddToCollection()
                        }
                    })
                })
            }
        }) 
    }

    const bookmark = () => {
        const { views, category, country, location, image, hearts, ratio, ...data } = props.photoInfo
        bookmarkPost(data, props.user)
        .then(()=>props.setIsBookmarked(true))
        .catch(err =>console.log(err))
    }

    const unbookmark = () => {
        if(props.removeFromSavedPostArray) {
            props.removeFromSavedPostArray(props.index)
            props.setShowDropdown(false)
        }
        unbookmarkPost(props.photoInfo.postID, props.user)
        .then(()=> {
            if(!props.isRemoveFromSavedPage){
                props.setIsBookmarked(false)
            }
        })
    }



    return(
        <Container fontSize='20px' translateContainer={props.translateContainer}>
            <Triangle shift='translate(-38%, -90%)' />
            <Options>
                {props.isBookmarked ? 
                <OptionIconContainer radius='5px 5px 0 0' className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}  onClick={unbookmark}>

                    <OptionIcon className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}  style={{transform: 'scale(.9)'}}>
                        {props.isSavedPost ? 
                        <Remove style={{backrgroundColor: 'red', transform: 'scale(.8)', position: 'relative', top: 4}} />
                        :
                        <img style={{transform: 'scale(.8)', position: 'relative', top: 4}} alt='' className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTggMjRsLTYtNS4yNjktNiA1LjI2OXYtMjRoMTJ2MjR6Ii8+PC9zdmc+"></img>
                        }
                    </OptionIcon>
                    <OptionText className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} >Remove from saved</OptionText>
                </OptionIconContainer>
                :
                <OptionIconContainer radius='5px 5px 0 0' className='add-dropdown' onClick={bookmark}> 
                    <OptionIcon className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} style={{transform: 'scale(.9)'}}>
                        <img style={{transform: 'scale(.8)', position: 'relative', top: 4}} alt='' className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYgMnYxNy41ODJsLTQtMy41MTItNCAzLjUxMnYtMTcuNTgyaDh6bTItMmgtMTJ2MjRsNi01LjI2OSA2IDUuMjY5di0yNHoiLz48L3N2Zz4="></img>
                    </OptionIcon>
                    <OptionText className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}>Save for later</OptionText>
                </OptionIconContainer>
                }     
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

export default connect(mapStateToProps)(DescriptionViewDropdown)