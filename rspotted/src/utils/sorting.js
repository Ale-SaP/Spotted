function SortAlphabetically(list, param) {
    return (list.sort((a,b) => (a[param].toUpperCase() > b[param].toUpperCase()) ? 1 : -1))
}

function SortAlphabeticallyInverse(list, param) {
    return (list.sort((a,b) => (a[param].toUpperCase()) < (b[param].toUpperCase()) ? 1 : -1))
}

function SortByIndex(list, param) {
    return (list.sort((a,b) => a[param] > b[param] ? 1 : -1))
}

function Sort (listOfObjects, sort) {

    if (sort === "Tracks-A-to-Z") { 
        return (SortAlphabetically(listOfObjects, "trackName")) }

    else if (sort === "Tracks-Z-to-A") {
        return (SortAlphabeticallyInverse(listOfObjects, "trackName")) }

    else if (sort === "Artist-A-to-Z") { 
        return (SortAlphabetically(listOfObjects, "artistName")) }
    
    else if (sort === "Artist-Z-to-A") {
        return (SortAlphabeticallyInverse(listOfObjects, "artistName")) }

    else if (sort === "Index") {
        return SortByIndex(listOfObjects, "index") }

    else if (sort === "Inverse-Index") {
        return (SortByIndex(listOfObjects, "index")).reverse() }

    else if (sort === "Release-Date-") {
        return SortByIndex(listOfObjects, "releaseDate") }
    
    else if (sort === "Release-Date+") {
        return (SortByIndex(listOfObjects, "releaseDate")).reverse() }
    else {return listOfObjects}
}

function CheckIfIsResult(object, term) {
    const objectArtist = (object["artistName"]).toUpperCase()
    const artistCheck = (objectArtist !== (objectArtist.replace(term.toUpperCase(), "")))

    const objectName = (object["trackName"]).toUpperCase()
    const nameCheck = (objectName !== (objectName.replace(term.toUpperCase(), "")))

    const objectDate = (object["releaseDate"]).toUpperCase()
    const dateCheck = (objectDate !== (objectDate.replace(term.toUpperCase(), "")))

    const objectAlbum= (object["albumName"]).toUpperCase()
    const albumCheck = (objectAlbum !== (objectAlbum.replace(term.toUpperCase(), "")))

    return (artistCheck || nameCheck || dateCheck || albumCheck)
}

function SortForPlaylistSearch(listOfObjects, sort, term) {
    const filtered = listOfObjects.filter(object => CheckIfIsResult(object, term))
    return Sort(filtered, sort)
}

export function SortForPlaylist(listOfObjects, sort, term) {
    if (term) {
        return SortForPlaylistSearch(listOfObjects, sort, term)}
    else if (sort) {
        return Sort(listOfObjects, sort) }
    else {return listOfObjects}
}