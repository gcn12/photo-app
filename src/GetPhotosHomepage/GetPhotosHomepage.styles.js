import styled from 'styled-components'

export const Container = styled.div`
    margin: 0 15px;
    margin-left: 35px;
`

export const Image = styled.img`
    width: ${props => props.width};

    @media(max-width: 520px) {
        width: 40vw;
    }

    @media(max-width: 400px) {
        width: 90vw;
    }

    cursor: pointer;
    animation: fadeIn ease 3s;
    -webkit-animation: fadeIn ease 3s;
    -moz-animation: fadeIn ease 3s;
    -o-animation: fadeIn ease 3s;
    -ms-animation: fadeIn ease 3s;
    
    @keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @-moz-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @-webkit-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @-o-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }

    @-ms-keyframes fadeIn {
        0% {opacity:0;}
        100% {opacity:1;}
    }
`

