import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router";
import { SortForPlaylist } from '../../utils/sorting';

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

function PlaylistTable({data, filterProp, termProp}) {

    const { filter, term} = useParams()
    const [sortedData, setSortedData] = useState( SortForPlaylist(data, filterProp, termProp) )
    
    useEffect( () => {
        setSortedData( (SortForPlaylist(data, filter, term)) )
    }, [filter, term])

    return (    
            <>
            <div className="overflow-x-auto container distance">
                <table className="table table-compact w-4/5">
                    <thead>
                        {tableHeaders()}
                    </thead> 
                    <tbody>
                        {sortedData.map(track => tableRow(track))}
                    </tbody>
                </table>
            </div>
            
            </>)
}

PlaylistTable.defaultProps = {
    sort: "Index"
}

export default PlaylistTable