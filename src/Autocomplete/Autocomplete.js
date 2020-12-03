import React from 'react'
import '../App.css'
/* global google */

const Autocomplete = (props) => {

    let autocomplete
    const initAutocomplete = () => {
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            {
                types: ['(cities)'],
                // componentRestrictions: {'country': ['au']},
                // fields: ['place_id', 'geometry', 'name']
            }
            )
        autocomplete.addListener('place_changed', onPlaceChanged)
        props.checkProceed()
        console.log('autocomplete')
    }

    const onPlaceChanged = () => {
        const place = autocomplete.getPlace()
        if (!place?.name) {
            document.getElementById('autocomplete').placeholder = 'Enter a place'
        } else {
            console.log('autocomplete')
        }
    }

    return(
        <div>
            <input autoComplete='off' onChange={initAutocomplete} id='autocomplete'></input>
        </div>
    )
}

export default Autocomplete