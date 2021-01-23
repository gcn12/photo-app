import styled from 'styled-components'

export const Title = styled.div`
    font-size: 24px;
`

export const Photo = styled.img`
    object-fit: cover;
    height: 180px;
    width: 180px;
    border-radius: 50%;
    cursor: pointer;
`

export const GearIcon = styled.img`
    position: absolute;
    left: 300;
    top: 100;
    transform: translate(270%, 10%);
    z-index: 0;
    visibility: ${props=> props.visibility};
    opacity: ${props=> props.opacity};
    transition: opacity 500ms ease-in-out;
    transition-delay: 150ms;
    @media (max-width: 690px) {
        visibility: visible;
        display: initial;
        opacity: 1;
    }
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    grid-gap: 20px;
    justify-items: center;
    align-items: start;
`

export const PostContainer = styled.div`
    height: 100%;
    width: 100%;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: ${props=> props.opacity};
    transition: opacity 500ms ease-in-out;
`

export const PostTitle = styled.div`
    font-size: 20px;
    justify-self: center;
    cursor: pointer;
`

export const TitleEllipsisContainer = styled.div`
    display: flex;
    align-items: center;
`

export const Ellipsis = styled.div`
    margin-left: 5px;
    font-size: 20px;
    font-weight: 800;
    cursor: pointer;
`