// import React from 'react'
// import { db } from './Firebase'

// const QueryTest = () => {

//     const country = 'Canada'

//     const query = () => {
//         db.collection('continents-countries').doc('map').collection(country)
//         .where(country, 'in', ['North America', 'South America', 'Asia', 'Europe', 'Oceania', 'Africa'])
//         .get()
//         .then(data => {
//             console.log(data.docs[0].data()[country])
//         })
//     }

//     const getData = () => {
//         db.collection('continents-map')
//         .get()
//         .then(data=> {
//             console.log(data.docs[0].data())
//             const countriesList = data.docs[0].data()
//             const countries = Object.entries(countriesList)
//             // console.log(countries)
//             countries.map((item, index) => {
//                 db.collection('continents-countries').doc('map').collection(item[0]).doc(item[0])
//                 .set({
//                     [item[0]]: item[1]
//                 }, {merge: true})
//             })
//         })
//     }

//     const upload = () => {
//         // db.collection('continents-countries').doc('map').collection
//     }

//     return(
//         <div>
//             <button onClick={query}>Query</button>
//         </div>
//     )
// }

// export default QueryTest