import React from 'react'
import { SubmitButton } from '../Login/Login.styles'
import { Container } from './Settings.styles'
import { user } from '../Redux/Actions/appActions'
import firebase from 'firebase'
import { connect } from 'react-redux'

const Settings = (props) => {

    const signoutWithRoute = () => {
        props.history.push('/photo-app/posts')
        firebase.auth().signOut()
        .then(()=>props.dispatch(user('')))
        .catch(error=>console.log(error))
    }
    
    return(
        <Container>
            <SubmitButton onClick={signoutWithRoute}>Signout</SubmitButton>
        </Container>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Settings)