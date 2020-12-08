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
    margin: 15px 15px 0 15px;

    @media (max-width: 670px) {
        margin: 10px 5px 20px 5px;
    }
`

export const ImageList = styled.div`
    display: grid;
    /* grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); */
    grid-template-columns: repeat(4, auto);
    grid-gap: 0 5px;
    grid-auto-rows: 1px;
    justify-items: center;
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