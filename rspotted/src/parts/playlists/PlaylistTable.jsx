import { useEffect, useState } from "react";
import { useParams} from "react-router";
import { SortForPlaylist } from '../../utils/sorting';
import { TableRow, TableHeaders } from "./Table";

//Components
import Carousel from "./Carousel";
import pagination from "../../utils/pagination";

function PlaylistTable({data, filterProp, termProp}) {

    const { filter, term} = useParams()
    const [sortedData, setSortedData] = useState( SortForPlaylist(data, filterProp, termProp) )
    const [limit, setLimit] = useState(50)
    
    useEffect( () => {
        setSortedData( (SortForPlaylist(data, filter, term)) )
    }, [filter, term, data])

    if (sortedData.length > limit) {
        const paginatedList = pagination(sortedData, limit)
        return Carousel(paginatedList)
    }

    else {
        return (
        <div className="overflow-x-auto container distance">
        <table className="table table-compact w-4/5">
            <thead>
                <TableHeaders />
            </thead>
            <tbody>
                {sortedData.map(track => {return <TableRow track={track} />})}
            </tbody>
        </table>
        </div> 
        )
    }
}

PlaylistTable.defaultProps = {
    sort: "Index"
}

export default PlaylistTable