//Main imports
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from "@tanstack/react-query"

//Components
import TextScreen from '../TextScreen';
import { callPlaylist } from '../../utils/methods';
import FilterBar from './FilterBar'

function PlaylistDisplay() {

    const queryClient = useQueryClient()

    const { id } = useParams();
    const {isLoading, isError, data, error} = useQuery(["webData", id], async () => {return (await callPlaylist(id))} )

    const tableHeaders = () => {
        return(
        <tr>
            <th></th> 
            <th>Track Name</th> 
            <th>Artist</th> 
            <th>Album</th> 
            <th>Release Date</th> 
            <th>Spotify Link</th> 
        </tr>
    ) }
    const tableRow = (track) => {
        return (
            <tr key={track.id}>
                <th>{ characterClip(track.index) }</th> 
                <td>{ characterClip(track.trackName) }</td> 
                <td>{ characterClip(track.artistName) }</td> 
                <td>{ characterClip(track.albumName) }</td> 
                <td>{( characterClip(track.releaseDate) ).split("-")[0]}</td> 
                <td href={track.trackLink} target="_blank">{track.id}</td> 
            </tr>
        )
    }
    const characterClip = (string) => {
        if ( string.length > 50) {return ( (string.slice(0, 50)) + "...")}
        else {return string}
    }

    //If the request was valid

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
            <div className="overflow-x-auto container distance">
                <table className="table table-compact w-4/5">
                    <thead>
                        {tableHeaders()}
                    </thead> 
                    <tbody className=''>
                        {data["tracks"].map(track => {return tableRow(track)})}
                    </tbody>
                </table>
            </div>
            </>) }
    else {
        return ( <TextScreen title={"Whoops! The request was not valid."}
         text={"Perhaps the id was not valid or the playlist was not public."}/> )
    }
}



export default PlaylistDisplay