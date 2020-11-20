import React from 'react'
import UserPosts from '../UserPosts/UserPosts'
import Collections from '../Collections/Collections'
import { SubmitButton } from '../AddContent/AddContent.styles'

const Profile = (props) => {
    return(
        <div>
            <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
            <Collections user={props.user}/>
            <UserPosts setPhotoInformation={props.setPhotoInformation} setPageRoute={props.setPageRoute} user={props.user} />
        </div>
    )
}

export default Profile