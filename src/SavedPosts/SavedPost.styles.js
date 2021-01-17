import styled from 'styled-components'

export const Container = styled.div`
    opacity: ${props=> props.opacity};
    transition: opacity 400ms ease-in-out;
    /* display: flex; */
    padding: 20px 0px 20px 0px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    /* box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1); */
`

export const ImageTextContainer = styled.div`
    width: 600px;
    display: flex;
    align-items: flex-end;
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        padding: 0 10%;
    }
`

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 600px) {
        align-items: flex-start;
    }
    @media (max-width: 600px) {
        /* flex-direction: column; */
        justify-content: center;
    }
`

export const Image = styled.img`
    cursor: pointer;
    height: 150px;
    width: 150px;
    border-radius: 3px;
    object-fit: cover;
    margin: 0 20px 0 0;
    box-shadow: 0 4px 5px 0px rgba(0, 0, 0, .3);
`

export const Title = styled.div`
    display: inline-block;
    color: #242424;
    cursor: pointer;
    font-size: 25px;
    margin: 0 0 20px 0;
    font-weight: 500;
`

export const Description = styled.div`
    font-size: 16px;
    color: #4D4D4D;
    line-height: 27px;
    /* width: 40vw; */
`

export const More = styled.div`
    font-size: 30px;
    cursor: pointer;
    font-weight: 800;
`

export const DropdownContainer = styled.div`
    width: 120px;
    height: 80px;
    position: absolute;
    background-color: white;
    font-size: 20px;
    transform: translate(-85%, 0%);
    /* left: 0;
    top: 0; */
    color: #242424;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
`

export const Options = styled.div`
    display: flex;
    flex-direction: column;
`

export const Option = styled.div`
    cursor: pointer;
    &:hover {
        background-color: #dedede;
    }
`