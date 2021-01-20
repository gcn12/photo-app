import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import firebase from 'firebase'
import UploadProgress from '../AddContent/UploadProgress'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import {
    Container,
    Cancel,
    ConfirmButton,
    Text,
    CollectionName,
    BioTextarea,
    ProfileImage,
    EditButton,
    CenterProgress,
} from './EditProfile.styles'
import { userInformation } from '../Redux/Actions/appActions'

const EditProfile = (props) => {

    const [uploadProgressColor, setUploadProgressColor] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [uploadStatusProps, setUploadStatusProps] = useState('initial')
    const [uploadCount, setUploadCount] = useState(2)
    const [uploadProgress, setUploadProgress] = useState(0)

    const { userData } = props
    useEffect(()=> {
        setName(userData.name)
        setUsername(userData.username)
        setBio(userData.bio)
        // eslint-disable-next-line
    }, [])

    const displayImage = () => {
        const file = document.getElementById('edit-profile-input').files[0]
        const viewFile = new FileReader()
        viewFile.onload = (e) => {
            const uploadedImage = document.createElement('img')
            uploadedImage.src=e.target.result
            uploadedImage.onload = function () {
                const height = this.height;
                const width = this.width;
                let ratio
                if(height < width) {
                    ratio = height / width
                }else{
                    ratio = width / height
                }
                let finalHeightLarge
                let finalWidthLarge
                if(height > 500 || width > 500) {
                    if (height >= width) {
                        finalHeightLarge = 500
                        finalWidthLarge = Math.round(ratio * 500)
                    }else {
                        finalWidthLarge = 500
                        finalHeightLarge = Math.round(ratio * 500)
                    }
                }else{
                    finalHeightLarge = height
                    finalWidthLarge = width
                }
                let canvasLarge = document.createElement('canvas'), ctx;
                canvasLarge.width = finalWidthLarge;
                canvasLarge.height = finalHeightLarge;
                ctx = canvasLarge.getContext('2d');
                ctx.drawImage(uploadedImage, 0, 0, canvasLarge.width, canvasLarge.height);
                const imageSrcLarge = canvasLarge.toDataURL('image/jpeg', 1)
                const profileImageTag = document.getElementById('edit-profile-image')
                profileImageTag.src = imageSrcLarge
            }
        }
        viewFile.readAsDataURL(file)
    }

    const uploadProfileImage = () => {
        setIsUploading(true)
        setUploadCount(uploadCount => uploadCount + 1)
        setTimeout(()=>setUploadStatusProps('transitionStart'), 0)
        setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
        const image = document.getElementById('edit-profile-image').src
        if(image !== props.userData.profileImage){
            const storageRef = firebase.storage().ref()
            const imageRef = storageRef.child(`${props.userInformation.id}/profileImage`)
            imageRef.putString(image, 'data_url')
            .then(snapshot=> {
                snapshot.ref.getDownloadURL()
                .then(url=> {
                    updateProfile(url)
                    let userInformationCopy = {...userInformation}
                    userInformationCopy['profileImage'] = url
                    props.dispatch(userInformation({...userInformationCopy}))
                    // clearAllBodyScrollLocks()
                })
            })
        }else{
            updateProfile()
        }
    }

    const updateProfile = (profileImageUrl) => {
        let isEmpty = true
        const updateObject = {}
        const cloudUpdateObject = {}
        cloudUpdateObject['id'] = props.userData.id
        // cloudUpdateObject['userID'] = props.userInformation.id
        if(username !== props.userData.username){
            isEmpty = false
            updateObject['username'] = username
            cloudUpdateObject['username'] = username
        }
        if(name !== props.userData.name){
            isEmpty = false
            updateObject['name'] = name
            cloudUpdateObject['name'] = name
        }
        if(bio !== props.userData.bio){
            isEmpty = false
            updateObject['bio'] = bio
            cloudUpdateObject['bio'] = bio
        }
        if(profileImageUrl){
            isEmpty = false
            updateObject['profileImage'] = profileImageUrl
            cloudUpdateObject['profileImage'] = profileImageUrl
        }
        if(!isEmpty) {
            setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)

            db.collection('pending-tasks')
            .doc('profile-change')
            .collection('profile-change')
            .add({
                ...cloudUpdateObject
            })
            .then(()=> null)

            db.collection('users')
            .doc(props.user)
            .update({
                ...updateObject
            })
            .then(()=>{
                setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
                setUploadProgressColor(true)
                setTimeout(props.closeDialog, 1200)
                props.getUserProfile(props.userInformation.id)
                clearAllBodyScrollLocks()

            })
            .catch(err=>console.log(err))
        }else{
            props.setShowEditProfile(false)
        }
    }

    const lockScroll = () => {
        const toNotLock = document.getElementById('edit-profile-container')
        disableBodyScroll(toNotLock)
    }

    return(
        <Container id='edit-profile-container'>
            {/* {console.log(props.userData)} */}
            {isUploading ? 
                <CenterProgress>
                    <UploadProgress uploadProgressColor={uploadProgressColor} animate={uploadStatusProps} variants={animationMap.uploadStatus} uploadCount={uploadCount} uploadProgress={uploadProgress} />
                </CenterProgress>
            :
            <div>
                <img src='' alt='' onError={lockScroll} />
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                    <Text size='36px'>Edit profile</Text>
                    <Text onClick={props.closeDialog} style={{cursor: 'pointer'}} size='36px'>&times;</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <ProfileImage src={props?.userData?.profileImage} id='edit-profile-image' />
                    <EditButton htmlFor='edit-profile-input'>Change image</EditButton>
                    <input onChange={displayImage} hidden id='edit-profile-input' type='file'></input>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>
                        <Text>Username:</Text>
                        <CollectionName autoComplete='off' id='edit-profile-username' onChange={(e)=>setUsername(e.target.value)} defaultValue={username}></CollectionName>
                    </div>
                    <div>
                        <Text>Name:</Text>
                        <CollectionName autoComplete='off' id='edit-profile-name' onChange={(e)=>setName(e.target.value)} defaultValue={name}></CollectionName>
                    </div>
                    <div>
                        <Text>Bio:</Text>
                        <BioTextarea id='edit-profile-bio' onChange={(e)=>setBio(e.target.value)} defaultValue={bio}></BioTextarea>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Cancel onClick={props.closeDialog}>Cancel</Cancel>
                    <ConfirmButton onClick={uploadProfileImage}>Confirm changes</ConfirmButton>
                </div>
            </div>
            }
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    userInformation: state.app.userInformation,
})

const animationMap = {
    uploadStatus: {
        initial: {
            x: 0,
            y: 50,
            opacity: 0,
        },
        transitionStart: {
            x: 0,
            y: 50,
            opacity: 1,
        }
    }
}

export default connect(mapStateToProps)(EditProfile)