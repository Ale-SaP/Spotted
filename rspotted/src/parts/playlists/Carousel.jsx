import { useParams } from "react-router"
import { TableHeaders, TableRow } from "./Table"

const CarouselButtons = (listOfObjects, filter) => {        
    if ( (filter ==="Inverse-Index") || (filter === "Index") ) {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => {
                    return (
                    <>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs">
                            { `${list[0]["index"]} to ${list[list.length - 1]["index"]}`}
                        </a>
                    </> 
                )})}
            </div>
        )
    }

    else if ( (filter ==="Tracks-A-to-Z") || (filter === "Tracks-Z-to-A") ) {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => { return (
                    <>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs">
                            { `${list[0]["trackName"][0]} to ${list[list.length - 1]["trackName"][0]}`}
                        </a>
                    </> 
                )})}
            </div>
        )
    }

    else if ( (filter ==="Artist-A-to-Z") || (filter === "Artist-Z-to-A") ) {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => { return (
                    <>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs">
                            { `${list[0]["artistName"][0]} to ${list[list.length - 1]["artistName"][0]}`}
                        </a>
                    </> 
                )})}
            </div>
        )
    }

    else if ( (filter ==="Release-Date+") || (filter === "Release-Date-") ) {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => { return (
                    <>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs">
                            {`${list[0]["releaseDate"].slice(0,4)} to ${list[list.length - 1]["releaseDate"].slice(0, 4)}`}
                        </a>
                    </> 
                )})}
            </div>
        )
    }
}


const Carousel = ( {listOfObjects} ) => {
    const { filter} = useParams()
    return (
        <div className="overflow-x-auto distance">
            {CarouselButtons(listOfObjects, filter)}
            <div className="carousel w-full">
                {listOfObjects.map( list => { return (
                    <div id={list[0]["index"]} className="carousel-item container">
                        <table className="table table-compact w-4/5">
                            <thead>
                                <TableHeaders />
                            </thead>
                            <tbody>
                                {list.map( track => {return <TableRow track={track}/>} )}
                            </tbody>
                        </table>
                    </div>
                )} )}
            </div>
        </div>
    )
}

export default Carousel