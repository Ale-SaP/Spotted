//Main imports
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from "@tanstack/react-query"

//Components
import TextScreen from '../TextScreen';
import { callPlaylist } from '../../utils/methods';
import PlaylistTable from './PlaylistTable';
import FilterBar from './FilterBar';

function PlaylistDisplay() {
    
    const queryClient = useQueryClient()
    const { id, filter, term} = useParams();
    const {isLoading, isError, data, error} = useQuery(["webData", id], async () => {return (await callPlaylist(id))} )

    if (isLoading) {
        return (
            <> <h4> Loading! </h4> </> ) }

    if (isError) {
        return ( 
            <> <h4> {error.message} </h4> </> ) }
    
    if (data["success"] === true) {
        return (
        <>
        <FilterBar />
        <PlaylistTable data={data["tracks"]} filterProp={filter} termProp={term} /> 
        </>)
    }
    else{ return ( <TextScreen title={"Whoops! The request was not valid."}
    text={"Perhaps the id was not valid or the playlist was not public."}/> ) }
}



export default PlaylistDisplay