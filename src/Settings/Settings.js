import React from 'react'
import { signout } from '../Login/Signout'
import { SubmitButton } from '../Login/Login.styles'
import { Container } from './Settings.styles'

const Settings = () => {
    return(
        <Container>
            <SubmitButton onClick={signout}>Signout</SubmitButton>
        </Container>
    )
}

export default Settings