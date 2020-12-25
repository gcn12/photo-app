import React, { useState } from 'react'
import UserPosts from '../UserPosts/UserPosts'
import { SubmitButton } from '../AddContent/AddContent.styles'
import Collections from '../Collections/Collections'
import Settings from '../Settings/Settings'
import { Link } from 'react-router-dom'
import { 
    UL, 
    HeaderContainer,
    Container,
    LI,
} from './Profile.styles'

const Profile = (props) => {
    const [profilePage, setProfilePage] = useState(props.match.params.route)
    return(
        <div style={{marginTop: '55px'}}>
            <SubmitButton onClick={()=>props.history.goBack()}>Back</SubmitButton>
            <Container>
                <HeaderContainer>
                    <UL>
                        <Link to='/photo-app/profile/collections' style={{textDecoration: 'none'}}>
                            <LI style={{borderBottom: profilePage!=='posts' && profilePage!=='settings'  ? '1px solid #242424' : null}} onClick={()=>setProfilePage('collections')}>Collections</LI>
                        </Link>
                        <Link to='/photo-app/profile/posts' style={{textDecoration: 'none'}}>
                            <LI style={{borderBottom: profilePage==='posts' ? '1px solid #242424' : null}} onClick={()=>setProfilePage('posts')}>Posts</LI>
                        </Link>
                        <Link to='/photo-app/profile/settings' style={{textDecoration: 'none'}}>
                            <LI style={{borderBottom: profilePage==='settings' ? '1px solid #242424' : null}} onClick={()=>setProfilePage('settings')}>Settings</LI>
                        </Link>
                    </UL>
                </HeaderContainer>
                {(()=> {
                    switch (profilePage) {
                        case 'posts': 
                            return( 
                                <UserPosts history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} setPhotoInformation={props.setPhotoInformation} user={props.user} />
                            )
                        case 'collections':
                            return(
                                <Collections history={props.history} setHomePhotoInformation={props.setHomePhotoInformation} user={props.user}/>
                            )
                        case 'settings':
                            return <Settings history={props.history} setUser={props.setUser} />
                        default:
                            return <Collections history={props.history} setHomePhotoInformation={props.setHomePhotoInformation} user={props.user}/>
                    }

                })()}
            </Container>
        </div>
    )
}

export default Profile