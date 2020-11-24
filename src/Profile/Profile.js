import React from 'react'
import UserPosts from '../UserPosts/UserPosts'
import { SubmitButton } from '../AddContent/AddContent.styles'
import Collections from '../Collections/Collections'
import { LI } from '../Header/Header.styles'
import { UL } from './Profile.styles'

const Profile = (props) => {
    return(
        <div>
            <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
            <div style={{width: '50%'}}>
                <UL>
                    <LI>Collections</LI>
                    <LI>Posts</LI>
                    <LI>Settings</LI>
                </UL>
            </div>
            {/* <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton> */}
            <Collections setHomePhotoInformation={props.setHomePhotoInformation} setPageRoute={props.setPageRoute} user={props.user}/>
            <UserPosts getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} setPhotoInformation={props.setPhotoInformation} setPageRoute={props.setPageRoute} user={props.user} />
        </div>
    )
}

export default Profile