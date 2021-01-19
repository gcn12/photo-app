import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Title = styled.div`
    font-size: 36px;
    font-family: ${props=> props.font};
` 

export const AddCollectionHeartContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

export const Description = styled.div`
    /* color: white; */
    width: 65vw;
    margin: 20px 0;
    font-size: 20px;
    white-space: pre-wrap;
    /* text-align: justify; */
    text-justify: inter-word;
    font-family: ${props=> props.font};
`

export const Author = styled.div`
    font-family: ${props=> props.font};
    /* color: #242424; */
`

export const PreviewContainer = styled(motion.div)`
    /* border: 10px solid black; */
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    display: ${props=> props.visibility ? 'null' : 'none'};
    /* position: absolute; 
    top: 2%;
    left: 10%; */
` 
 
export const PreviewContainer2 = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
`

export const BodyImagePreview = styled.img`
    /* width: 70vw; */
    width: ${props=> props.width};
    height: auto;
    margin: 0 1%;

    max-height: 85vh;
    max-width: 65vw;
    display: block;
    /* height: 400px; */
    /* width: auto; */
`