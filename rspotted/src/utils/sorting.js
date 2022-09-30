//This file is meant to be analized from bottom to top, the first functions are meant to be called last.

// The param determines if we should sort alphabetically by the artist or track name, meaning object[param]
function SortAlphabetically(list, param) {
    return (list.sort((a,b) => (a[param].toUpperCase() > b[param].toUpperCase()) ? 1 : -1))
}

//Same function as above but the value comparison is reversed (meaning "<" to ">")
function SortAlphabeticallyInverse(list, param) {
    return (list.sort((a,b) => (a[param].toUpperCase()) < (b[param].toUpperCase()) ? 1 : -1))
}

function SortByIndex(list, param) {
    return (list.sort((a,b) => a[param] > b[param] ? 1 : -1))
}

//Check in what way it needs to be sorted, then redirects to each function
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

// Easiest Explanation: if the string MINUS the term is still the same, it means the term didn't appear and so it will not be shown.
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

//For object in list, pass the object thru CheckIfResult and then sort what is left.
function FilterForSearchAndSort(listOfObjects, sort, term) {
    const filtered = listOfObjects.filter(object => CheckIfIsResult(object, term))
    return Sort(filtered, sort)
}

// If there is a search term, it filters the list, then sorts it.
// If there is not a search term, it just filters the results.
export function SortForPlaylist(listOfObjects, sort, term) {
    if (term) {
        return FilterForSearchAndSort(listOfObjects, sort, term)}
    else if (sort) {
        return Sort(listOfObjects, sort) }
    else {return listOfObjects}
}