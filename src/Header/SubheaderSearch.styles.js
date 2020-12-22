import styled from 'styled-components'

export const Container = styled.div`
    margin: 0 30px;

    @media (max-width: 550px) {
        margin: 0 16px;
    }
`

export const UL = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    
    @media (max-width: 690px) {
        display: none;
        visibility: hidden;
        /* list-style-type: none; */
        /* flex-direction: column; */
        /* display: block; */
    }
    /* justify-content: space-evenly; */
`

export const ULMobile = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    
    @media (min-width: 690px) {
        display: none;
        visibility: hidden;
        /* list-style-type: none; */
        /* flex-direction: column; */
        /* display: block; */
    }
    /* justify-content: space-evenly; */
`

export const LI = styled.ul`
    color: #242424;
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
    text-transform: capitalize;

    &:hover {
        color: #4a4a4a;
    }
`

export const CategoriesButton = styled.div`
    margin-right: 15px;
    cursor: pointer;
    position: relative;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
    &::first-letter {
        text-transform: capitalize;
    }
`