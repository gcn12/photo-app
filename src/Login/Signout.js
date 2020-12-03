import firebase from 'firebase'

export const signout = (setUser) => {
    firebase.auth().signOut()
    .then(()=>setUser())
    .catch(error=>console.log(error))
}

export default signout