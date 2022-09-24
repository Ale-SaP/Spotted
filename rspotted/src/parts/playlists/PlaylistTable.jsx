import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router";
import { SortForPlaylist } from '../../utils/sorting';
import { useNavigate } from "react-router";

const tableHeaders = () => {
    return(
    <tr>
        <th></th>
        <th>Track Name</th>
        <th>Artist</th> 
        <th>Album</th> 
        <th>Release Date</th> 
    </tr>
) }

const tableRow = (track, navigate) => {
    return (
        <tr key={track.id}>
            <th>{ characterClip(track.index) }</th> 
            <td >{ characterClip(track.trackName) }</td> 
            <td>{ characterClip(track.artistName) }</td> 
            <td>{ characterClip(track.albumName) }</td> 
            <td>{( characterClip(track.releaseDate) ).split("-")[0]}</td> 
        </tr>
    )
}

const characterClip = (string) => {
    if ( string.length > 50) {return ( (string.slice(0, 50)) + "...")}
    else {return string}
}

const pagination = (listOfObjects, limit) => {
    let list = []
    if ( (listOfObjects.length) > limit) {
        for (let i = 0; i < ((limit * listOfObjects.length)/10000); i ++) {
            let iteration = listOfObjects.slice((i*limit), (i*limit + limit))
            list.push( iteration )
        }
        return list.map( panel => { return (
            panel.map( track => {return (tableRow(track))}) )
        } )
        
    }
    else {
        return listOfObjects.map( track => tableRow(track))}
}

function PlaylistTable({data, filterProp, termProp}) {

    const { filter, term} = useParams()
    const [sortedData, setSortedData] = useState( SortForPlaylist(data, filterProp, termProp) )
    const navigate = useNavigate()
    
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
                        {pagination(sortedData, 100)}
                    </tbody>
                </table>
            </div>
            
            </>)
}

PlaylistTable.defaultProps = {
    sort: "Index"
}

export default PlaylistTable