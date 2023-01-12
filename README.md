# Spotted

Find related artists and view, filter and export your playlists!

Built with the SpotifyAPI with no comercial use in mind.


## Django and React

### Django

The webs back-end is built with Django and Django REST Framework.

#### Relevant files.

+ Spotted
  - api
     
    ``` 
    - anonymousApiCall.py
    - requestSanitizing.py
    - urls.py
    - views.py 
    ```

  - Spotted
    ```
    - settings.py
    - urls.py
    ```

<br><br>
##### anonymousApiCall.py
It contains the functions, that make calls to the Spotify API: 
```
returnArtistData(artistID, spotify)
returnRelatedArtists(artistId, spotify)

returnPlaylist(playlistId, spotify)
```

**Regarding Arguments**: 
* Each request requires to be given internal Spotify IDs. 

* The "spotify" argument is the ``` "spotify" ``` object referred in views.py.


**The functions**: 

"returnArtistData" and "returnRelatedArtists" are used by the original part of the webpage, "Find Related Artists!".
- ***returnArtistData*** returns an object containing the "artistID", "artistName", "profilePic" and their (Spotify) "link".
- ***returnRelatedArtists*** returns an object containing the "artistID", "artistName", "profilePic" and their (Spotify) "link", but also the "tracks" array of objects, consisting of the artists top 5 tracks.
    - Each "track" or object of the list contains: "id", "trackName" and "embed", which is a Spotify link which allows you to do a preview listen of the track if embeded on the website.


"returnPlaylist" is used in the "Playlists" side.
- ***returnPlaylist*** "playlistsSongs" and "playlistName".
    - "playlistsSongs" is an array of objects, each one representing a song of the playlist; every song contains an 
        - "index" (it's place in the playlist). 
        - "trackName", "id", "trackApiLink" (internal use for Spotify) and "trackLink" (publicly accessable link for the track).
        - "artistName", "artistApiLink" (internal use for Spotify) and "artistLink" (publicly accessable link for the track), 
        - "albumName" and "releaseDate".

<br><br>
##### views.py
In views.py, the ``` "spotify" ``` object is initialized, which uses OUR client Id and key to login to Spotify's API. The secret key is stored in a .env file.

It contains the functions: 

```
getArtistAndRelated(request, artistId)
getPlaylist(request, playlistId)
```

+ ***getArtistAndRelated(request, artistId)*** returns the artist and 5 related artists, by calling the **anonymousApiCalls.py** functions
_returnArtistData(playlistId, spotify)_  **and**  _returnRelatedArtists(artistId, spotify)_, passing the artist's Id and the ``` spotify ``` object as arguments.

    * Also, it sanitizes the input with ```Analysis``` from **requestSanitizing.py** and if it is correct sends the request to Spotify's API; the request is made with a *try* statement to handle errors.


* ***getPlaylist(request, playlistId)*** returns the playlist's name and its tracks, by calling the **anonymousApiCalls.py** function _returnPlaylist(playlistId, spotify)_, passing the playlist's Id and the ``` spotify ``` object as arguments.

    * Also, it sanitizes the input with ```Analysis``` from **requestSanitizing.py** and if it is correct sends the request to Spotify's API; the request is made with a *try* statement to handle errors.

<br><br>
##### requestSanitizing.py
* It contains the ```Analysis``` class. 
    * It takes two arguments: the data being sent (meaning the text that has been recived as input from the user) and the name of the view from which the data came.
    * The **sanitization** method cleans the data with the ***bleach*** module and if it was successfull and shorter than 60 characters returns (**True , cleanData**); else returns (**False, ""**).

<br><br>
##### urls.py
Handles the paths to make a request and what views are called, they are:

```
urlpatterns = [
    path('artist/<slug:artistId>', views.getArtistAndRelated),
    path('playlist/<slug:playlistId>', views.getPlaylist),
```

* Reminder: the complete path is ***/api/artist/...*** or ***/api/playlist/...***