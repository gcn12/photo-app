import styled from 'styled-components'

export const Container = styled.div`
    opacity: ${props=>props.opacity};
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* width: 90vw;
    height: 100vh; */
    width: ${props=>props.width};
    height: ${props=>props.height};
    transition: opacity 350ms ease-in-out, width 400ms ease-in-out, height 400ms ease-in-out;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    cursor: default;
    /* align-items: center; */
    z-index: 2;
    box-shadow: 0px 0px 1px 100vmax rgba(0,0,0,0.8);
    border-radius: 5px;
`

export const HideContent = styled.div`
    display: ${props=>props.display};
    visibility: ${props=>props.visibility};
`

export const CenterUploadProgress = styled.div`
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    font-size: 15px;
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
    margin: 40px 0;
`

export const FontOption = styled.option`
    font-family: ${props=> props.font};
    /* font-size: 20px; */
`

export const FontSelect = styled.select`
    font-size: 20px;
    padding: 10px;
    margin-bottom: 20px;
`

export const X = styled.div`
    position: absolute;
    font-size: 70px;
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
    line-height: 150px;
    background: #EC985A;
    color: white;
    margin: 0 1rem 1rem 0;
    text-align: center;
    font-family: system-ui;
    font-weight: 900;
    font-size: 2rem;
    flex: 1 0 auto;
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

    &:hover {
        /* background-color: #212121; */
    }
`

export const NewItemButton = styled.button`
    color: white;
    background-color: #141414;
    border: none;
    width: ${props=> props.long ? '60vw ': '40vw'};
    /* width: 40vw; */
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
    color: black;
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
`

export const PostDescriptionInput = styled.textarea`
    width: 60vw;
    height: 150px;
    font-size: 20px;
    font-family: ${props=>props.font};
`

export const TooManyImages = styled.div`
    color: #fa4670;
    margin-top: 10px;
`