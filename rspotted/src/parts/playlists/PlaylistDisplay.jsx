//Main imports
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"

//Components
import TextScreen from '../TextScreen';
import { callPlaylist } from '../../utils/methods';
import PlaylistTable from './PlaylistTable';
import FilterBar from './FilterBar';
import SearchBar from '../SearchBar'

function PlaylistDisplay() {
    
    const { id, filter, term} = useParams();
    const {isLoading, isError, data, error} = useQuery(["webData", id], async () => {return (await callPlaylist(id))} )


    if (isLoading) {
        return (
            <> 
                <h3 className='container'> Loading! </h3> 
            </> ) }

    if (isError) {
        return ( 
            <> 
                <h3 className='container'> {error.message} </h3>
                <SearchBar direction="playlist"/> 
            </> ) }
    
    if (data["success"] === true) {
        return (
            <div style={{backgroundColor:"#121212"}}>
                <SearchBar direction="playlist"/>
                <FilterBar />
                <PlaylistTable data={data["tracks"]} filterProp={filter} termProp={term} /> 
            </div>)
    }
    else { 
        return (
            <>
                <SearchBar direction="playlist"/> 
                <TextScreen title={"Whoops! The request was not valid."}
                text={"Perhaps the id was not valid or the playlist was not public."}/> 
            </>) }
}



export default PlaylistDisplay