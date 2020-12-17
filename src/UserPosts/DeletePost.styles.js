import styled from 'styled-components'

export const Container = styled.div`
    height: 200px;
    width: 30vw;
    background-color: #f5f5f5;
    margin: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* top: 0; left: 0; bottom: 0; right: 0; */
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 20px 20px;
    box-shadow: 0px 0px 1px 100vmax rgba(0,0,0,0.8);
    z-index: 3;
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

export const Text = styled.div`
    font-size: ${props=> props.size};
`

export const CollectionName = styled.input`
    height: 40px;
    font-size: 20px;
    margin: 10px 0 20px 0;
`

export const DeleteButton = styled.button`
    width: 120px;
    height: 50px;
    font-size: 20px;
    background-color: #e04343;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
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