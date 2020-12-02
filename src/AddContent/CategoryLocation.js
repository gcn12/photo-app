import React from 'react'
import Autocomplete from '../Autocomplete/Autocomplete'

import {
    SelectInput,
    CategoryLocationContainer,
    Label,
} from './AddContent.styles'

const CategoryLocation = (props) => {
    return(
        <CategoryLocationContainer visibility={props.animationMap.categoryLocation[props.categoryLocation].opacity} initial='initial' variants={props.animationMap.categoryLocation} animate={props.categoryLocation} transition='transition'>
            <Label htmlFor='category'>Select category:</Label>
            <SelectInput name='category' id='category'>
                <option value='' defaultValue>Select category</option>
                <option value='restaurant'>Restaurant</option>
                <option value='entertainment'>Entertainment</option>
                <option value='adventure'>Adventure</option>
                <option value='sightseeing'>Sightseeing</option>
                <option value='shopping'>Shopping</option>
                <option value='museum'>Museum</option>
            </SelectInput>
            <Label>Select city:</Label>
            <Autocomplete />
        </CategoryLocationContainer>
    )
}

export default CategoryLocation