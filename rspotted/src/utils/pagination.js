//Transforms a list of multiple elements to multiple lists of fewer elements
const pagination = (listOfObjects, limit) => {
    let list = []
    for (let i = 0; i < ((listOfObjects.length)/limit); i ++) {
        let iteration = listOfObjects.slice((i*limit), (i*limit + limit))
        list.push( iteration )
    }
    while (list[list.length - 1].length !== limit) {
        list[list.length - 1].push({
            "index": "...",
            "trackName": "..." , "trackApiLink":"...", "trackLink":"...",
            "artistName": "...","artistId": "...", 
            "artistApiLink": "...",
            "artistLink": "...",
            "id": (list[list.length - 1].length),
            "albumName":"...", "releaseDate": "...",})
    }
    return list
}

export default pagination