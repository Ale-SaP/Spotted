# Spotted

Find related artists and view, filter and export your playlists!

Built with the Spotify API with no comercial use in mind.


## Django and React

### Django

The webs back-end is built with Django and Django REST Framework. Modules include environ, spotipy, requests, bleach and os.

#### Relevant folders and files.

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
##### api/anonymousApiCall.py
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
##### api/views.py
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
##### api/requestSanitizing.py
* It contains the ```Analysis``` class. 
    * It takes two arguments: the data being sent (meaning the text that has been recived as input from the user) and the name of the view from which the data came.
    * The **sanitization** method cleans the data with the ***bleach*** module and if it was successfull and shorter than 60 characters returns (**True , cleanData**); else returns (**False, ""**).

<br><br>
##### api/urls.py
Handles the paths to make a request and what views (from view.py) are called, they are:

```
urlpatterns = [
    path('artist/<slug:artistId>', views.getArtistAndRelated),
    path('playlist/<slug:playlistId>', views.getPlaylist),
]
```

* Reminder: the complete path is ***/api/artist/...*** or ***/api/playlist/...***
<br><br>
##### Spotted/urls.py

```
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

<br><br>
##### Spotted/settings.py

* The secret key is kept in the .env file.

* The following Installed Apps were added.
```
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
]
```
<br>

* The following items were added to the middleware
```
MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    ...
] 
```

<br>

* The following additions were made to be able to render React but were never actually used.

```
TEMPLATES = [
    {
        ...
        'DIRS': [ os.path.join(BASE_DIR, 'rspotted/spotted'),], 
        ...
    },
],

#Path to search for static files
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'rspotted/build/static')
    ]
```

<br>

 * Also, this allows React to access the backend.
 ```CORS_ORIGIN_WHITELIST = (
'http://localhost:3000', #for localhost (REACT Default)
)
```

<br><br><br>

### React

The react folder is located at 
```
Spotted/rspotted/...
```

In the **src** folder we can find:
```
- parts
  - artists
  - playlists
  - ...

- redux
  - ...

- utils
  - methods.js
  - pagination.js
  - sorting.js

- App.jsx

- index.css
- index.jsx
```

<br><br>

#### Parts
##### parts/artists
In this folder we can find two different files, **AnyArtist.jsx** and **SimilarArtistsDisplay.jsx**.

When the client loads the _/artist/*_ path of the website, **SimilarArtistsDisplay** is called, prompting a useQuery hook and retrieving data from the backend with the **callArtist(id)** function from the **utils** folder. 
If the request was successful, it returns a single **AnyArtist** component and maps an array of objects, returning an **AnyArtist** component for every object.

The **AnyArtist** component renders a "card"; an image that can be flipped with a button to reveal the embed preview of 5 tracks.
This is achived by returning **content** and **buttons()**; being *content* a **useState** constant, set by default to return the picture and *buttons()* checks if we can embed tracks before returning. Then the rest is handled by **onClick()** and **onHide()**, that just change the value in **content**.

<br><br>

##### parts/playlists
The **components** will be listed in the order they appear in code.
```
- PlaylistDisplay
    - SearchBar
    - FilterSearchBar
    - FilterBar
    - PlaylistTable
        - ExportButton

        - TableHeaders & TableRow
        or
        - Carousel
            - CarouselButtons
            - TableHeaders & TableRow
```

When the client loads the _/playlist/*_ path of the website, **PlaylistDisplay** is called, prompting a useQuery hook and retrieving data from the backend with the **callPlaylist(id)** function from **methods.js** in the **utils** folder.

If this request is successful, it renders **SearchBar, FilterSearchBar, FilterBar and PlaylistTable** components.

* **SearchBar** is not nested in the _playlist_ folder. On submit, it navigates you to _localhost3000/playlist/your-term_. Also, it uses the *direction* prop to diferenciate between artist or playlist searches.

* **FilterSearchBar** changes only the **term** of the URL.

* **FilterBar** changes only the **filter** of the URL.

* **PlaylistTable** sorts and filters the playlist with the *SortForPlaylist(data, filter, term)* function each re-render. The *SortForPlaylist* function is called from **sorting.js** in the **utils** folder.

    * If the playlist is over 25 tracks, the **pagination** function from **pagination.js** in **utils** is called; it splits _sortedData_ into blocks of 25 elements and renders the **ExportButton** and **Carousel** components.
    
       * **Carousel** renders **CarouselButtons** depending on the filter used and a different slide for every block of 25 elements, each slide contains **TableHeaders** and a **TableRow** for each element.
    
        <br>

    * Else, it just renders **ExportButton**, **TableHeaders** and a **TableRow** for each track.

    * **ExportButton** renders a button that, when pressed, downloads the playlist as an excel file.

    * **TableHeaders and TableRow** are defined in the **Table.jsx** file.