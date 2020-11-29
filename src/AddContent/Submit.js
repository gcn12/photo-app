// import React, { useState } from 'react'
import { db } from '../Firebase'
import firebase from 'firebase'

const submit = (imagesEmptyArrays, unsortedImages, imageMap, user, imageSizeArray) => {
    const title = document.getElementById('add-content-title').value
    const location = document.getElementById('autocomplete').value
    const splitLocation = location.split(',')
    const country = splitLocation[splitLocation.length-1].trim()
    const city = splitLocation[0]
    const category = document.getElementById('category').value
    const timestamp = Date.now()
    const descriptionArray = []
    const content = document.getElementsByClassName('content-paragraph')

    for (let i=0; i<content.length; i++) {
        descriptionArray.push(String(content[i].value))
    }

    let mainImage = ''

    let imagesEmptyArraysCopy = imagesEmptyArrays
    let imageMapCopy = imageMap

    for(let i=0; i<unsortedImages.length; i++) {
        if(i === 0) {
            mainImage = unsortedImages[i]
        }else{
            if(i<imageMapCopy.length+1) {
                imagesEmptyArraysCopy[imageMapCopy[i-1]].push(unsortedImages[i])
            }
        }
    }

    const urlObject = {}
    
    for (let i=0; i<imagesEmptyArraysCopy.length; i++) {
        urlObject[i] = imagesEmptyArraysCopy[i]
    }

    db.collection('continents-countries').doc('map').collection(country)
    .where(country, 'in', ['North America', 'South America', 'Asia', 'Europe', 'Oceania', 'Africa'])
    .get()
    .then(data => {
        const continent = data.docs[0].data()[country]
        db.collection('posts').add({
            photoBodyMap: imageSizeArray,
            content: descriptionArray,
            images: urlObject,
            title,
            timestamp,
            image: mainImage,
            category,
            city,
            country,
            continent,
            author: 'Dan Smith',
            views: 0,
        }).then(docRef => {
            db.collection('users').doc(user)
            .collection('posts').doc(docRef.id).set({
                reference: `posts/${docRef.id}`,
                timestamp,
                id: docRef.id,
                title: title,
                image: mainImage,
                views: 0,
                city,
                country,
                continent,
            }, {merge: true})
            .then(()=>{
                db.collection('posts').doc(docRef.id).set({
                    id: docRef.id,
                }, {merge: true}) 
            })
            .then(()=> {
                db.collection('preview-posts').add({
                    reference: `/posts/${docRef.id}`,
                    timestamp,
                    id: docRef.id,
                    title,
                    image: mainImage,
                    views: 0,
                    category,
                    city,
                    country,
                    continent,
                })
                .then(()=>console.log('uploaded'))
            })              
        })
    })
}

export const fileUpload = (user, imageSizeArray) => {
    let photoIndexes = []
    let fileArray = []
    const photoUrlArraySorted = []
    // const urlArray = []
    const photoFiles = document.getElementsByClassName('photo-input')
    for (let i = 0; i < photoFiles.length; i++) {
        fileArray = [...fileArray, ...photoFiles[i].files]
        if(photoFiles[i].files.length > 1) {
            photoUrlArraySorted.push([])
            for(let j = 0; j<photoFiles[i].files.length; j++) {
                photoIndexes.push(i-1)
            }
        }else{
            if(i!==0) {
                photoIndexes.push(i-1)
                photoUrlArraySorted.push([])
            }
        }
    }
    const urlArray = []
    let index = []
    let indexNum = 0
    const upload = () => {
        console.log(indexNum)
        console.log('working')
        if(indexNum<fileArray.length) {
            const file = fileArray[indexNum]
            const metadata = {
                contentType: file.type
            }
            firebase.storage().ref()
            .child(file.name)
            .put(file, metadata)
            .then(snapshot => {
                snapshot.ref.getDownloadURL()
                .then(downloadURL => {
                    urlArray.push(downloadURL)  
                    indexNum++ 
                    index.push(downloadURL) 
                }).then((downloadURL)=> {
                    if(urlArray.length===fileArray.length) {
                        console.log(photoUrlArraySorted)
                        submit(photoUrlArraySorted, [...urlArray, downloadURL], photoIndexes, user, imageSizeArray)
                    }else{
                        upload()
                    }
                })
                .catch(error => console.log(error))
            });
        }else{
            return
        }
    }
    upload()
}



// export const fileUpload = (user, imageSizeArray) => {
//     let photoIndexes = []
//     let fileArray = []
//     const photoUrlArraySorted = []
//     // const urlArray = []
//     const photoFiles = document.getElementsByClassName('photo-input')
//     for (let i = 0; i < photoFiles.length; i++) {
//         fileArray = [...fileArray, ...photoFiles[i].files]
//         if(photoFiles[i].files.length > 1) {
//             photoUrlArraySorted.push([])
//             for(let j = 0; j<photoFiles[i].files.length; j++) {
//                 photoIndexes.push(i-1)
//             }
//         }else{
//             if(i!==0) {
//                 photoIndexes.push(i-1)
//                 photoUrlArraySorted.push([])
//             }
//         }
//     }
//     const urlArray = []
//     let index = []
//     let indexNum = 0
//     for (let i = 0; i<fileArray.length; i++) {
        
//         const file = fileArray[i]
//         const metadata = {
//             contentType: file.type
//         }
//         firebase.storage().ref()
//         .child(file.name)
//         .put(file, metadata)
//         .then(snapshot => {
//             snapshot.ref.getDownloadURL()
//             .then(downloadURL => {
//                 urlArray.push(downloadURL)  
//                 indexNum++ 
//                 index.push(downloadURL) 
//             }).then((downloadURL)=> {
//                 if(urlArray.length===fileArray.length) {
//                     console.log(photoUrlArraySorted)
//                     submit(photoUrlArraySorted, [...urlArray, downloadURL], photoIndexes, user, imageSizeArray)
//                 }
//             })
//             .catch(error => console.log(error))
//         });
//     }
// }