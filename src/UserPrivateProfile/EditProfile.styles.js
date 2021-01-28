import styled from 'styled-components'

export const Container = styled.div`
    height: 90vh;
    min-height: 400px;
    width: 40vw;
    min-width: 500px;
    background-color: #f5f5f5;
    margin: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 10px 20px 20px 20px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 21;
    @media (max-width: 1100px) {
        width: 40vw;
    }
    @media (max-width: 800px) {
        width: 60vw;
        min-width: 0px;
        /* height: 180px; */
    }
    @media (max-width: 750px) {
        width: 80vw;
        min-width: 0px;
        /* height: 180px; */
    }
`

export const CollectionName = styled.input`
    height: 40px;
    font-size: 20px;
    margin: 10px 0 20px 0;
    width: 30vw;
    min-width: 400px;
    @media (max-width: 750px) {
        width: 60vw;
        min-width: 0px;
    }
`

export const BioTextarea = styled.textarea`
    height: 65px;
    font-size: 20px;
    margin: 10px 0 60px 0;
    width: 30vw;
    min-width: 400px;
    @media (max-width: 750px) {
        width: 60vw;
        min-width: 0px;
    }
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
    font-size: 16px;
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
    /* width: 180px; */
    font-size: 18px;
    background-color: transparent;
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
    z-index: 22;
`