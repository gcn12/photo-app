import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 40px 14px 30px;
    padding: 10px 0 0 0;
    position: relative;

    @media(max-width: 720px) {
        margin: 0 10px 20px 10px;
    }
`

export const UL = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    font-size: 24px;
    &:hover{
        color: #4a4a4a
    }
`

export const LI = styled.li`
    font-weight: 500;
    color: #242424;
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
`

export const Border = styled.div`
    background-color: #fcfcfc;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
`

export const Navigation = styled.div`
    font-weight: 500;
    color: #242424;
    text-decoration: none;
    white-space: nowrap;
    cursor: ${props=>props.cursor};
    font-size: 24px;
    margin: 0 5px;
    &:hover{
        color: #4a4a4a
    }
`

export const HeaderRight = styled.div`
    display: flex;
    visibility: ${props=>props.visibility};
    /* max-width: 200px; */
    height: 35px;
    @media(max-width: 720px){
        visibility: hidden;
        display: none;
    }
`

export const ProfileImage = styled.img`
    /* margin: 0 5px; */
    border-radius: 50%;
    height: 35px;
    width: 35px;
    cursor: pointer;
    object-fit: cover;
`

export const ProfileButton = styled.button`
    text-align: center;
    border: none;
    background-color: transparent;
    width: 35px;
    height: 35px;
`