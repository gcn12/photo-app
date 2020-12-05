import styled from 'styled-components'

export const HeaderContainer = styled.div`
    /* justify-content: center;
    display: flex; */
`

export const UL = styled.ul`
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;
    padding: 0;
    margin: 0;
`

export const Container = styled.div`
    margin: 0 10%;
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