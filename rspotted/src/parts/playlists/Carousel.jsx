import { useParams } from "react-router"
import { TableHeaders, TableRow } from "./Table"    

const CarouselButtons = ({listOfObjects, filter}) => {        

    if ( (filter ==="Tracks-A-to-Z") || (filter === "Tracks-Z-to-A") ) {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => { return (
                    <div key={list[0]["id"]}>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs" key={list[0]["id"]} >
                            { `${list[0]["trackName"][0]} to ${list[list.length - 1]["trackName"][0]}`}
                        </a>
                    </ div> 
                )})}
            </div>
        )
    }

    else if ( (filter ==="Artist-A-to-Z") || (filter === "Artist-Z-to-A") ) {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => { return (
                    <div key={list[0]["id"]}>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs" key={list[0]["id"]}>
                            { `${list[0]["artistName"][0]} to ${list[list.length - 1]["artistName"][0]}`}
                        </a>
                    </div> 
                )})}
            </div>
        )
    }

    else if ( (filter ==="Release-Date+") || (filter === "Release-Date-") ) {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => { return (
                    <div key={list[0]["id"]}>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs" key={list[0]["id"]}>
                            {`${list[0]["releaseDate"].slice(0,4)} to ${list[list.length - 1]["releaseDate"].slice(0, 4)}`}
                        </a>
                    </div> 
                )})}
            </div>
        )
    }

    else {
        return (
            <div className="flex justify-center w-full py-2 gap-2">
                {listOfObjects.map( list => {
                    return (
                    <div key={list[0]["id"]}>
                        <a href={"#" + list[0]["index"]} className="btn btn-xs" key={list[0]["id"]}>
                            { `${list[0]["index"]} to ${list[list.length - 1]["index"]}`}
                        </a>
                    </div> 
                )})}
            </div>
        )
    }
}


const Carousel = ( {listOfObjects} ) => {
    const { filter} = useParams()
    return (
        <>
        <div className="overflow-x-auto distance">
            <CarouselButtons listOfObjects={listOfObjects}  filter={filter}/>
            <div className="carousel w-full">
                {listOfObjects.map( list => { return (
                    <div id={list[0]["index"]} className="carousel-item container distance" key={list[0]["id"]}>
                        <table className="table table-compact w-4/5">
                            <thead>
                                <TableHeaders key={list[0]["id"]}/>
                            </thead>
                            <tbody>
                                {list.map( track => {return <TableRow track={track} key={track.id} />} )}
                            </tbody>
                        </table>
                    </div>
                )} )}
            </div>
        </div>
        </>
    )
}

export default Carousel