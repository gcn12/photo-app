import React from 'react'
import UserPosts from '../UserPosts/UserPosts'
import { SubmitButton } from '../AddContent/AddContent.styles'

const Profile = (props) => {
    return(
        <div>
            <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
            <UserPosts />
        </div>
    )
}

export default Profile