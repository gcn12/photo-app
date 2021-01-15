import React from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'

import {
    SelectInput,
    CategoryLocationContainer,
    Label,
} from './AddContent.styles'

const CategoryLocation = (props) => {

    const checkProceed = () => {
        if(document.getElementById('category').value.length > 0 && document.getElementById('autocomplete').value.length > 1) {
            props.setCategoryLocationProceed(true)
        }else{
            props.setCategoryLocationProceed(false)
        }
    }

    return(
        <CategoryLocationContainer visibility={props.animationMap.categoryLocation[props.categoryLocation].opacity} initial='initial' variants={props.animationMap.categoryLocation} animate={props.categoryLocation} transition='transition'>
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

export default CategoryLocation