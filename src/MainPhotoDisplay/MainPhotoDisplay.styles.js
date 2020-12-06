import styled from 'styled-components'

export const PhotoDescriptionViewContainer = styled.div`
    margin: 2% 7%;
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 2%;
    grid-row-gap: 2%;
    align-items: center;
    justify-items: center;
    justify-content: center;

    @media (max-width: 1100px){
        grid-template-columns: repeat(2, auto);
    }
    @media (max-width: 750px){
        grid-template-columns: repeat(1, auto);
    }
` 

export const LazyButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const Container = styled.div`
    margin: 0 15px;
    margin-left: 40px;

    @media (max-width: 670px) {
        margin: 0;
        margin-left: 0px;
    }
`

export const SortSelect = styled.select`
    height: 40px;
    width: 150px;
    color: white;
    background-color: black;
    border: none;
    border-radius: 5%;
    margin-bottom: 10px;
    font-size: 15px;
`