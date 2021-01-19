import React from 'react'
import algoliasearch from 'algoliasearch'
import faker from 'faker'
import './App.css'
const APP_ID = ''
const ADMIN_KEY = ''
const client = algoliasearch(APP_ID, ADMIN_KEY)

const AddUsers = () => {

    const addData = () => {

        let limit = 40
        for (let i = 0; i < limit; i++) {
            let bio = faker.lorem.sentences()
            bio = bio.slice(0, 100)
            bio = bio.trim()
            if(bio[bio.length - 1] !== '.') {
                bio += '.'
            }
            const firstName = faker.name.firstName()
            const lastName = faker.name.lastName()
            const name = `${firstName} ${lastName}`
            const username = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}`
            const dataToSend = {
                name,
                username,
                bio,
                profileImage: '',
            }
            const objectID = faker.random.uuid()
            console.log(dataToSend, objectID)
            const index = client.initIndex('users')
            index.saveObject({ ...dataToSend, objectID })
        }
    }
    
    return(
        <div style={{marginTop: '150px'}}>
            <button onClick={addData}>Add profiles</button>
        </div>
    )
}

export default AddUsers