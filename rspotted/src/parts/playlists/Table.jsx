//Checks if the string is too long
const characterClip = (string) => {
    if ( string.length > 40) {return ( (string.slice(0, 30)) + "...")}
    else {return string}
}

//Returns the table headers, duh
export const TableHeaders = ({id}) => {
    return(
    <tr key={id}>
        <th></th>
        <th>Track Name</th>
        <th>Artist</th> 
        <th>Album</th> 
        <th>Release Date</th> 
    </tr>
) }

//Returns a single row, with the data of ONE track
export const TableRow = ({track}) => {
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