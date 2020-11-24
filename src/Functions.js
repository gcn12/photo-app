import { db } from "./Firebase"
import firebase from 'firebase'


export const incrementViewCount = (docID) => {
    const increment = firebase.firestore.FieldValue.increment(1)
    db.collection('preview-posts').doc(docID)
    .update({
        views: increment
    })
    .then(()=>null)
}