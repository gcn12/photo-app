import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'
import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import {
    Container,
    SearchBox,
    IconContainer,
} from './Search.styles'

const Search = (props) => {
    const [query, setQuery] = useState('')

    const search = () => { 
        const searchClient = algoliasearch(
            'VNSU9OYWB2',
            '6478d10ccc9941fe49a73aeb6ba2e73f'
        )

        const queries = [{
            indexName: 'users',
            query: query,
            params: {
                hitsPerPage: 2,
                attributesToRetrieve: ['name', 'image', 'username', 'profileImage'],
            }
        }, {
            indexName: 'test_PHOTOAPP',
            query: query,
            params: {
                hitsPerPage: 6,
                attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city'],
            }
        }]

        if(query.length > 0) {
            searchClient.multipleQueries(queries).then(({ results }) => {
                if(results[1].hits.length>0 || results[0].hits.length>0) {
                    let resultsArray = [...results[1].hits, ...results[0].hits]
                    props.setSearchResults(resultsArray)
                }else{
                    props.setSearchResults('No results')
                }
            });
            
        }else{
            props.setSearchResults([])
        }
    }

    const enterQuery = (e) => {
        if(e.code==='Enter') {
            if(props.location.pathname !== '/photo-app/search'){
                props.history.push('/photo-app/search')
            }
            search()
        }
    }

    return(
        <Container>
            <div style={{position: 'relative'}} className='search-results'>
            <IconContainer>
                <SearchIcon style={{position: 'absolute', top: '5', left: '5', transform: 'scale(.8)'}}></SearchIcon>
                {/* <SearchIcon style={{transform: 'scale(1)'}}></SearchIcon> */}
            </IconContainer>
                <div style={{position: 'absolute', left: '10%'}}></div>
                <SearchBox autoComplete='off' onKeyDown={enterQuery} id='result-query-input' className='search-results' placeholder='search' onChange={(e)=>setQuery(e.target.value)}></SearchBox>
            </div>
            
        </Container>
    )
}

export default Search