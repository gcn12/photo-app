import styled from 'styled-components'
import { motion } from 'framer-motion'

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
`

export const BodyImagePreview = styled.img`
    /* width: 70vw; */
    width: ${props=> `${props.width}vw`};
`