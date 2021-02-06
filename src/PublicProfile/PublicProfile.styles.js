import styled from 'styled-components'

export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 5px;
    overflow: hidden;
    object-fit: cover;
    box-shadow:  0 5px 5px 0px  rgba(0, 0, 0, .2);
    @media(max-width: 720px) {
        margin-top: 12px;
    }
`

export const Container = styled.div`
    width: 250px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px 0 20px;
    border-radius: 3px;
    margin: 20px 30px 0px 30px;
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, max-content));
    grid-column-gap: 20px;
    margin: 0 50px 20px 340px;
    justify-content: center;

    @media(max-width: 720px) {
        margin: 30px 50px 0 50px;
    }
`

export const UserContainer = styled.div`
    opacity: ${props=>props.opacity};
    transition: opacity 200ms ease-in-out;
    margin-top: 30px;
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;

    @media(max-width: 720px) {
        position: initial;
    }
`

export const Username = styled.div`
    font-weight: 500;
    font-size: 24px;
    margin-bottom: 4px;

    white-space: pre-wrap;    
    white-space: -moz-pre-wrap;    
    white-space: -pre-wrap;       
    white-space: -o-pre-wrap;     
    word-wrap: break-word; 
`

export const Name = styled.div`
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 24px;
    display: inline-block;
    white-space: nowrap;
`


export const Bio = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;
    vertical-align: middle; 
    text-align: center;
    margin-bottom: 20px;
    white-space: pre-wrap;
`

export const EditButton = styled.button`
    height: auto;
    width: auto;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid black;
    padding: 5px 10px;
    cursor: pointer; 
`

export const PublicProfileContainer = styled.div`
    opacity: ${props=>props.opacity};
    transition: opacity 200ms ease-in-out;
    margin-top: 55px;
    @media(max-width: 720px) {
        margin-top: 65px;
    }
`

export const PrivateContainer = styled.div`
    margin-top: 10px;
    position: relative;
    opacity: ${props=>props.opacity};
    transition: opacity 200ms ease-in-out;
`

export const NoPostsWrittenContainerAbsolute = styled.div`
    position: absolute;
    top: 20%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 400px;
    @media(max-width: 1000px) {
        width: 300px;
        left: 68%;
    }
    @media(max-width: 720px) {
        display: none;
    }
`

export const MarginBottomMobile = styled.div`
   @media(min-width: 720px) {
        margin-bottom: 40px;
    } 
`

export const NoPostsWrittenTextAbsolute = styled.div`
    font-size: 24px;
    font-weight: 500;
`

export const NoPostsWrittenContainer = styled.div`
    display: flex;
    justify-content: center;
    @media(min-width: 720px) {
        display: none;
    }
`

export const NoPostsWrittenText = styled.div`
    @media(min-width: 720px) {
        display: none;
    }
    font-size: 16px;
    font-weight: 500;
`