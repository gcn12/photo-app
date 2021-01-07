import styled from 'styled-components'

export const Container = styled.div`
    min-height: 255px;
    z-index: 2;
    width: 35vw;
    background-color: #f5f5f5;
    margin: auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 35px;
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

export const CollectionsContainer = styled.div`
    padding: 0 60px;
    min-height: 150px;
    max-height: 200px;
    overflow-y: scroll;
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








// export const Container = styled.div`
//     min-width: 230px;
//     padding: 20px;
//     background-color: #f5f5f5;
//     position: absolute;
//     top: 100%;
//     border-radius: 5%;
//     box-shadow: 10px 10px 8px rgba(10, 10, 10, .3);
// `

export const Collection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    height: 30px;
    &:hover {
        /* background-color: #dedede; */
        /* border-bottom: .5px solid black; */
    }
`

export const Warning = styled.div`
    margin-top: 20px;
    color: red;
`

// export const CreateNewButton = styled.button`
//     display:inline-block;
//     padding: 0.35em 1.2em;
//     border: 0.1em solid #242424;
//     margin: 0 0.3em 0.3em 0;
//     border-radius:0.12em;
//     box-sizing: border-box;
//     text-decoration:none;
//     font-weight:300;
//     text-align:center;
//     transition: all 0.2s;
//     background-color: transparent;
//     width: 200px;
//     font-size: 13px;
//     transition: background-color 350ms;
//     cursor: pointer;
// `

export const CreateNewButton = styled.button`
    font-size: 20px;
    background-color: transparent;
    padding: 5px 20px;
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
    font-size: 15px;
    cursor: pointer;
    background-color: #242424;
    color: #e8e8e8;
    border: none;
    border-radius: 2%;
`

export const RemoveAdd = styled.div`
    font-size: 15px;
    &:hover {
        border-bottom: .5px solid black;
    }
    /* color: white; */
`

export const CollectionName = styled.div`
    font-size: 20px;
    margin-right: 20px;
    /* color: white; */
`

export const CreateNewContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`