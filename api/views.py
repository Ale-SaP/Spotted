from rest_framework.response import Response
from rest_framework.decorators import api_view
#-----
import environ
env = environ.Env()
environ.Env.read_env()
#-----
import requests
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=env("CLIENT_ID"), 
    client_secret=env("CLIENT_SECRET")))
#-----
from .AnonymousApiCalls import *
from .requestSanitizing import Analysis
#-----
@api_view(['GET'])
def getArtistAndRelated(request, artistId):
    if (Analysis(artistId, "getArtistAndRelated")):
        try:
            singleArtist = returnArtistData(artistId, spotify)
            relatedArtists = returnRelatedArtists(artistId, spotify)
            return Response({'original' : singleArtist, 'related': relatedArtists, "success": True})
        except: 
            return Response({'error' : f'{artistId} is not a valid ID', "success": False})
    else: 
        return Response({'error' : f'The search term "{artistId}" is either too long or too short! Spaces are not supported yet.', "success" : False})
#-----
@api_view(['GET'])
def getPlaylist(request, playlistId):
    sanitizedData = Analysis(data=playlistId, view="getPlaylist")
    sanitizedData = sanitizedData.sanitization()
    #More sanitization needs to be done on the front end; to transform links to ids.
    if (sanitizedData[0]):
        return Response({"tracks": returnPlaylist(sanitizedData[1], spotify), "success":True})