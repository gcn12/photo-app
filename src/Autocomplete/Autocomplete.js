import React from 'react'
import '../App.css'
/* global google */

const Autocomplete = (props) => {

    let autocomplete
    const initAutocomplete = () => {
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'),
            {
                types: ['(regions)'],
                // componentRestrictions: {'country': ['au']},
                // fields: ['geometry', 'name']
            }
            )
        autocomplete.addListener('place_changed', onPlaceChanged)
        if(props.isCheckProceed) {
            props.checkProceed()
        }
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
            <input autoComplete='off' defaultValue={props.defaultValue} onChange={initAutocomplete} id='autocomplete'></input>
        </div>
    )
}

export default Autocomplete