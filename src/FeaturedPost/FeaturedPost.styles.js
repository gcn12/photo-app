import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const InfoContainer = styled.div`
    display: flex;
    justify-content: ${props=> props.justify};
    align-items: center;
    margin: 12px 0 48px 0; 
`

export const Title = styled.h1`
    font-size: 54px;
    font-family: ${props=> props.font};
    font-weight: 400;
    margin-top: 16px;
    text-align: center;
    @media (min-width: 1000px) {
        max-width: 80vw;
    }
    @media (max-width: 1000px) {
        font-size: 48px;
    }
    @media (max-width: 500px) {
        font-size: 36px;
    }
    
`

export const Author = styled.div`
    color: #595959;
    font-size: 20px;
    font-weight: 300;
    font-family: ${props=> props.font};
    display: inline-block;
`

export const DateStyle = styled.div`
    font-family: ${props=> props.font};
    font-size: 20px;
`

export const Description = styled.div`
    font-family: ${props=> props.font};
    width: 50vw;
    font-size: 20px;
    white-space: pre-wrap;
    line-height: 32px;
    text-justify: inter-word;
    @media (max-width: 1300px) {
        width: 60vw;
        margin: 0px;
    }
    @media (max-width: 1000px) {
        width: 85vw;
        margin: 0px;
        font-size: 18px;
    }
    @media (max-width: 500px) {
        width: 90vw;
        margin: 0px;
        font-size: 16px;
    }
`

export const AddCollectionHeartContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

export const BodyImage = styled.img`
    width: ${props=> props.imageQuantity > 1 ? `calc(${props.width} * 65vw - ${props.imageGap} * ${props.width})` : 'auto'};
    margin: ${props=>  props.margin};
    max-height: 90vh;
    max-width: 65vw;
    display: block;
    cursor: zoom-in;
    @media (max-width: 1000px) {
        width: ${props=> props.imageQuantity > 1 ? `calc(${props.width} * 90vw - ${props.imageGap} * ${props.width})` : 'auto'};
        max-width: 90vw;
    }
`

export const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const BodyImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Header = styled.div`
    font-size: 36px;
    font-family: ${props=> props.font};
    font-weight: 400;
    width: 50vw;
    @media (max-width: 1000px) {
        width: 85vw;
        font-size: 30px;
    }
    @media (max-width: 500px) {
        width: 90vw;
    }
`

export const Caption = styled.div`
    font-size: 20px;
    font-weight: 300;
    font-family: ${props=> props.font};
    margin: 0 0 0 0;
    @media (max-width: 1000px) {
        width: 85vw;
    }
    @media (max-width: 500px) {
        width: 90vw;
    }
`

export const PostFooterContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 96px 0;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`

export const ButtonLabelContainer = styled.button`
    border: none;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    @media (max-width: 500px) {
        margin-bottom: 48px;
    }
`

export const ButtonLabel = styled.div`
    margin-top: 8px;
    font-size: 18px;
    font-weight: 300;
`

export const UserBioContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 64px;
    @media (max-width: 500px) {
        flex-direction: column;
    }
`

export const BioContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 500px) {
        justify-content: center;
        align-items: center;
    }
`

export const ProfileImage = styled.img`
    height: 120px;
    width: 120px;
    border-radius: 5px;
    margin-right: 16px;
    object-fit: cover;
`

export const BioUsername = styled.div`
    font-weight: 500;
    /* line-height: 30px; */
    /* margin-bottom: 4px; */
    font-size: 30px;
    color: #242424;
    display: inline-block;
`

export const BioName = styled.div`
    font-size: 16px;
    margin-bottom: 12px;
`

export const Bio = styled.div`
    max-width: 400px;
    color: #4D4D4D;
    font-weight: 500;
    @media (max-width: 500px) {
        width: 350px;
        margin: 2% 5%;
        vertical-align: middle; 
        text-align: center;
    }
`

export const FeaturedPostContainer = styled.div`
    opacity: ${props=>props.opacity};
`

export const MainImage = styled.img`
    height: auto;
    width: auto;
    max-height: 90vh;
    max-width: 90vw;
    display: ${props=>props.display};
`

export const PlaceholderImage = styled.img`
    filter: blur(5px);
    object-fit: contain;
    max-height: 90vh;
    max-width: 90vw;
    width: 100%;
    height: 100%;
    opacity: ${props=>props.opacity};
    display: ${props=>props.display};
`

export const CenterDate = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
`

export const ElementSpacings = styled.div`
    margin-bottom: ${props=>props.spacing};
`