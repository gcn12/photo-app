import React from 'react'
import { db } from '../Firebase'
import { ReactComponent as Add } from '../Icons/Add.svg'
import { connect } from 'react-redux'
import { ReactComponent as FilledHeart } from '../Icons/FilledHeart.svg'
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
                            // props.dispatch(collectionsList(collectionsArray))
                            props.setShowAddToCollection(true)
                        }
                    })
                })
            }else{
                props.setShowAddToCollection(true)
            }
        }) 
    }

    const bookmark = () => {
        const { views, hearts, ratio, ...data } = props.photoInfo
        db.collection('users')
        .doc(props.user)
        .collection('admired')
        .add({
            ...data,
            timestamp: Date.now(),
        })
        .then(()=>props.setIsBookmarked(true))
        .catch(err =>console.log(err))
    }

    const unbookmark = () => {
        if(props.removeFromSavedPostArray) {
            props.removeFromSavedPostArray(props.index)
            props.setShowDropdown(false)
        }
        db.collection('users')
        .doc(props.user)
        .collection('admired')
        .where('username', '==', props.photoInfo.username)
        .where('url', '==', props.photoInfo.url)
        .get()
        .then(data=> {
            data.docs[0].ref.delete()
            if(!props.isRemoveFromSavedPage){
                props.setIsBookmarked(false)
            }
        })
    }


    return(
        <Container fontSize='20px' translateContainer={props.translateContainer}>
            <Triangle shift='translate(-35%, -90%)' />
            <Options>
                {props.isBookmarked ? 
                <OptionIconContainer radius='5px 5px 0 0' className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}  onClick={unbookmark}>

                    <OptionIcon className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}  style={{transform: 'scale(.9)'}}>
                    <FilledHeart style={{backrgroundColor: 'red', transform: 'scale(.8)', position: 'relative', top: 4}} />
                    </OptionIcon>
                    <OptionText className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} >Remove from saved</OptionText>
                </OptionIconContainer>
                :
                <OptionIconContainer radius='5px 5px 0 0' className='add-dropdown' onClick={bookmark}> 
                    <OptionIcon className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} style={{transform: 'scale(.9)'}}>
                    <img style={{transform: 'scale(.8)', position: 'relative', top: 4}} alt='' className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAyMS41OTNjLTUuNjMtNS41MzktMTEtMTAuMjk3LTExLTE0LjQwMiAwLTMuNzkxIDMuMDY4LTUuMTkxIDUuMjgxLTUuMTkxIDEuMzEyIDAgNC4xNTEuNTAxIDUuNzE5IDQuNDU3IDEuNTktMy45NjggNC40NjQtNC40NDcgNS43MjYtNC40NDcgMi41NCAwIDUuMjc0IDEuNjIxIDUuMjc0IDUuMTgxIDAgNC4wNjktNS4xMzYgOC42MjUtMTEgMTQuNDAybTUuNzI2LTIwLjU4M2MtMi4yMDMgMC00LjQ0NiAxLjA0Mi01LjcyNiAzLjIzOC0xLjI4NS0yLjIwNi0zLjUyMi0zLjI0OC01LjcxOS0zLjI0OC0zLjE4MyAwLTYuMjgxIDIuMTg3LTYuMjgxIDYuMTkxIDAgNC42NjEgNS41NzEgOS40MjkgMTIgMTUuODA5IDYuNDMtNi4zOCAxMi0xMS4xNDggMTItMTUuODA5IDAtNC4wMTEtMy4wOTUtNi4xODEtNi4yNzQtNi4xODEiLz48L3N2Zz4=" />
                    </OptionIcon>
                    <OptionText className={props.isRemoveFromSavedPage ? '' : 'add-dropdown'}>Save for later</OptionText>
                </OptionIconContainer>
                }     
                <OptionIconContainer radius='0 0 5px 5px' onClick={getCollectionsList}>
                    <OptionIcon>
                        <Add style={{transform: 'scale(.7)', position: 'relative', top: 4}} />
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