import React, { useEffect } from 'react'
// import { SubmitButton } from '../AddContent/AddContent.styles'
import Collections from '../Collections/Collections'
import { connect } from 'react-redux'
import Settings from '../Settings/Settings'
import UserPrivateProfile from '../UserPrivateProfile/UserPrivateProfile'
import SavedPosts from '../SavedPosts/SavedPostsComponent'
import AdmiredPosts from '../AdmiredPosts/AdmiredPostsComponent'
import{ profilePage } from '../Redux/Actions/profileActions'
import ProfileHeaderMobile from './ProfileHeaderDesktop'
import ProfileHeaderDesktop from './ProfileHeaderMobile'
import { 
    Container,
} from './Profile.styles'

const Profile = (props) => {

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
                <ProfileHeaderMobile />
                <ProfileHeaderDesktop />
                {(()=> {
                    switch (props.profilePage) {
                        case 'my profile':
                            return( 
                                <UserPrivateProfile getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} getUserProfile={props.getUserProfile} history={props.history} />
                            )
                        case 'saved':
                            return( 
                                <SavedPosts history={props.history} />
                            )
                        case 'admired': 
                            return( 
                                <AdmiredPosts history={props.history} />
                            )
                        case 'collections':
                            return(
                                <Collections history={props.history} />
                            )
                        case 'settings':
                            return <Settings history={props.history} setUser={props.setUser} />
                        default:
                            return <UserPrivateProfile getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} getUserProfile={props.getUserProfile} history={props.history} />
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