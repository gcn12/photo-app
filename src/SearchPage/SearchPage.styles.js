import styled from 'styled-components'

export const CitiesDisplayContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
    grid-column-gap: 2%;
    grid-row-gap: 2%;
    align-items: start;
    justify-content: center;
    margin-bottom: 30px;
    @media (max-width: 675px){
        justify-items: center;
    }
`

export const PostsDisplayContainer = styled.div`
    display: grid;
    margin-bottom: 30px;
    grid-template-columns: repeat(auto-fit, minmax(310px, max-content));
    grid-column-gap: 6%;
    grid-row-gap: 0%;
    align-items: start;
    justify-content: center;
`

export const UsersContainer = styled.div`
    display: grid;
    align-items: start;
    grid-template-columns: repeat(auto-fit, minmax(550px, max-content));
    grid-column-gap: 2%;
    grid-row-gap: 0%;
    align-items: start;
    justify-content: center;
    @media (max-width: 675px){
        justify-items: center;
    }
`

export const ResultTitle = styled.div`
    font-size: 30px;
    margin: 8px 0;
`

export const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const SeeMore = styled.div`
    font-size: 20px;
    cursor: pointer;
`

export const NoResults = styled.div`
    font-size: 30px;
    cursor: pointer;
    margin-top: 12px;
`