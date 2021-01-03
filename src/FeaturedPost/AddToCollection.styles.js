import styled from 'styled-components'

export const Container = styled.div`
    height: 200px;
    z-index: 2;
    width: 30vw;
    background-color: #f5f5f5;
    margin: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0px 0px 1px 100vmax rgba(0,0,0,0.8);

    @media (max-width: 1100px) {
        width: 40vw;
    }
    @media (max-width: 800px) {
        width: 60vw;
        height: 180px;
    }
    @media (max-width: 550px) {
        width: 80vw;
        height: 180px;
    }
`

export const Cancel = styled.button`
    height: 50px;
    width: 90px;
    font-size: 15px;
    background-color: #cfcfcf;
    color: black;
    border: none;
    border-radius: 2px;
    cursor: pointer;
`

export const Text = styled.div`
    font-size: ${props=> props.size};
`

export const RenameButton = styled.button`
    width: 120px;
    height: 50px;
    font-size: 20px;
    background-color: #242424;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
`

export const ButtonContainer = styled.div`
    display: flex;
`