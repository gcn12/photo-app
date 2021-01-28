import React, { useEffect } from 'react'
import CollectionsProfilePage from '../Collections/CollectionsProfilePage'
import { connect } from 'react-redux'
import UserPrivateProfile from '../UserPrivateProfile/UserPrivateProfile'
import SavedPostsDisplay from '../SavedPosts/SavedPostsDisplay'
import AdmiredPosts from '../AdmiredPosts/AdmiredPostsComponent'
import{ profilePage } from '../Redux/Actions/profileActions'
import ProfileHeaderDesktop from './ProfileHeaderDesktop'
import ProfileHeaderMobile from './ProfileHeaderMobile'

const Profile = (props) => {

    const route = props.match.params
    useEffect(()=> {
        let page = route.route
        if(route.route === 'my-profile') {
            page = 'my profile'
        }
        if(page) {
            props.dispatch(profilePage(page))
        }else{
            props.dispatch(profilePage('my profile'))
        }
        console.log('profile loaded')
        // eslint-disable-next-line
    }, [])
    return(
        <div style={{marginTop: '85px'}}>
            <ProfileHeaderDesktop />
            <ProfileHeaderMobile />
            {(()=> {
                switch (props.profilePage) {
                    case 'my profile':
                        return( 
                            <UserPrivateProfile getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} getUserProfile={props.getUserProfile} history={props.history} />
                        )
                    case 'saved':
                        return( 
                            <SavedPostsDisplay history={props.history} />
                        )
                    case 'admired': 
                        return( 
                            <AdmiredPosts history={props.history} />
                        )
                    case 'collections':
                        return(
                            <CollectionsProfilePage history={props.history} />
                        )
                    default:
                        return <UserPrivateProfile getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} getUserProfile={props.getUserProfile} history={props.history} />
                }

            })()}
        </div>
    )
}

const mapStateToProps = state => ({
    profilePage: state.profile.profilePage
})

export default connect(mapStateToProps)(Profile)