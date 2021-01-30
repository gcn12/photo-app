import styled from 'styled-components'

export const ResultsContainer = styled.div`
    width: 320px;
    background-color: #ededed;
    position: absolute;
    left: -30%;
    z-index: 3;
    opacity: .96;
    box-shadow: 0px 5px 6px rgba(0, 0, 0, .4);
    @media (max-width: 690px) {
        left: -70%;
    }
`

export const Container = styled.div`
    position: relative;
    @media (min-width: 720px) {
        display: none;
    }
`

export const ContainerAbsolute = styled.div`
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 720px) {
        display: none;
    }
`

export const SearchBox = styled.input`
    text-indent: 27px;
    border: 0;
    padding: 3px;
    background-color: #ededed;
    border-radius: 15px;
    height: 28px;
    font-size: 20px;
    width: 300px;
    &::-webkit-input-placeholder {
        text-indent: 27px;
        color: #707070;
    }

    &:-moz-placeholder { 
        text-indent: 27px;
        color: #707070;
    }

    &::-moz-placeholder {
        text-indent: 27px;
        color: #707070;
    }

    &:-ms-input-placeholder {  
        text-indent: 27px;
        color: #707070;
    }

    @media (max-width: 720px) {
        width: 40vw;
        min-width: 100px;
    }
`

export const MoreResults = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px 15px;
    cursor: pointer;
    &:hover{
        background-color: #d1d1d1;
    }
`