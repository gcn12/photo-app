import styled from 'styled-components'

export const CitiesDisplayContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 1%;
    align-items: start;
    justify-content: center;
    justify-items: ${props=> props.quantity};
    margin-bottom: 30px;
    @media (max-width: 675px){
        justify-items: center;
    }
`

export const PostsDisplayContainer = styled.div`
    display: grid;
    align-items: start;
    margin-bottom: 30px;
    /* grid-template-columns: repeat(3, auto); */
    grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
    grid-column-gap: 6%;
    grid-row-gap: 0%;
    align-items: start;
    justify-content: center;
    justify-items: ${props=> props.quantity};
    @media (max-width: 675px){
        justify-items: center;
    }
`

export const UsersContainer = styled.div`
    display: grid;
    align-items: start;
    /* grid-template-columns: repeat(3, auto); */
    grid-template-columns: repeat(auto-fit, minmax(303px, 1fr));
    grid-column-gap: 2%;
    grid-row-gap: 0%;
    align-items: start;
    justify-content: center;
    justify-items: ${props=> props.quantity};
    @media (max-width: 675px){
        justify-items: center;
    }
`

export const ResultTitle = styled.div`
    font-size: 30px;
`