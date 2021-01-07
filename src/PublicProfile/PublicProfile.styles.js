import styled from 'styled-components'

export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow:  0 5px 5px 0px  rgba(0, 0, 0, .2);
    @media(max-width: 700px) {
        margin-top: 10px;
    }
`

export const Container = styled.div`
    width: 250px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px 0 20px;
    border-radius: 3px;
    margin: 20px 30px 0px 30px;
`

export const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* grid-template-columns: repeat(3, auto); */
    grid-column-gap: 30px;
    margin: 0 50px 0 360px;
    justify-items: end;
    justify-content: end;

    @media(max-width: 700px) {
        margin: 100px 50px 0 50px;
    }
`

export const UserContainer = styled.div`
    margin-top: 30px;
    /* width: 250px; */
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;

    @media(max-width: 700px) {
        position: initial;
    }
`

export const Username = styled.div`
    font-weight: 600;
    font-size: 25px;
    margin-bottom: 10px;

    white-space: pre-wrap;    
    white-space: -moz-pre-wrap;    
    white-space: -pre-wrap;       
    white-space: -o-pre-wrap;     
    word-wrap: break-word; 
`

export const Name = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 30px;
    display: inline-block;
    white-space: nowrap;
    /* white-space: pre-wrap;    
    white-space: -moz-pre-wrap;    
    white-space: -pre-wrap;       
    white-space: -o-pre-wrap;     
    word-wrap: break-word;  */
`


export const Bio = styled.div`
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    vertical-align: middle; 
    text-align: center;
`