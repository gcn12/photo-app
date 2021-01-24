import styled from 'styled-components'

export const Container = styled.div`
    width: auto;
    height: auto;
    position: absolute;
    background-color: white;
    font-size: 20px;
    transform: translate(-93%, 0%);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
`

export const Options = styled.div`
    display: flex;
    flex-direction: column;
`

export const Option = styled.div`
    margin: 0px 0px 0 5px;
`

export const OptionIconContainer = styled.div`
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: ${props=>props.radius};
    &:hover {
        background-color: #dedede;
    }
`