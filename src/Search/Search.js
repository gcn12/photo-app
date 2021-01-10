import React from 'react'
// import algoliasearch from 'algoliasearch'
import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import { query, searchResults } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
import {
    Container,
    SearchBox,
    IconContainer,
} from './Search.styles'

const Search = (props) => {

    const enterQuery = (e) => {
        if(e.code==='Enter' && props.query.length > 0) {
            if(props.location.pathname !== '/photo-app/search'){
                props.history.push('/photo-app/search')
            }
            const results = []
            props.dispatch(searchResults([...results]))
            props.search(props.searchQueries)
        }
    }

    return(
        <Container>
            <div style={{position: 'relative'}} className='search-results'>
            <IconContainer>
                <SearchIcon style={{position: 'absolute', top: '7', left: '5', transform: 'scale(.6)'}}></SearchIcon>
                {/* <SearchIcon style={{transform: 'scale(1)'}}></SearchIcon> */}
            </IconContainer>
                <div style={{position: 'absolute', left: '10%'}}></div>
                <SearchBox autoComplete='off' onKeyDown={enterQuery} id='result-query-input' className='search-results' placeholder='search' onChange={(e)=>props.dispatch(query(e.target.value))}></SearchBox>
            </div>
            
        </Container>
    )
}

const mapStateToProps = state => ({
    query: state.app.query,
    searchQueries: state.app.searchQueries,
})

export default connect(mapStateToProps)(Search)