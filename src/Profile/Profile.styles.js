import styled from 'styled-components'

export const HeaderContainer = styled.div`
    /* justify-content: center;
    display: flex; */
    @media(max-width: 550px) {
        visibility: hidden;
        display: none;
    }
`

export const UL = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
    padding: 0;
    margin: 0;
`

export const Container = styled.div`
    /* margin-top: 85px; */
`

export const LI = styled.li`
    color: #242424;
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 

    &:hover {
        border-bottom: 1px solid #242424;
    }
`

export const MobileLI = styled.li`
    color: #242424;
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
    margin-bottom: 8px;
`

export const MobileUL = styled.ul`
    list-style-type: none;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 0;
    margin: 0;
`

export const Navigation = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: 500;
`

export const PageName = styled.div`
    &::first-letter {
        text-transform: capitalize;
    }
`

export const MobileNavigation = styled.div`
    height: ${props=>props.height};
    transition: height 380ms ease-in-out;
    overflow: hidden;
`

export const MobileContainer = styled.div`
    @media(min-width: 550px) {
        visibility: hidden;
        display: none;
    }
`

export const ArrowIcon = styled.img`
    transform: ${props=>props.rotate} scale(.6);
    transition: transform 380ms ease-in-out;
`