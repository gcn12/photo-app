import React from 'react'
import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import { query, searchResults, searchQueries } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
import {
    Container,
    SearchBox,
    ContainerAbsolute,
} from './Search.styles'

const Search = (props) => {
    const enterQuery = (e) => {
        if(e.code==='Enter' && props.query.length > 0) {
            if(props.location.pathname !== '/photo-app/search'){
                props.history.push(`/photo-app/search/${props.query}`)
                props.search('all results')
                props.dispatch(searchQueries('all results'))
            }else {
                props.search(props.searchQueries)
            }
            const results = []
            props.dispatch(searchResults([...results]))
            document.activeElement.blur();
        }
    }

    const QueryInput = (e) => {
        props.dispatch(query(e.target.value))
    }

    return(
        <div>
            <ContainerAbsolute>
                <div style={{position: 'relative'}} className='search-results'>
                    <SearchIcon style={{position: 'absolute', top: '6', left: '5', transform: 'scale(.6)'}}></SearchIcon>
                    <div style={{position: 'absolute', left: '10%'}}></div>
                    <SearchBox autoComplete='off' onKeyDown={enterQuery} id='result-query-input' className='search-results' placeholder='search' onChange={(e)=>QueryInput(e)}></SearchBox>
                </div>
            </ContainerAbsolute>
            <Container>
                <div style={{position: 'relative'}} className='search-results'>
                    <SearchIcon style={{position: 'absolute', top: '6', left: '5', transform: 'scale(.6)'}}></SearchIcon>
                    <div style={{position: 'absolute', left: '10%'}}></div>
                    <SearchBox autoComplete='off' onKeyDown={enterQuery} id='result-query-input' className='search-results' placeholder='search' onChange={(e)=>QueryInput(e)}></SearchBox>
                </div>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    query: state.app.query,
    searchQueries: state.app.searchQueries,
})

export default connect(mapStateToProps)(Search)