#This function takes an artist ID as argument and returns a dictionary of the artist's data.
#The dictionary has the following fields: 'id', 'name', 'profilePic' and 'link', the last two are links.
def returnArtistData(artistID, spotify):
    rawData = spotify.artist(artistID)
    artistData = {'id': artistID, 'artistName': rawData['name'], 'profilePic' : rawData['images'][0]['url'], 
    'link' : rawData['external_urls']['spotify'] }
    return (artistData)

#This function takes an artist ID as argument and returns a dictionary 8 related artist's data.
#Every artist's dictionary has the following fields: 'id', 'artistName', 'tracks' x 5, 'profilePic' and 'link', the last three are links.
#Every track is also a dictionary, which has the following: 'id', 'trackName', 'embed'
def returnRelatedArtists(artistId, spotify):
    results = spotify.artist_related_artists(artistId)
    artists = results['artists']
    relatedArtists = []
    for x in range(0, 8):
        element = artists[x]

        thisArtist = { 'artistName': element['name'], 'id': element['id'], 'tracks': '', 
        'link': element['external_urls']['spotify'], 'profilePic': element['images'][0]['url']}

        topTracks = spotify.artist_top_tracks(element['id'], 'US')
        finaltracks = []

        for index in range(0, 5):
            track = topTracks['tracks'][index]
            finaltracks.append( {"trackName" : track['name'], "id" : track['id'], 
            'embed' : 'https://open.spotify.com/embed/track/'+ track['id'] +'?utm_source=generator' } )
        thisArtist['tracks'] = finaltracks
        relatedArtists.append(thisArtist)
    return(relatedArtists)

def returnPlaylist(playlistId, spotify):

    requestData = spotify.playlist(playlistId)
    playlistName = requestData["name"]
    playlistData = requestData["tracks"]
    nextSearch = playlistData["next"]
    nextData = playlistData
    iterations = 0

    while (nextSearch and (iterations < 10)):
        print("request")
        iterations += 1
        nextData = (spotify.next(nextData))
        nextSearch = nextData["next"]
        for track in nextData["items"]:
            playlistData["items"].append(track)

    index = 0
    playlistSongs = []

    for track in playlistData["items"]:
        track = track["track"]
        index += 1
        selectedData = {
        "index": index,
        "trackName": track["name"], "id":track["id"] , "trackApiLink":track["href"], "trackLink":track["external_urls"]["spotify"],
        "artistName": track["artists"][0]["name"],"artistId": track["artists"][0]["id"], 
        "artistApiLink": track["artists"][0]["href"], "trackLink":track["external_urls"]["spotify"],
        "artistLink": track["artists"][0]["external_urls"]["spotify"],
        "albumName":track["album"]["name"], "releaseDate": (track["album"]["release_date"])}
        playlistSongs.append(selectedData)
    return (playlistSongs, playlistName)