import firebase from 'firebase'

const signout = () => {
    firebase.auth().signOut()
    .catch(error=>console.log(error))
}

export default signout