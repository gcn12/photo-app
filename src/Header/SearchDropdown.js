import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import algoliasearch from 'algoliasearch'
import { connect } from 'react-redux'
import { searchTransition, searchVisibility } from '../Redux/Actions/headerActions'
import {
    Container,
    Cancel,
    CancelContainer,
    SearchInput,
    ResultsContainer,
    Image,
    ResultContainer,
    Text,
    ProfileImage,
} from './SearchDropdown.styles'

const variants = {
    initial: {
        y: -200,
        x: 0,
        opacity: 0,
    },
    transitionStart: {
        y: 0,
        opacity: .97,
    },
    transitionEnd: {
        y: -200,
        opacity: 0,
    },
    transition: {
        y: {
            type: 'spring',
            stiffness: 20,
        },
    }
}

const SearchDropdown = (props) => {

    const [query, setQuery] = useState('')
    const [hits, setHits] = useState([])
    const [showResults, setShowResults] = useState(false)
    
    useEffect(()=> {
        const searchClient = algoliasearch(
            'VNSU9OYWB2',
            '6478d10ccc9941fe49a73aeb6ba2e73f'
        )

        const search = () => {
            
            const queries = [{
                indexName: 'users',
                query: query,
                params: {
                    hitsPerPage: 2,
                    attributesToRetrieve: ['name', 'image', 'username', 'profileImage'],
                }
            }, {
                indexName: 'posts',
                query: query,
                params: {
                    hitsPerPage: 2,
                    attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city'],
                }
            }]

            if(query.length > 0) {
                setShowResults(true)

                searchClient.multipleQueries(queries).then(({ results }) => {
                    if(hits.length>0) {
                        let resultsArray = [...results[1].hits, ...results[0].hits]
                        console.log(results);
                        setHits(resultsArray)
                    }else{
                        setHits('No results')
                    }
                });
                
            }else{
                setHits([])
            }
        }
        const timeout = setTimeout(()=> search(), 300)
        return ()=> clearTimeout(timeout)
        // eslint-disable-next-line 
    }, [query])

    //Single index search:
    // useEffect(()=> {
    //     const searchClient = algoliasearch(
    //         'VNSU9OYWB2',
    //         '6478d10ccc9941fe49a73aeb6ba2e73f'
    //     )
    //     const search = (querySearch) => {
    //         const index = searchClient.initIndex('posts')
    //         if(query.length > 0) {
    //             setShowResults(true)
    //             index.search(query, {
    //                 attributesToRetrieve: ['title', 'country', 'image', 'username', 'url', 'city'],
    //                 hitsPerPage: 5,
    //             }).then(({ hits }) => {
    //                 console.log(hits);
    //                 if(hits.length>0) {
    //                     setHits([...hits])
    //                 }else{
    //                     setHits('No results')
    //                 }
    //             });
    //         }else{
    //             setHits([])
    //         }
    //     }
    //     const timeout = setTimeout(()=> search(query), 300)
    //     return ()=> clearTimeout(timeout)
    // }, [query])

    const clearResults = () => {
        setShowResults(false)
        document.getElementById('dropdown-result-query-input').value = ''
    }

    const closeDropdown = () => {
        props.dispatch(searchTransition('transitionEnd'))
        setTimeout(()=> props.dispatch(searchVisibility(false)), 300)
        document.body.style.overflowY = 'auto'
        document.body.style.position = 'initial'
        clearResults()
    }

    return(
        <div>
            <Container visibility={props.searchVisibility ? 1 : 0} transition='transition' variants={variants} initial='initial' animate={props.searchTransition}>
                <CancelContainer>
                    <Cancel onClick={closeDropdown}>&times;</Cancel>
                </CancelContainer>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <SearchInput autoComplete='off' placeholder='search' id='dropdown-result-query-input' onChange={(e)=> setQuery(e.target.value)}></SearchInput>
                </div>
                {query.length > 0 && showResults ?
                <ResultsContainer>
                    {hits === 'No results' ? 
                    <div style={{padding: '15px'}}>No results</div>
                    :
                    <div>
                        {hits.length > 0 ? 
                        hits?.map((item, index)=> {
                            return item.name ? 
                            (
                                <Link key={index} style={{ textDecoration: 'none' }} onClick={closeDropdown} to={`/photo-app/profiles/${item.username}`}> 
                                    <ResultContainer>
                                        <ProfileImage src={item.profileImage}></ProfileImage>
                                        <Text>{item.name}</Text>
                                        <Text>{item.username}</Text>
                                    </ResultContainer>
                                </Link>
                            )
                            :
                            (
                                <Link key={index} style={{ textDecoration: 'none' }} onClick={closeDropdown} to={`/photo-app/post/${item.username}/${item.url}`}> 
                                    <ResultContainer>
                                        <Image src={item.image}></Image>
                                        <Text>{item.title}</Text>
                                    </ResultContainer>
                                </Link>
                            )
                        })
                        :
                        null
                    }
                    </div>
                    }
                </ResultsContainer>
                :
                null
                }
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    searchTransition: state.header.searchTransition,
    searchVisibility: state.header.searchVisibility,
})

export default connect(mapStateToProps)(SearchDropdown)