import React, { useEffect } from 'react'
import Collections from '../Collections/Collections'
import { connect } from 'react-redux'
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