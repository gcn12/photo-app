import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    display: ${props=> props.visibility ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Title = styled.div`
    font-size: 40px;
`

export const Paragraph = styled.div`
    font-size: 22px;
    padding: 20px 20%;
    font-family: ${props=> props.font};
    text-align: justify;
    /* white-space: pre-line; */
    white-space: pre-wrap;
    text-justify: inter-word;
`

export const FontOption = styled.option`
    font-family: ${props=> props.font};
    /* font-size: 20px; */
`

export const FontSelect = styled.select`
    font-size: 20px;
    padding: 10px;
`