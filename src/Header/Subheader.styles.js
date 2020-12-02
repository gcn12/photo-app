import styled from 'styled-components'

export const Container = styled.div`
    margin: 0 30px;
`

export const UL = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    list-style-type: none;
    /* justify-content: space-evenly; */
`

export const LI = styled.ul`
    font-size: 18px;
    padding: 0;
    margin: 0 25px 0 0px;
    /* text-decoration: ${props=> props.underline ? 'underline' : null}; */
    border-bottom: ${props=> props.underline ? '1px solid black' : null};
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 

    &:hover {
        color: #4a4a4a;
    }
`