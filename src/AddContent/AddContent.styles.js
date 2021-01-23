import styled from 'styled-components'

export const UploadProgressContainer = styled.div`
    visibility: ${props=> props.styles.visibility};
    opacity: ${props=> props.styles.opacity};
    display: ${props=>props.styles.display};
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 50%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
`

export const ButtonContainer = styled.div`
    background-color: #dedede;
    border-top: 1px solid #b3b3b3;
    position: fixed;
    padding: 15px;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

export const NextButton = styled.button`
    /* position: absolute; */
    /* right: 150px; */
    justify-content: flex-end;
    cursor: ${props=> props.proceed ? 'pointer' : 'default'};
    color: white;
    /* background-color: #141414; */
    background-color: ${props=> props.proceed ? '#141414' : '#6e6e6e'};
    border: none;
    /* position: absolute; */
    width: ${props => props.width};
    /* width: 120px; */
    height: 50px;
    /* cursor: pointer; */
    transition: background-color 400ms;

    /* &:hover {
        background-color: #212121;
    } */
`

export const Container = styled.div`
    /* height: 110vh; */
    /* visibility: ${props=> props.visibility ? 'null' : 'hidden'};
    display: ${props=> props.visibility ? 'null' : 'none'}; */
    /* left: 20%;
    top: 40%;
    position: absolute;  */
    display: flex;
    flex-wrap: wrap;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
`

export const BodyContainer = styled.div`
    /* height: 110vh; */
    /* position: relative;  */
    margin-top: 56px;
    opacity: ${props=> props?.styles?.opacity};
    visibility: ${props=> props?.styles?.visibility}; 
    /* display: ${props=> props?.styles?.display}; */
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 45%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
    display: ${props=>props.styles.display};
    max-height: 90vh;
    overflow-y: scroll;
`

export const CategoryLocationContainer = styled.div`
    /* height: 110vh; */
    /* position: relative;  */
    margin-top: 48px;
    opacity: ${props=> props?.styles?.opacity};
    visibility: ${props=> props?.styles?.visibility}; 
    /* display: ${props=> props?.styles?.display}; */
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 35%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
    display: ${props=>props.styles.display};
    max-height: 90vh;
    overflow-y: scroll;
`

export const FileUpload = styled.label`
    margin: 10px 0 0 0;
    border: 1px solid black;
    padding: 5px;
    color: black;
    cursor: pointer;
    font-size: 20px;
`

export const PreviewContainer = styled.div`

`

export const PreviewImage = styled.img`
    /* height: 450px; */
    height: 45vh;
    width: auto;
    opacity: ${props => props.opacity};
    transition: 500ms ease-in-out;
`

export const SubmitButton = styled.button`
    cursor: pointer;
    color: white;
    font-size: 18px;
    background-color: #141414;
    border: none;
    width: 140px;
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;
    border-radius: 3%;

    &:hover {
        background-color: #212121;
    }
`

export const NewItemButton = styled.button`
    color: white;
    background-color: #141414;
    border: none;
    width: ${props=> props.long ? '30vw ': '24vw'};
    border-left: ${props=> props.border};
    /* width: 40vw; */
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;

    &:hover {
        background-color: #212121;
    }
`

export const RemoveLastElement = styled.button`
    color: white;
    background-color: #ff6257;
    border: none;
    width: 12vw;
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;
    margin: 20px 0;

    &:hover {
        /* background-color: #212121; */
    }
`

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const DescriptionInput = styled.textarea`
    width: 60vw;
    height: 150px;
    font-size: 20px;
    /* margin-bottom: 20px; */
`

export const SelectInput = styled.select`
    /* -webkit-appearance: menulist-button; */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%238C98F2'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
    background-size: 12px;
    background-position: calc(100% - 20px) center;
    background-repeat: no-repeat;
    background-color: #fafafa;
    width: 60vw;
    height: 40px;
    font-size: 20px;
    color: #242424;
    padding-left: 5px;
`

export const Label = styled.label`
    font-size: 30px;
    color: #242424;
`

export const BodyButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 70px 0;
`

export const PostDescriptionContainer = styled.div`
    visibility: ${props=> props?.styles?.visibility};
    opacity: ${props=> props?.styles?.opacity};
    display: ${props=>props.styles.display==='initial' ? 'flex' : 'none'};
    /* display: flex; */
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 45%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
    width: 60vw;
`

export const PostDescriptionInput = styled.textarea`
    width: 600px;
    height: 150px;
    font-size: 20px;
`

export const ButtonIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`