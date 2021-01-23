import React from 'react'
import algoliasearch from 'algoliasearch'
// import faker from 'faker'
import { db } from './Firebase'
// import './App.css'
const APP_ID = ''
const ADMIN_KEY = ''
const client = algoliasearch(APP_ID, ADMIN_KEY)

const GetPhotos = () => {

    const addData = () => {

        // let limit = 40
        // for (let i = 0; i < limit; i++) {
        //     let bio = faker.lorem.sentences()
        //     bio = bio.slice(0, 100)
        //     bio = bio.trim()
        //     if(bio[bio.length - 1] !== '.') {
        //         bio += '.'
        //     }
        //     const firstName = faker.name.firstName()
        //     const lastName = faker.name.lastName()
        //     const author = `${firstName} ${lastName}`
        //     const username = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}`
        //     const dataToSend = {
        //         author,
        //         username,
        //         bio,
        //         profileImage: '',
        //     }
        //     const objectID = faker.random.uuid()
        //     console.log(dataToSend, objectID)
        //     // index.saveObject({ ...dataToSend, objectID })
        // }


        const index = client.initIndex('users')
        // index.search('', {hitsPerPage: 50}).then(({hits}) => {
        //     hits.forEach(item=> {
        //         let { objectID, author, _highlightResult, ...items } = item
        //         // console.log(author, username)
        //         index.saveObject({
        //             objectID,
        //             name: author,
        //             ...items
        //         })
        //         .then(()=>console.log('updated'))
        //     })
        // })

        db.collection('users')
        .get()
        .then(items=> {
            items.forEach(item=> {
                index.partialUpdateObject({
                    bio: item.data().bio,
                    objectID: item.data().id,
                },
                {
                    createIfNotExists: true
                })
                .then(()=> console.log('uploaded'))
                .catch(err=>console.log(err))
            })
        })
    }
    
    return(
        <div style={{marginTop: '150px'}}>
            <button onClick={addData}>Add profiles</button>
        </div>
    )
}

export default GetPhotos