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


export function SortForPlaylist(listOfObjects, sort) {
    const sortedTracks = Sort(listOfObjects, sort, "trackName")
    return sortedTracks
}
