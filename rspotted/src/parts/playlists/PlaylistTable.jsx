import { useEffect, useState } from "react";
import { useParams} from "react-router";
import { SortForPlaylist } from '../../utils/sorting';

//Returns the table headers, duh
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

//Returns a single row, with the data of ONE track
const tableRow = (track) => {
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

//Checks if the string is too long
const characterClip = (string) => {
    if ( string.length > 50) {return ( (string.slice(0, 50)) + "...")}
    else {return string}
}

//Transforms a list of multiple elements to multiple lists of fewer elements
const pagination = (listOfObjects, limit) => {
    let list = []
    for (let i = 0; i < ((listOfObjects.length)/limit); i ++) {
        let iteration = listOfObjects.slice((i*limit), (i*limit + limit))
        list.push( iteration )
    }
    return list
}

//Renders a carousel, made up of multiple slides. This should not render if the ammount of tracks is under the limit.
//Also, the render works this way:  Carousel Buttons => for each slide in listOfObjects, render a button
//                                  Carousel => for each list in listOfObjects => for each track in list => tableRow(track)
const carousel = (listOfObjects) => {
    
    return (
        <>
        <div className="flex justify-center w-full py-2 gap-2">
            {listOfObjects.map( list => { return (
                <>
                    <a href={"#" + list[0]["index"]} className="btn btn-xs">{ `${list[0]["index"]} to ${list[list.length - 1]["index"]}`}</a>
                </> 
            )})}
        </div>
        <div className="carousel w-full">
                {listOfObjects.map( list => { return (
                    <div id={list[0]["index"]} className="carousel-item w-full container">
                        <table className="table table-compact w-4/5">
                            <thead>
                                {tableHeaders()}
                            </thead>
                            <tbody>
                                {list.map( track => {return tableRow(track)} )}
                            </tbody>
                        </table>
                    </div>
                )} )}
        </div>
        </>
    )
}

const checkIfPaginationNeeded = (listOfObjects, limit) => {
    if (listOfObjects.length > limit) {
        const paginatedList = pagination(listOfObjects, limit)
        return carousel(paginatedList)
    }

    else {
        return (
        <div className="overflow-x-auto container distance">
        <table className="table table-compact w-4/5">
            <thead>
                {tableHeaders()}
            </thead>
            <tbody>
                {listOfObjects.map(track => {return (tableRow(track))})}
            </tbody>
        </table>
        </div> 
        )
    }
}

function PlaylistTable({data, filterProp, termProp}) {

    const { filter, term} = useParams()
    const [sortedData, setSortedData] = useState( SortForPlaylist(data, filterProp, termProp) )
    
    useEffect( () => {
        setSortedData( (SortForPlaylist(data, filter, term)) )
    }, [filter, term, data])

    return (
            <>
                <div className="overflow-x-auto distance">
                    {checkIfPaginationNeeded(sortedData, 25)}
                </div>
            </>)
}

PlaylistTable.defaultProps = {
    sort: "Index"
}

export default PlaylistTable