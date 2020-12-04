import React, { useState } from 'react'
import UserPosts from '../UserPosts/UserPosts'
import { SubmitButton } from '../AddContent/AddContent.styles'
import Collections from '../Collections/Collections'
import Settings from '../Settings/Settings'
import { 
    UL, 
    HeaderContainer,
    Container,
    LI,
} from './Profile.styles'

const Profile = (props) => {
    const [profilePage, setProfilePage] = useState('Collections')
    return(
        <Container>
            <SubmitButton onClick={()=>props.history.goBack()}>Back</SubmitButton>
            <HeaderContainer>
                <UL>
                    <LI style={{borderBottom: profilePage==='Collections' ? '1px solid #242424' : null}} onClick={()=>setProfilePage('Collections')}>Collections</LI>
                    <LI style={{borderBottom: profilePage==='Posts' ? '1px solid #242424' : null}} onClick={()=>setProfilePage('Posts')}>Posts</LI>
                    <LI style={{borderBottom: profilePage==='Settings' ? '1px solid #242424' : null}} onClick={()=>setProfilePage('Settings')}>Settings</LI>
                </UL>
            </HeaderContainer>
            {(()=> {
                switch (profilePage) {
                    case 'Posts': 
                        return( 
                            <UserPosts getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} setPhotoInformation={props.setPhotoInformation} user={props.user} />
                        )
                    case 'Collections':
                        return(
                            <Collections history={props.history} setHomePhotoInformation={props.setHomePhotoInformation} user={props.user}/>
                        )
                    case 'Settings':
                        return <Settings history={props.history} setUser={props.setUser} />
                    default:
                        return null
                }

            })()}
        </Container>
    )
}

export default Profile