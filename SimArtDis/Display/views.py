from xml.dom.minidom import Element
from django.shortcuts import render

from django.http import HttpResponseRedirect

import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

#Replace this with your keys.
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id="", 
    client_secret=""))

#This function takes an artist ID as argument and returns a dictionary of the artist's data.
#The dictionary has the following fields: 'id', 'name', 'profilePic' and 'link', the last two are links.
def returnArtistData(artistID):
    rawData = spotify.artist(artistID)
    artistData = {'id': artistID, 'name': rawData['name'], 'profilePic' : rawData['images'][0]['url'], 
    'link' : rawData['external_urls']['spotify'] }
    return (artistData)

#This function takes an artist ID as argument and returns a dictionary 8 related artist's data.
#Every artist's dictionaries has the following fields: 'id', 'name', 'tracks' x 5, 'profilePic' and 'link', the last three are links.
#Every track is also a dictionary, which has the following: 'id', 'name', 'preview'
def returnRelatedArtists(artistId):
    results = spotify.artist_related_artists(artistId)
    artists = results['artists']
    relatedArtists = []
    for x in range(0, 8):
        element = artists[x]

        thisArtist = { 'name': element['name'], 'id': element['id'], 'tracks': '', 
        'link': element['external_urls']['spotify'], 'profilePic': element['images'][0]['url']}

        topTracks = spotify.artist_top_tracks(element['id'], 'US')
        finaltracks = []

        for index in range(0, 5):
            track = topTracks['tracks'][index]
            finaltracks.append( {"name" : track['name'], "id" : track['id'], "preview": track['preview_url'] , 'embed' : 'https://open.spotify.com/embed/track/'+ track['id'] +'?utm_source=generator' } )
        thisArtist['tracks'] = finaltracks
        relatedArtists.append(thisArtist)
    return(relatedArtists)

#This function returns the basic website, no data on it at the moment.
def landingPage(request):
    return render(request, "Display/landingpage.html")

#This function returns a website of the recommended artists and their top songs.
#If it is unable to find the artist with the ID it will return an error page.
def artistPageSearch(request):
    if request.method == 'GET':
        try:
            artistId = request.GET['r']
            artist = returnArtistData(artistId)
            content = returnRelatedArtists(artistId)
            return render(request, "Display/artistpage.html", {"content" : content, "original": artist})
        except: 
            return render(request, "Display/errorpage.html", {"id" : artistId, 'error': 404})
    else: print('Error: not a get, but something else')