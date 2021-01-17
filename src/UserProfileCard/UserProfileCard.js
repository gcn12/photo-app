import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as SquareAvatar } from '../Icons/SquareAvatar.svg'
import {
    UserBioContainer,
    ProfileImage,
    BioContainer,
    Bio,
    BioName,
    BioUsername,
} from './UserProfileCard.styles'

const UserProfileCard = (props) => {
    return(
        <UserBioContainer>
            {console.log(props)}
            <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                {props?.photoInformation?.profileImage  ? 
                <ProfileImage src={props.photoInformation.profileImage } />
                :
                <SquareAvatar style={{ transform: 'scale(4.5)', marginRight: '50px' }}/>
                }
            </Link>
            <BioContainer>
                <Link to={`/photo-app/profiles/${props?.photoInformation?.username}`} style={{textDecoration: 'none'}}>
                    <BioUsername>{props?.photoInformation?.username}</BioUsername>
                </Link>
                <BioName>{props?.photoInformation?.author}</BioName>
                <Bio>{props?.photoInformation?.bio}</Bio>
                
            </BioContainer>
        </UserBioContainer>
    )
} 

export default UserProfileCard