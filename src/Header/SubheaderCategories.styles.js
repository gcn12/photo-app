import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    right: 8%;
    top: 10%;
    background-color: white;
    padding: 20px;
    z-index: 1;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .3);
    border-radius: 3px;
`

export const UL = styled.ul`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0;
    margin: 0;
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
`