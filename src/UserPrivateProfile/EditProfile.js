import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import firebase from 'firebase'
import UploadProgress from '../AddContent/UploadProgress'
import { addEllipsisToText } from '../Functions'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import {
    Container,
    Cancel,
    ConfirmButton,
    CollectionName,
    BioTextarea,
    ProfileImage,
    EditButton,
    CenterProgress,
    X,
} from './EditProfile.styles'
import { userInformation } from '../Redux/Actions/appActions'
import { Text } from '../Styles/GlobalStyles.styles'

const EditProfile = (props) => {

    const [uploadProgressColor, setUploadProgressColor] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [uploadCount, setUploadCount] = useState(2)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [profileImageSmall, setProfileImageSmall] = useState('')
    const [profileImageLarge, setProfileImageLarge] = useState('')

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
                let finalHeightSmall
                let finalWidthSmall
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
                if(height > 130 || width > 130) {
                    if (height >= width) {
                        finalHeightSmall = 130
                        finalWidthSmall = Math.round(ratio * 130)
                    }else {
                        finalWidthSmall = 130
                        finalHeightSmall = Math.round(ratio * 130)
                    }
                }else{
                    finalHeightSmall = height
                    finalWidthSmall = width
                }
                let canvasLarge = document.createElement('canvas'), ctx;
                let canvasSmall = document.createElement('canvas'), ctx2;
                canvasLarge.width = finalWidthLarge;
                canvasLarge.height = finalHeightLarge;
                canvasSmall.width = finalWidthSmall;
                canvasSmall.height = finalHeightSmall;
                ctx = canvasLarge.getContext('2d');
                ctx2 = canvasSmall.getContext('2d');
                ctx.drawImage(uploadedImage, 0, 0, canvasLarge.width, canvasLarge.height);
                ctx2.drawImage(uploadedImage, 0, 0, canvasSmall.width, canvasSmall.height);
                const imageSrcLarge = canvasLarge.toDataURL('image/jpeg', 1)
                const imageSrcSmall = canvasSmall.toDataURL('image/jpeg', 1)
                setProfileImageLarge(imageSrcLarge)
                setProfileImageSmall(imageSrcSmall)
                const profileImageTag = document.getElementById('edit-profile-image')
                profileImageTag.src = imageSrcLarge
            }
        }
        viewFile.readAsDataURL(file)
    }

    const uploadProfileImage = () => {
        setIsUploading(true)
        setUploadCount(uploadCount => uploadCount + 1)
        setUploadProgress(previousUploadProgress=> previousUploadProgress + 1)
        // const image = profileImageLarge
        const imagesToUpload = [profileImageLarge, profileImageSmall]
        if(profileImageLarge.length>0){
            let index = 0
            let imageUrls = []
            const upload = () => {
                const storageRef = firebase.storage().ref()
                const imageRef = storageRef.child(`${props.userInformation.id}/${index===0 ? 'profileImage' : 'profileImageSmall'}`)
                imageRef.putString(imagesToUpload[index], 'data_url')
                .then(snapshot=> {
                    snapshot.ref.getDownloadURL()
                    .then(url=> {
                        imageUrls.push(url)
                        if(index=== 1) {
                            updateProfile(imageUrls)
                            let userInformationCopy = {...props.userInformation}
                            userInformationCopy['profileImage'] = imageUrls[0]
                            userInformationCopy['profileImageSmall'] = imageUrls[1]
                            props.dispatch(userInformation({...userInformationCopy}))
                        }else{
                            index++
                            upload()
                        }
                    })
                })
            }
            upload()
        }else{
            updateProfile()
        }
    }

    const updateProfile = (profileImageUrls) => {
        let isEmpty = true
        const updateObject = {}
        const cloudUpdateObject = {}
        cloudUpdateObject['id'] = props.userData.id
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
        const bio2 = document.getElementById('edit-profile-bio').value
        if(bio2 !== props.userData.bio){
            isEmpty = false
            updateObject['bio'] = bio2
            if(bio2.length > 100) {
                cloudUpdateObject['bio'] = addEllipsisToText(bio2, 100)
            }
        }
        if(profileImageUrls){
            isEmpty = false
            updateObject['profileImage'] = profileImageUrls[0]
            updateObject['profileImageSmall'] = profileImageUrls[1]
            cloudUpdateObject['profileImage'] = profileImageUrls[0]
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
            console.log(updateObject)
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
            {isUploading ? 
                <CenterProgress>
                    <UploadProgress uploadProgressColor={uploadProgressColor} uploadCount={uploadCount} uploadProgress={uploadProgress} />
                </CenterProgress>
            :
            <div>
                <img src='' alt='' onError={lockScroll} />
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '0px'}}>
                    <X onClick={props.closeDialog} style={{cursor: 'pointer'}}>&times;</X>
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                    <Text size='36px'>Edit profile</Text>
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

export default connect(mapStateToProps)(EditProfile)