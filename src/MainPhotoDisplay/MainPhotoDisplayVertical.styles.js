import styled from 'styled-components'

export const DisplayContainer = styled.div`
    margin-top: 125px;
    @media (max-width: 550px){
        margin-bottom: 60px;
        margin-top: 105px;
    }
`

export const PhotoDescriptionViewContainer = styled.div`
    margin: 0% 4%;
    display: grid;
    /* grid-template-columns: repeat(3, auto); */
    grid-template-columns: repeat(auto-fill, minmax(320px, max-content));
    grid-column-gap: 4%;
    grid-row-gap: 0%;
    /* align-items: center; */
    /* justify-items: center; */
    justify-content: center;

    @media (max-width: 750px){
        /* margin: 0% 4%; */
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
    font-size: 16px;
`

export const LoadMoreButtonContainer = styled.div`
    /* position: fixed; */
    display: flex;
    justify-content: center;
`