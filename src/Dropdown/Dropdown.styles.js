import styled from 'styled-components'

export const Container = styled.div`
    min-width: 230px;
    padding: 20px;
    background-color: #f5f5f5;
    position: absolute;
    top: 100%;
    border-radius: 5%;
    box-shadow: 10px 10px 8px rgba(10, 10, 10, .3);
`

export const Collection = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 18px;
    padding: 5px 10px;
    height: 30px;
    &:hover {
        background-color: #e8e8e8;
    }
`

export const Warning = styled.div`
    color: red;
`

export const CreateNewButton = styled.button`
    display:inline-block;
    padding: 0.35em 1.2em;
    border: 0.1em solid #242424;
    margin: 0 0.3em 0.3em 0;
    border-radius:0.12em;
    box-sizing: border-box;
    text-decoration:none;
    font-weight:300;
    text-align:center;
    transition: all 0.2s;
    background-color: transparent;
    width: 200px;
    font-size: 14px;
    transition: background-color 350ms;
    cursor: pointer;
`

export const CreateNewInput = styled.input`
    border-radius: 5%;
    border: 1px solid #242424;
    background-color: #f5f5f5;
    height: 26px;
    width: 150px;
    font-size: 14px;
    margin-right: 5px;
`

export const CreateNewSubmit = styled.button`
    height: 28px;
    width: 70px;
    cursor: pointer;
    background-color: #242424;
    color: #e8e8e8;
    border: none;
    border-radius: 2%;
`

export const RemoveAdd = styled.button`
    font-size: 18px;
    font-weight: 500;
    background-color: transparent;
    border: none;
`

export const CollectionName = styled.div`
    font-size: 20px;
    margin-right: 20px;
`

export const CollectionShimmer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    padding: 5px 10px;
    height: 30px;
`

export const CollectionNameShimmer = styled.div`
    font-size: 20px;
    margin-right: 20px;
    background-color: #e8e8e8;
    height: 25px;
    width: 140px;
`

export const RemoveAddShimmer = styled.div`
    font-size: 16px;
    background-color: #e8e8e8;
    height: 20px;
    width: 60px;
`