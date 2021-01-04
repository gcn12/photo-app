import React, { useEffect } from 'react'
import UserPosts from '../UserPosts/UserPosts'
// import { SubmitButton } from '../AddContent/AddContent.styles'
import Collections from '../Collections/Collections'
import { connect } from 'react-redux'
import Settings from '../Settings/Settings'
import SavedPosts from '../SavedPosts/SavedPostsComponent'
import{ profilePage } from '../Redux/Actions/profileActions'
import { Link } from 'react-router-dom'
import { 
    UL, 
    HeaderContainer,
    Container,
    LI,
} from './Profile.styles'

const Profile = (props) => {
    // const [profilePage, setProfilePage] = useState(props.match.params.route)

    const route = props.match.params
    useEffect(()=> {
        props.dispatch(profilePage(route.route))
        console.log('profile loaded')
        // eslint-disable-next-line
    }, [])
    return(
        <div style={{marginTop: '85px'}}>
            {/* <SubmitButton onClick={()=>props.history.goBack()}>Back</SubmitButton> */}
            <Container>
                <HeaderContainer>
                    <UL>
                        <Link to='/photo-app/profile/saved' style={{textDecoration: 'none'}}>
                            <LI style={{borderBottom: props.profilePage==='saved'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('saved'))}>Saved</LI>
                        </Link>
                        <Link to='/photo-app/profile/collections' style={{textDecoration: 'none'}}>
                            <LI style={{borderBottom: props.profilePage==='collections'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('collections'))}>Collections</LI>
                        </Link>
                        <Link to='/photo-app/profile/posts' style={{textDecoration: 'none'}}>
                            <LI style={{borderBottom: props.profilePage==='posts' ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('posts'))}>Posts</LI>
                        </Link>
                        <Link to='/photo-app/profile/settings' style={{textDecoration: 'none'}}>
                            <LI style={{borderBottom: props.profilePage==='settings' ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('settings'))}>Settings</LI>
                        </Link>
                    </UL>
                </HeaderContainer>
                {(()=> {
                    switch (props.profilePage) {
                        case 'saved':
                            return( 
                                <SavedPosts history={props.history} />
                            )
                        case 'posts': 
                            return( 
                                <UserPosts history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} />
                            )
                        case 'collections':
                            return(
                                <Collections history={props.history} />
                            )
                        case 'settings':
                            return <Settings history={props.history} setUser={props.setUser} />
                        default:
                            return <Collections history={props.history} />
                    }

                })()}
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    profilePage: state.profile.profilePage
})

export default connect(mapStateToProps)(Profile)