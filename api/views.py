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
from .anonymousApiCalls import *
from .requestSanitizing import Analysis
#-----
@api_view(['GET'])
def getArtistAndRelated(request, artistId):
    sanitizedData = Analysis(data=artistId, view="getPlaylist")
    sanitizedData = sanitizedData.sanitization()
    if (sanitizedData[0]):
        try:
            singleArtist = returnArtistData(sanitizedData[1], spotify)
            relatedArtists = returnRelatedArtists(sanitizedData[1], spotify)
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
        try:
            data = returnPlaylist(sanitizedData[1], spotify)
            tracks = data[0]
            name = data[1]
            return Response({"tracks": tracks, "name": name , "success":True})
        except:
            return Response({'error' : f'{sanitizedData[1]} is not a valid ID', "success": False})
