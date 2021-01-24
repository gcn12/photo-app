import React from 'react'
import { connect } from 'react-redux'
import Autocomplete from '../Autocomplete/Autocomplete'
import { categoryLocationProceed } from '../Redux/Actions/addContentActions'
import {
    SelectInput,
    CategoryLocationContainer,
    Label,
} from './AddContent.styles'

const CategoryLocation = (props) => {

    const checkProceed = () => {
        if(document.getElementById('category').value.length > 0 && document.getElementById('autocomplete').value.length > 1) {
            props.dispatch(categoryLocationProceed(true))
        }else{
            props.dispatch(categoryLocationProceed(false))
        }
    }

    return(
        <CategoryLocationContainer styles={props.styles}>
            <Label htmlFor='category'>Select category:</Label>
            <SelectInput onChange={checkProceed} name='category' id='category'>
                <option value='' defaultValue>Select category</option>
                <option value='restaurant'>Restaurant</option>
                <option value='entertainment'>Entertainment</option>
                <option value='adventure'>Adventure</option>
                <option value='sightseeing'>Sightseeing</option>
                <option value='shopping'>Shopping</option>
                <option value='museum'>Museum</option>
            </SelectInput>
            <Label>Select location (city or country):</Label>
            <Autocomplete isCheckProceed={true} checkProceed={checkProceed}/>
        </CategoryLocationContainer>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(CategoryLocation)