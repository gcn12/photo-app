import styled from 'styled-components'

export const Container = styled.div`
    margin: 0 30px;

    @media (max-width: 720px) {
        margin: 0 16px;
    }
`

export const ULSearch = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
`

export const UL = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    
    @media (max-width: 720px) {
        display: none;
        visibility: hidden;
    }
`

export const ULMobile = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    
    @media (min-width: 720px) {
        display: none;
        visibility: hidden;
    }
`

export const LI = styled.ul`
    color: #242424;
    font-size: 18px;
    padding: 0;
    border-bottom: ${props=> props.underline ? '1px solid black' : null};
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
    &::first-letter{
        text-transform: capitalize;
    }

    &:hover {
        color: #4a4a4a;
    }
`

export const CategoriesButton = styled.div`
    margin-right: 3px;
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

export const TriangleIcon = styled.div`
    transform: scale(.7);
    position: relative;
    top: 7;
`

export const Margin = styled.div`
    margin-right: 25px;
    @media(max-width: 550px) {
        margin-right: 12px
    }
`

export const ArrowIcon = styled.img`
    transform: scale(.55);
`

export const CategorySelected = styled.div`
    font-weight: 500;
    font-size: 18px;
    &::first-letter {
        text-transform: capitalize;
    }
`