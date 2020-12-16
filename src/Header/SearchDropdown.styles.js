import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    visibility: ${props=>props.visibility ? 'null' :'hidden'};
    display: ${props=>props.visibility ? 'flex' :'none'};
    background-color: white;
    height: 100vh;
    width: 100vw;
    /* height: 500px;
    width: 300px; */
    /* justify-content: center; */
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 2;
    opacity: .95;
`
export const CancelContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const Cancel = styled.div`
    position: absolute;
    right: 0;
    margin-right: 15px;
    font-size: 70px;
    cursor: pointer;
`

export const SearchInput = styled.input`
    height: 50px;
    font-size: 30px;
`

export const ResultsContainer = styled.div`
    padding: 10px;
    width: 100vw;
    /* background-color: #ededed; */
    /* position: absolute; */
    /* right: 0;
    left: 0; */
    /* transform: translate(-50%, -50%); */
    z-index: 3;
    opacity: .96;
    /* box-shadow: 0px 5px 6px rgba(0, 0, 0, .4); */
    @media (max-width: 690px) {
        left: -70%;
    }
`

export const Image = styled.img`
    height: 50px;
    width: 50px;
    object-fit: cover;
`

export const ResultContainer = styled.div`
    cursor: pointer;
    display: flex;
    padding: 20px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, .1);
    &:hover {
        background-color: #d9d7d7;
    }
`

export const Text = styled.div`
    color: #242424;
`