import styled from 'styled-components'

export const Container = styled.div`
    width: 120px;
    height: 80px;
    position: absolute;
    background-color: white;
    font-size: 20px;
    transform: translate(-85%, 0%);
    /* left: 0;
    top: 0; */
    color: #242424;
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
    cursor: pointer;
    &:hover {
        background-color: #dedede;
    }
`