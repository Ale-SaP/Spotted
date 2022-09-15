from django.urls import path 
from . import views

urlpatterns = [
    path('artist/<slug:artistId>', views.getArtistAndRelated),
    path('playlist/<slug:playlistId>', views.getPlaylist)
]