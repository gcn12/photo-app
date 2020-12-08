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

export const incrementHeartCount = (docID) => {
    const increment = firebase.firestore.FieldValue.increment(1)
    db.collection('preview-posts').doc(docID)
    .update({
        hearts: increment
    })
    .then(()=>null)
}

export const decrementHeartCount = (docID) => {
    const increment = firebase.firestore.FieldValue.increment(-1)
    db.collection('preview-posts').doc(docID)
    .update({
        hearts: increment
    })
    .then(()=>null)
}

export const calculateLikeRatio = (docID) => {
    const collectionRef = db.collection('preview-posts').doc(docID)
    collectionRef.get()
    .then(info=> {
        const data = info.data()
        let ratio
        if(data.hearts > 0 && data.views > 0) {
            ratio = data.hearts / data.views
        }else{
            ratio = 0
        }
        collectionRef.update({
            ratio
        })
    })
}