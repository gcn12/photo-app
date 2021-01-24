import styled from 'styled-components'
import { motion } from 'framer-motion'

export const DisplayContainer = styled(motion.div)`
    opacity: ${props=> props.opacity};
    transition: opacity 700ms ease-in-out;
`

export const PhotoDescriptionViewContainer = styled.div`
    margin: 0% 7%;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 2%;
    grid-row-gap: 0%;
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
    display: flex;
    justify-content: center;
`

export const PhotoTitle = styled.div`
    transform: scale(.9);
    color: white;
    opacity: 0;
    transition: opacity 500ms;
    transition-delay: 250ms;
    white-space: nowrap;
`

export const PhotoLocation = styled.div`
    transform: scale(0.7);
    opacity: 0;
    transition: opacity 500ms;
    transition-delay: 250ms;
    font-size: 20px;
    white-space: nowrap;
    color: white;
`

export const Image = styled.img`
    opacity: ${props=>props.opacity};

    filter: brightness(1);
    transition: filter 2000ms ease;
    transition: 800ms ease;
    transition-delay: 250ms;
    max-height: 200px;
    width: auto;
    flex-grow: 99999;
`

export const PhotoContainer = styled.div`

    height: 200px;
    line-height: 200px;
    color: white;
    margin: 0 1rem 1rem 0;
    flex: 1 0 auto;
    cursor: pointer;

    &:hover ${PhotoTitle}{
        opacity: 1;
    }

    &:hover ${PhotoLocation}{
        opacity: 1;
    }

    &:hover ${Image} {
        filter: brightness(.3);
    }
`