import styled from 'styled-components'

export const Container = styled.div`
    visibility: ${props=> props.styles.visibility};
    opacity: ${props=> props.styles.opacity};
    transition: opacity 200ms ease-in-out, left 200ms ease-in-out;
    top: 45%;
    left: ${props=>props?.styles?.left};
    position: absolute;
    transform: translate(-50%, -50%);
    display: ${props=>props.styles.display ==='initial' ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Title = styled.div`
    font-size: 36px;
`

export const Paragraph = styled.div`
    font-size: 20px;
    margin-bottom: 18px;
    font-family: ${props=> props.font};
    line-height: 40px;
    white-space: pre-wrap;
    text-justify: inter-word;
`

export const FontOption = styled.option`
    font-family: ${props=> props.font};
`

export const FontSelect = styled.select`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%238C98F2'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
    background-size: 12px;
    background-position: calc(100% - 15px) center;
    background-repeat: no-repeat;
    font-size: 20px;
    padding: 10px 30px 10px 10px;
`