import { db } from "./Firebase"
// import firebase from 'firebase'


// export const incrementViewCount = (docID) => {
//     const increment = firebase.firestore.FieldValue.increment(1)
//     db.collection('preview-posts').doc(docID)
//     .update({
//         views: increment
//     })
//     .then(()=>null)
// }

export const incrementViewCount = (docID) => {
    db.collection('pending-views')
    .add({
        id: docID
    })
    .then(()=>null)
}

export const incrementHeartCount = (docID) => {
    db.collection('pending-increment-hearts')
    .add({
        id: docID
    })
    .then(()=>null)
}

export const decrementHeartCount = (docID) => {
    db.collection('pending-decrement-hearts')
    .add({
        id: docID
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