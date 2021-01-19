import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userPosts, userData } from '../Redux/Actions/appActions'
import {
    UserBioContainer,
    ProfileImage,
    BioContainer,
    Bio,
    BioName,
    BioUsername,
} from './UserProfileCard.styles'

const UserProfileCard = (props) => {

    const clearDataOnProfileView = () => {
        props.dispatch(userData([]))
        props.dispatch(userPosts([]))
    }

    return(
        <UserBioContainer>
            <Link onClick={clearDataOnProfileView} to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                {props?.photoInformation?.profileImage  ? 
                <ProfileImage src={props.photoInformation.profileImage } />
                :
                <ProfileImage src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyNGgtMjR2LTI0aDI0djI0em0tMi0yMmgtMjB2MjBoMjB2LTIwem0tNC4xMTggMTQuMDY0Yy0yLjI5My0uNTI5LTQuNDI3LS45OTMtMy4zOTQtMi45NDUgMy4xNDYtNS45NDIuODM0LTkuMTE5LTIuNDg4LTkuMTE5LTMuMzg4IDAtNS42NDMgMy4yOTktMi40ODggOS4xMTkgMS4wNjQgMS45NjMtMS4xNSAyLjQyNy0zLjM5NCAyLjk0NS0yLjA0OC40NzMtMi4xMjQgMS40OS0yLjExOCAzLjI2OWwuMDA0LjY2N2gxNS45OTNsLjAwMy0uNjQ2Yy4wMDctMS43OTItLjA2Mi0yLjgxNS0yLjExOC0zLjI5eiIvPjwvc3ZnPg=="  />
                }
            </Link>
            <BioContainer>
                <Link onClick={clearDataOnProfileView} to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                    <BioUsername>{props?.photoInformation?.username}</BioUsername>
                </Link>
                <BioName>{props?.photoInformation?.name}</BioName>
                <Bio>{props?.photoInformation?.bio}</Bio>
                
            </BioContainer>
        </UserBioContainer>
    )
} 

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(UserProfileCard)