function SortAlphabetically(list, param) {
    return (list.sort((a,b) => a[param] > b[param] ? 1 : -1))
}

function SortAlphabeticallyInverse(list, param) {
    return (list.sort((a,b) => a[param] < b[param] ? 1 : -1))
}

function SortByIndex(list) {
    return (list.sort((a,b) => a["index"] > b["index"] ? 1 : -1))
}

function Sort (listOfObjects, sort, param) {

    if (sort === "A-to-Z") { 
        return (SortAlphabetically(listOfObjects, param)) }

    else if (sort === "Z-to-A") {
        return (SortAlphabeticallyInverse(listOfObjects, param)) }

    else if (sort === "Index") {
        return SortByIndex(listOfObjects) }

    else if (sort === "Inverse-Index") {
        return (SortByIndex(listOfObjects)).reverse() }
}

function CheckIfIsResult(object, term) {
    const objectName = (object["trackName"]).toUpperCase()
    return (objectName !== (objectName.replace(term.toUpperCase(), "")))
}

export function SortForPlaylist(listOfObjects, sort, term) {
    if (term) {
        return SortForPlaylistSearch(listOfObjects, sort, term)}
    else if (sort) {
        return Sort(listOfObjects, sort, "trackName") }
    else {return listOfObjects}
}

function SortForPlaylistSearch(listOfObjects, sort, term) {
    const filtered = listOfObjects.filter(object => CheckIfIsResult(object, term))
    return Sort(filtered, sort, "trackName")
}