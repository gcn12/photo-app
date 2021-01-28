import styled from 'styled-components'

export const Container = styled.div`
    opacity: ${props=>props.opacity};
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${props=>props.width};
    height: ${props=>props.height};
    transition: opacity 350ms ease-in-out, width 400ms ease-in-out, height 400ms ease-in-out;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    cursor: default;
    z-index: 4;
    border-radius: 5px;
    overflow-y: scroll;
`

export const HideContent = styled.div`
    display: ${props=>props.display};
    visibility: ${props=>props.visibility};
    /* overflow-y: scroll; */
    -webkit-overflow-scrolling: touch;
`

export const CenterUploadProgress = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ImagesContainer = styled.div`
    display: flex;
    align-items: center;
`

export const MainImage = styled.img`
    width: 40vw;
    height: auto;
    background-color: blue;
    margin-bottom: 15px;
`

export const Title = styled.input`
    font-family: ${props=> props.font};
    font-size: 30px;
    margin-bottom: 20px;
    width: 35vw;
    @media (max-width: 690px) {
        width: 55vw;

    }
`

export const Paragraphs = styled.textarea`
    font-family: ${props=> props.font};
    font-size: 20px;
    height: 300px;
    width: 60vw;
    margin-bottom: 30px;
`

export const EditCaption = styled.input`
    font-family: ${props=> props.font};
    font-size: 20px;
    height: 30px;
    width: 40vw;
    margin-bottom: 40px;
`

export const EditHeader = styled.input`
    font-family: ${props=> props.font};
    font-size: 20px;
    height: 30px;
    width: 60vw;
    margin-bottom: 15px;
`

export const Images = styled.img`
    width: 200px;
    height: auto;
`

export const Submit = styled.button`
    width: 130px;
    height: 50px;
    font-size: 20px;
    background-color: #242424;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
`

export const Cancel = styled.button`
    height: 50px;
    width: 100px;
    font-size: 16px;
    background-color: #cfcfcf;
    color: black;
    border: none;
    border-radius: 2px;
    cursor: pointer;
`

export const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 90vw;
    margin: 0 0 60px 0;
`

export const FontOption = styled.option`
    font-family: ${props=> props.font};
`

export const FontSelect = styled.select`
    font-family: ${props=>props.font};
    font-size: 20px;
    padding: 10px;
    margin-bottom: 20px;
`

export const X = styled.div`
    /* position: absolute; */
    font-size: 72px;
    cursor: pointer;
    margin-right: 30px;
    display: ${props=>props.display};
    visibility: ${props=>props.visibility};
`

export const Masonry = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const ImageNew = styled.img`
    height: 200px;
    width: auto;
    padding: 0 10px;
`

export const BodyButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const RemoveLastElement = styled.button`
    color: white;
    background-color: #ff6257;
    border: none;
    width: 20vw;
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;
    margin: 20px 0;
`

export const NewItemButton = styled.button`
    color: white;
    background-color: #141414;
    border: none;
    width: ${props=> props.long ? '60vw ': '40vw'};
    height: 50px;
    cursor: pointer;
    transition: background-color 400ms;

    &:hover {
        background-color: #212121;
    }
`

export const UploadLabel = styled.label`
    margin: 5px 0 10px 0;
    border: 1px solid black;
    padding: 5px;
    color: #242424;
    cursor: pointer;
    font-size: 18px;
`

export const Label = styled.label`
    font-size: 30px;
    color: #242424;
`

export const PhotoAndButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`

export const SelectInput = styled.select`
    width: 60vw;
    height: 40px;
    font-size: 20px;
    font-family: ${props=>props.font};
`

export const PostDescriptionInput = styled.input`
    width: 60vw;
    height: 40px;
    font-size: 20px;
    font-family: ${props=>props.font};
`

export const TooManyImages = styled.div`
    color: #fa4670;
    margin-top: 10px;
`