import styled from 'styled-components'

export const UserBioContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    @media (max-width: 550px) {
        flex-direction: column;
    }
`

export const ProfileImage = styled.img`
    height: 120px;
    width: 120px;
    border-radius: 5px;
    margin-right: 15px;
    object-fit: cover;
`

export const BioContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 550px) {
        justify-content: center;
        align-items: center;
    }
`

export const BioUsername = styled.div`
    font-weight: 500;
    margin-bottom: 5px;
    font-size: 30px;
    color: #242424;
`

export const BioName = styled.div`
    font-size: 16px;
    margin-bottom: 15px;
`

export const Bio = styled.div`
    width: 380px;
    color: #4D4D4D;
    font-weight: 500;
    @media (max-width: 550px) {
        width: 350px;
        margin: 2% 5%;
        vertical-align: middle; 
        text-align: center;
    }
`