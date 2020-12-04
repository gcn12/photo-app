import styled from 'styled-components'

export const PhotoDescriptionViewContainer = styled.div`
    margin: 0 2%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 20px;
    align-items: stretch;
    justify-items: center;
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