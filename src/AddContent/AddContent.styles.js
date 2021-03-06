import styled, {  } from 'styled-components'

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

export const TopButtonContainer = styled.div`
    background-color: #f2f2f2;
    position: absolute;
    top: 0px;
    width: 100%;
    display: flex;
    /* justify-content: flex-start; */
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
    justify-content: flex-end;
    cursor: ${props=> props.proceed ? 'pointer' : 'default'};
    color: white;
    background-color: ${props=> props.proceed ? '#141414' : '#6e6e6e'};
    border: none;
    width: ${props => props.width};
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 400ms;
`

export const CancelButton = styled.div`
    align-items: center;
    cursor: ${props=> props.proceed ? 'pointer' : 'default'};
    color: white;
    background-color: #fa4670;
    border: none;
    width: ${props => props.width};
    height: 50px;
    font-size: 16px;
    font-weight: 500;
    transition: background-color 400ms;
    position: relative;
`

export const CancelText = styled.div`
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
`

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
`

export const BodyContainer2 = styled.div`
    visibility: ${props=> props.visibility}; 
    display: ${props=> props.display};
`

export const EmptyBodyContainer = styled.div`
    opacity: ${props=> props?.styles?.opacity};
    visibility: ${props=> props?.styles?.visibility}; 
    display: ${props=> props?.styles?.display};
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 45%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
    display: ${props=>props?.styles?.display};
`

export const BodyContainer = styled.div`
    margin-top: 80px;
    opacity: ${props=> props?.styles?.opacity};
    visibility: ${props=> props?.styles?.visibility}; 
    display: ${props=> props?.styles?.display};
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
`

export const CategoryLocationContainer = styled.div`
    margin-top: 48px;
    opacity: ${props=> props?.styles?.opacity};
    visibility: ${props=> props?.styles?.visibility}; 
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 35%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
    display: ${props=>props.styles.display === 'none' ? 'none' : 'flex'};
    align-items: center;
    flex-direction: column;
`

export const FileUpload = styled.label`
    margin: 10px 0 0 0;
    border: 1px solid black;
    padding: 5px;
    color: black;
    cursor: pointer;
    font-size: 20px;
`

export const PreviewImage = styled.img`
    height: 45vh;
    width: auto;
    opacity: ${props => props.opacity};
    transition: 500ms ease-in-out;
`

export const SubmitButton = styled.button`
    cursor: pointer;
    color: white;
    font-size: 16px;
    background-color: #141414;
    border: none;
    width: 120px;
    height: 45px;
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
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;

    &:hover {
        background-color: #212121;
    }
    @media(max-width: 720px) {
        width: ${props=> props.long ? '40vw ': '32vw'};
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

    @media(max-width: 720px) {
        width: 16vw;
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
    @media(max-width: 720px) {
        width: 80vw;
    } 
`

export const SelectInput = styled.select`
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
    @media(max-width: 900px) {
        font-size: 24px;
    }
    @media(max-width: 720px) {
        font-size: 20px;
    }
`

export const DescriptionLabel = styled.label`
    font-size: 30px;
    color: #242424;
    @media(max-width: 900px) {
        font-size: 24px;
    }
    @media(max-width: 730px) {
        font-size: 20px;
    }
`

export const BodyButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 20px 0;
`

export const PostDescriptionContainer = styled.div`
    visibility: ${props=> props?.styles?.visibility};
    opacity: ${props=> props?.styles?.opacity};
    display: ${props=>props.styles.display==='initial' ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 45%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
`

export const PostDescriptionInput = styled.input`
    width: 60vw;
    height: 40px;
    font-size: 20px;
    @media(max-width: 720px) {
        width: 80vw;
    }
`

export const ButtonIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`