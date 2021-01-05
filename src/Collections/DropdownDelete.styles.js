import styled from 'styled-components'

export const Container = styled.div`
    width: 130px;
    height: 75px;
    position: absolute;
    background-color: white;
    font-size: 20px;
    transform: translate(-93%, 0%);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
`

export const Options = styled.div`
    display: flex;
    flex-direction: column;
`

export const Option = styled.div`
    margin: 2px 8px 2px 0;
    padding: 0 5px;
    &:hover {
        background-color: #dedede;
        /* color: white; */
    }
`