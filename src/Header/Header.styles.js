import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 30px 20px;
    padding: 10px 0 0 0;

    @media(max-width: 550px) {
        /* margin: 0 0 10px; */
        margin: 0 20px;
    }
`

export const UL = styled.ul`
    /* width: 90%; */
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    font-size: 25px;
    &:hover{
        color: #4a4a4a
    }
`

export const LI = styled.li`
    margin-right: 15px;
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
    font-size: 22px;
    margin: 0 5px;
    &:hover{
        color: #4a4a4a
    }
`

export const HeaderRight = styled.div`
    display: flex;
    @media(max-width: 550px){
        visibility: hidden;
        display: none;
    }
`

export const IconContainer = styled.div`
    cursor: pointer;
    @media (min-width: 550px) {
        visibility: hidden;
        display: none;
    }
`