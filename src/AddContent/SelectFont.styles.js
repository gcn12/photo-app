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
    line-height: 40px;
    /* text-align: justify; */
    /* white-space: pre-line; */
    white-space: pre-wrap;
    text-justify: inter-word;
`

export const FontOption = styled.option`
    font-family: ${props=> props.font};
    /* font-size: 20px; */
`

export const FontSelect = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%238C98F2'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
    background-size: 12px;
    background-position: calc(100% - 15px) center;
    background-repeat: no-repeat;
    font-size: 20px;
    padding: 10px 30px 10px 10px;
`