import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Container = styled(motion.div)`
    visibility: ${props=>props.visibility ? 'null' :'hidden'};
    display: ${props=>props.visibility ? 'null' :'none'};
    background-color: white;
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: 1;
    opacity: .93;
`

export const CenterList = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LI = styled.li`
    padding: 0;
    font-size: 30px;
    margin: 0 0 15px 0px;
    border-bottom: ${props=> props.underline ? '1px solid black' : null};
    cursor: pointer;
    -webkit-touch-callout: none; 
    -webkit-user-select: none; 
    -khtml-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
    

    &:hover {
        color: #4a4a4a;
    }
`

export const UL = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media (min-width: 670px) {
        display: none;
        visibility: hidden;
        /* list-style-type: none; */
        /* flex-direction: column; */
        /* display: block; */
    }
    /* justify-content: space-evenly; */
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