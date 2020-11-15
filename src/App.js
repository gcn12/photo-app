import React from 'react'
import UploadPhoto from './UploadPhoto/UploadPhoto'
import AddContent from './AddContent/AddContent'
import GetPhotos from './GetPhotosHomepage/GetPhotosHomepage'

const App = () => {
  return (
    <div>
      <UploadPhoto />
      <AddContent />
      <GetPhotos />
    </div>
  );
}

export default App;



// const dataTest = {
//   continents: {
//     Asia: {
//       cities: {

//       }
//     },
//     Africa: {

//     },
//     NorthAmerica: {

//     },
//     SouthAmerica: {

//     },
//     Oceania: {

//     },
//     Europe: {

//     }
//   },
//   Posts: {
//     1: {
//       country: 'country',
//       city: 'city',
//       category: 'category',
//       timestamp: 'timestamp',
//       author: 'author',
//       photo: 'url'
//     }
//   },
//   Users : {
//     username: {
//       postsCreated: ['listID', 'listID2'],
//       lists: {
//         listName: ['listID', 'listID2']
//       }
//     }
//   }
// }