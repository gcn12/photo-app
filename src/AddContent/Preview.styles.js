import styled from 'styled-components'
import { motion } from 'framer-motion'

export const PreviewContainer = styled(motion.div)`
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    position: absolute; 
    top: 2%;
    left: 10%;
` 

export const BodyImagePreview = styled.img`
    /* width: 70vw; */
    width: ${props=> `${props.width}vw`};
`