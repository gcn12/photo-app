import React, { useState } from 'react'
import firebase from 'firebase'
import { user } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
import { 
    TextField, 
    SubmitButton,
    Text,
    Container,
} from './Login.styles'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        if(email?.length > 0 && password?.length > 0){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userData => {
                props.dispatch(user(userData.user.uid))
                props.history.push('/photo-app/posts')
            })
            .catch(error=>console.log(error))
        }
    }

    return(
        <Container>
            <Text>Email</Text>
            <TextField onChange={e => setEmail(e.target.value)}></TextField>
            <Text>Password</Text>
            <TextField onChange={e => setPassword(e.target.value)} type='password'></TextField>
            <br></br>
            <SubmitButton onClick={submit}>Login</SubmitButton>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Login)