import React, { useState } from 'react'
import firebase from 'firebase'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import { showSignup } from '../Redux/Actions/appActions'
import { enableBodyScroll } from 'body-scroll-lock'
import { 
    TextField, 
    SubmitButton,
    Text,
    Container,
    FormContainer,
} from '../Login/Login.styles'

const Signup = (props) => {

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const submit = () => {
        if(email?.length>0 && password?.length>0 && username?.length > 0) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user=> {
                console.log(user.user.uid)
                db.collection('users').doc(user.user.uid).set({
                    id: user.user.uid,
                    username,
                    name,
                    profileImage: null,
                    bio: null,
                }, {merge: true})
                .then(()=> {
                    console.log('sign up complete')
                    // props.history.push('/photo-app/posts/popular/all')
                    props.setUser(user.user.id)
                    props.dispatch(showSignup(false))
                    enableBodyScroll(document.body)
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>{
                console.log(err)
                setIsError(true)
                if(err.message==='The email address is badly formatted.') {
                    setErrorMessage('Invalid email')
                }
                if(err.message==='Password should be at least 6 characters') {
                    setErrorMessage('Password must be at least six characters long')
                }
            })
        }
    }

    const closeSignup = () => {
        props.dispatch(showSignup(false))
        enableBodyScroll(document.body)
    }

    return(
        <Container>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <button onClick={closeSignup} style={{fontSize: '48px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}>&times;</button>
            </div>
            <FormContainer>
                <Text hmtlFor='signup-name'>Name</Text>
                <TextField autoComplete='off' name='name' id='signup-name' onChange={e=> setName(e.target.value)}></TextField>
                <Text hmtlFor='signup-email'>Email</Text>
                <TextField autoComplete='off' name='email' id='signup-email' onChange={e => setEmail(e.target.value)}></TextField>
                <Text hmtlFor='signup-username'>Username</Text>
                <TextField autoComplete='off' name='username' id='signup-username' onChange={e=> setUsername(e.target.value)}></TextField>
                <Text hmtlFor='signup-password'>Password</Text>
                <TextField autoComplete='off' name='password' id='signup-password' onChange={e=> setPassword(e.target.value)} type='password'></TextField>
                {isError ? 
                <div style={{color:'#fa4670'}}>{errorMessage}</div>
                :
                null
                }
                <br></br>
                <SubmitButton onClick={submit}>Signup</SubmitButton>
            </FormContainer>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Signup)