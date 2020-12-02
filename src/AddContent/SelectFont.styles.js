import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    display: ${props=> props.visibility ? 'null' : 'none'};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Title = styled.div`
    font-size: 40px;
`

export const Paragraph = styled.div`
    font-size: 30px;
    padding: 0 20%;
    font-family: ${props=> props.font};
    text-align: justify;
`

export const FontOption = styled.option`
    font-family: ${props=> props.font};
`