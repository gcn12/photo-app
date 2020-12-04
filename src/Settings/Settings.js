import React from 'react'
import { signout } from '../Login/Signout'
import { SubmitButton } from '../Login/Login.styles'
import { Container } from './Settings.styles'

const Settings = (props) => {

    const signoutWithRoute = () => {
        props.history.push('/photo-app/posts')
        signout(props.setUser)
    }
    
    return(
        <Container>
            <SubmitButton onClick={signoutWithRoute}>Signout</SubmitButton>
        </Container>
    )
}

export default Settings