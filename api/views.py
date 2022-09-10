from rest_framework.response import Response
from rest_framework.decorators import api_view

import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

import environ
env = environ.Env()
# reading .env file
environ.Env.read_env()

#Replace this with your keys.
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=env("CLIENT_ID"), 
    client_secret=env("CLIENT_SECRET")))

#This function takes an artist ID as argument and returns a dictionary of the artist's data.
#The dictionary has the following fields: 'id', 'name', 'profilePic' and 'link', the last two are links.
def returnArtistData(artistID):
    rawData = spotify.artist(artistID)
    artistData = {'id': artistID, 'artistName': rawData['name'], 'profilePic' : rawData['images'][0]['url'], 
    'link' : rawData['external_urls']['spotify'] }
    return (artistData)

#This function takes an artist ID as argument and returns a dictionary 8 related artist's data.
#Every artist's dictionary has the following fields: 'id', 'artistName', 'tracks' x 5, 'profilePic' and 'link', the last three are links.
#Every track is also a dictionary, which has the following: 'id', 'trackName', 'embed'
def returnRelatedArtists(artistId):
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

def conditions(arg):
    if ( (len(arg) >= 25 or len(arg) <= 5)):
        return False
    else: 
        return True

@api_view(['GET'])
def getData(request, artistId):
    if (conditions(artistId)):
        try:
            singleArtist = returnArtistData(artistId)
            relatedArtists = returnRelatedArtists(artistId)
            return Response({'original' : singleArtist, 'related': relatedArtists, "success": True})
        except: 
            return Response({'error' : f'{artistId} is not a valid ID', "success": False})
    else: 
        return Response({'error' : f'The search term "{artistId}" is either too long or too short! Spaces are not supported yet.', "success" : False})

@api_view(['GET'])
def testing(request):
    singleArtist = returnArtistData('6Ghvu1VvMGScGpOUJBAHNH')
    relatedArtists = returnRelatedArtists('6Ghvu1VvMGScGpOUJBAHNH')
    return Response({'a': singleArtist, 'b': relatedArtists})