import styled from 'styled-components'

export const Container = styled.div`
    min-height: 300px;
    z-index: 21;
    width: 35vw;
    background-color: #f5f5f5;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 35px;

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

export const CollectionsContainer = styled.div`
    margin: 0 40px;
    padding: 0 10px;
    min-height: 170px;
    max-height: 225px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    @media (max-width: 500px) {
        padding: 0 10px;
        margin: 0 0px;
    }
`

export const X = styled.div`
    position: absolute;
    font-size: ${props=> props.size};
    right: 5%;
    top: 0;
`

export const RenameButton = styled.button`
    width: 250px;
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
    justify-content: center;
`

export const Collection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    height: 30px;
`

export const Warning = styled.div`
    margin-top: 20px;
    color: red;
`

export const CreateNewButton = styled.button`
    white-space: nowrap;
    width: auto;
    height: auto;
    font-size: 20px;
    background-color: transparent;
    padding: 8px 15px;
    border-radius: 2px;
    border: 1px solid black;
    cursor: pointer;
`

export const CreateNewInput = styled.input`
    border-radius: 5%;
    border: 1px solid #242424;
    background-color: #f5f5f5;
    height: 33px;
    width: 160px;
    font-size: 18px;
    margin-right: 5px;
`

export const CreateNewSubmit = styled.button`
    height: 35px;
    width: 110px;
    font-size: 16px;
    cursor: pointer;
    background-color: #242424;
    color: #e8e8e8;
    border: none;
    border-radius: 2%;
`

export const RemoveAdd = styled.div`
    font-size: 16px;
    &:hover {
        border-bottom: .5px solid black;
    }
`

export const CollectionName = styled.div`
    font-size: 20px;
    margin-right: 20px;
`

export const CreateNewContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`