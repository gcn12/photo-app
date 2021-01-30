import React, { useState } from 'react'
import firebase from 'firebase'
import { user } from '../Redux/Actions/appActions'
import { showLogin } from '../Redux/Actions/appActions'
import { enableBodyScroll } from 'body-scroll-lock'
import { connect } from 'react-redux'
import { 
    TextField, 
    SubmitButton,
    Text,
    Container,
    FormContainer,
} from './Login.styles'

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCredentialsCorrect, setIsCredentialsCorrect] = useState(true)

    const submit = () => {
        if(email?.length > 0 && password?.length > 0){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(userData => {
                if(userData.user) {
                    props.dispatch(user(userData.user.uid))
                    // props.history.push('/photo-app/posts')
                    props.dispatch(showLogin(false))
                    enableBodyScroll(document.body)
                    setIsCredentialsCorrect(true)
                }
            })
            .catch(error=>{
                console.log(error)
                setIsCredentialsCorrect(false)
            })
        }
    }

    const closeLogin = () => {
        props.dispatch(showLogin(false))
        enableBodyScroll(document.body)
    }

    return(
        <Container>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button onClick={closeLogin} style={{fontSize: '48px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>&times;</button>
            </div>
            <FormContainer>
                <Text hmtlFor='login-email'>Email</Text>
                <TextField autoComplete='off' onChange={e => setEmail(e.target.value)} name='email' id='login-email'></TextField>
                <Text hmtlFor='login-password'>Password</Text>
                <TextField autoComplete='off' onChange={e => setPassword(e.target.value)} name='passoword' id='login-password' type='password'></TextField>
                {isCredentialsCorrect ? 
                null
                :
                <div style={{color: '#fa4670'}}>Username or password is incorrect</div>
                }
                <br></br>
                <SubmitButton onClick={submit}>Login</SubmitButton>
            </FormContainer>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Login)