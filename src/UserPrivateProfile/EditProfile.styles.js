import styled from 'styled-components'

export const Container = styled.div`
    height: auto;
    max-height: 90vh;
    width: 40vw;
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
    overflow-y: scroll;
    /* box-shadow: 0px 0px 1px 100vmax rgba(0,0,0,0.8); */
    z-index: 4;
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
    width: 30vw;
`

export const BioTextarea = styled.textarea`
    height: 65px;
    font-size: 20px;
    margin: 10px 0 60px 0;
    width: 30vw;
`

export const ConfirmButton = styled.button`
    width: auto;
    height: auto;
    font-size: 20px;
    padding: 5px 20px;
    background-color: #242424;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
    white-space: nowrap;
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

export const ProfileImage = styled.img`
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 20px;
`

export const EditButton = styled.label`
    color: #242424;
    height: 40px;
    width: 180px;
    font-size: 17px;
    background-color: transparent;
    /* border-radius: 5px; */
    /* border: 1px solid black; */
    transition: transform 100ms ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.02)
    }
`

export const CenterProgress = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -85%);
    z-index: 5
`