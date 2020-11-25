import React, { useState } from 'react'
import UserPosts from '../UserPosts/UserPosts'
import { SubmitButton } from '../AddContent/AddContent.styles'
import Collections from '../Collections/Collections'
import Settings from '../Settings/Settings'
import { LI } from '../Header/Header.styles'
import { 
    UL, 
    HeaderContainer,
    Container,
} from './Profile.styles'

const Profile = (props) => {
    const [profilePage, setProfilePage] = useState('Collections')
    return(
        <Container>
            <SubmitButton onClick={()=>props.setPageRoute('GetPhotos')}>Back</SubmitButton>
            <HeaderContainer>
                <UL>
                    <LI style={{textDecoration: profilePage==='Collections' ? 'underline' : null}} onClick={()=>setProfilePage('Collections')}>Collections</LI>
                    <LI style={{textDecoration: profilePage==='Posts' ? 'underline' : null}} onClick={()=>setProfilePage('Posts')}>Posts</LI>
                    <LI style={{textDecoration: profilePage==='Settings' ? 'underline' : null}} onClick={()=>setProfilePage('Settings')}>Settings</LI>
                </UL>
            </HeaderContainer>
            {(()=> {
                switch (profilePage) {
                    case 'Posts': 
                        return(
                            <UserPosts getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} setPhotoInformation={props.setPhotoInformation} setPageRoute={props.setPageRoute} user={props.user} />
                        )
                    case 'Collections':
                        return(
                            <Collections setHomePhotoInformation={props.setHomePhotoInformation} setPageRoute={props.setPageRoute} user={props.user}/>
                        )
                    case 'Settings':
                        return <Settings />
                    default:
                        return null
                }

            })()}
        </Container>
    )
}

export default Profile