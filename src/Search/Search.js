import React, {  } from 'react'
// import algoliasearch from 'algoliasearch'
import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import {
    Container,
    SearchBox,
    IconContainer,
} from './Search.styles'

const Search = (props) => {
    // const [query, setQuery] = useState('')

    // const search = () => { 
    //     const searchClient = algoliasearch(
    //         'VNSU9OYWB2',
    //         '6478d10ccc9941fe49a73aeb6ba2e73f'
    //     )

    //     const usersQuery = {
    //         indexName: 'users',
    //         query: query,
    //         params: {
    //             hitsPerPage: 2,
    //             attributesToRetrieve: ['name', 'image', 'username', 'profileImage'],
    //         }
    //     }

    //     const postsQuery = {
    //         indexName: 'posts',
    //         query: query,
    //         params: {
    //             hitsPerPage: 6,
    //             attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city'],
    //         }
    //     }

    //     const citiesQuery = {
    //         indexName: 'cities',
    //         query: query,
    //         params: {
    //             hitsPerPage: 2,
    //             attributesToRetrieve: ['city', 'country', 'image'],
    //         }
    //     }

    //     const countriesQuery = {
    //         indexName: 'countries',
    //         query: query,
    //         params: {
    //             hitsPerPage: 2,
    //             attributesToRetrieve: ['country', 'image',],
    //         }
    //     }

    //     const queries = [] 

    //     if(props.searchQueries === 'posts' || props.searchQueries === 'all results') {
    //         queries.push(postsQuery)
    //     }
    //     if(props.searchQueries === 'people' || props.searchQueries === 'all results') {
    //         queries.push(usersQuery)
    //     }
    //     if(props.searchQueries === 'cities' || props.searchQueries === 'all results') {
    //         queries.push(citiesQuery)
    //     }
    //     if(props.searchQueries === 'countries' || props.searchQueries === 'all results') {
    //         queries.push(countriesQuery)
    //     }

    //     let resultsArray = []
    //     if(query.length > 0) {
    //         searchClient.multipleQueries(queries).then(({ results }) => {
    //             if(results[0].hits.length>0) {
    //                 resultsArray.push(...results[0].hits)
    //             }
    //             if(results[1]?.hits?.length>0) {
    //                 resultsArray.push(...results[1].hits)
    //             }
    //             if(results[2]?.hits?.length>0) {
    //                 resultsArray.push(...results[2].hits)
    //             }
    //             if(results[3]?.hits?.length>0) {
    //                 resultsArray.push(...results[3].hits)
    //             }
    //             if(resultsArray.length> 0){
    //                 props.setSearchResults(resultsArray)
    //             }else{
    //                 props.setSearchResults('No results')
    //             }
    //         });
            
    //     }else{
    //         props.setSearchResults([])
    //     }
    // }

    const enterQuery = (e) => {
        if(e.code==='Enter') {
            // props.setSearchResults([[],[],[],[]])
            if(props.location.pathname !== '/photo-app/search'){
                props.history.push('/photo-app/search')
            }
            props.search(props.searchQueries)
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
                <SearchBox autoComplete='off' onKeyDown={enterQuery} id='result-query-input' className='search-results' placeholder='search' onChange={(e)=>props.setQuery(e.target.value)}></SearchBox>
            </div>
            
        </Container>
    )
}

export default Search