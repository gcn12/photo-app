import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    overflow: none;
    transition: opacity 350ms ease-in-out;
    margin-bottom: 12px;
    width: 100%;
    object-fit: cover;
`
 
 export const Card = styled.div`
    max-width: 400px;
    width: 100%;
    margin-bottom: 32px;
`

const fadeIn = keyframes`
    from { opacity: 0; }
        to { opacity: 1; }
    }
    from { opacity: 0; }
        to { opacity: 1; }
    }
`;

export const Description = styled.div`
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    color: #4D4D4D;
    max-width: 400px;
`

export const Location = styled.div`
    cursor: pointer;
    font-size: 14px;
    margin-bottom: 4px;
    border-radius: 1px;
    padding: 2px 7px;
    color: #f2f2f2;
    background-color: #242424;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
`

export const Category = styled.div`
    text-transform: capitalize;
    margin-left: 8px;
    margin-bottom: 4px;
    font-size: 14px;
    border-radius: 1px;
    border: 1px solid black;
    padding: 2px 7px;
    color: black;
`

export const Name = styled.div`
    cursor: pointer;
    font-size: 16px;
    margin-top: 4px;
`

export const Title = styled.div`
    cursor: pointer;
    font-size: 30px;
    font-weight: 500;
    text-decoration: none;
    line-height: 36px;
    color: #242424;
    &:hover{
        color: #4a4a4a;
    }
`

export const LocationNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const BookmarkLocationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Ellipsis = styled.div`
    font-weight: 800;
    font-size: 20px;
`

export const ImageLinkContainer = styled.div`
    display: ${props=>props.display};
    opacity: ${props=>props.opacity};
`

export const Image = styled.img`
    cursor: pointer;
    margin-bottom: 12px;
    object-fit: cover;
    width: 100%;
    max-width: 450px;
    height: 10vw;
    min-height: 250px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .3);
    transition: box-shadow 300ms ease-in-out, opacity 400ms ease-in-out;
    &:hover {
        box-shadow: 0 7px 7px 0 rgba(0, 0, 0, .5);
    }
    animation: ${fadeIn} 1s;
`
export const PlaceholderImage = styled.div`
    
    cursor: pointer;
    margin-bottom: 12px;
    width: 100%;
    max-width: 450px;
    max-height: 300px;
    height: 10vw;
    min-height: 250px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .3);
    transition: box-shadow 300ms ease-in-out;
    &:hover {
        box-shadow: 0 7px 7px 0 rgba(0, 0, 0, .5);
    }
`